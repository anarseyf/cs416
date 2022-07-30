const TextRows = {
  code: true,
  date: true,
  dob: true,
  driverRef: true,
  fastestLapTime: true,
  firstname: true,
  lastname: true,
  name: true,
  nationality: true,
  number: true,
  positionText: true,
  time: true,
  url: true,
};

const Data = {};
const State = {};
const Index = {};

window.onload = async () => {
  await readData();
  computeIndexes();

  const champions = computeChampions();

  // Scene 1
  showChampions(champions);

  // Scene 2
  const index = Index.DriverByName;
  const drivers = [
    index.get("Michael").get("Schumacher"),
    index.get("Damon").get("Hill"),
    index.get("Jacques").get("Villeneuve"),
    index.get("Mika").get("Häkkinen"),
    index.get("Fernando").get("Alonso"),
    index.get("Kimi").get("Räikkönen"),
    index.get("Jenson").get("Button"),
    index.get("Sebastian").get("Vettel"),
    index.get("Lewis").get("Hamilton"),
    index.get("Nico").get("Rosberg"),
    index.get("Max").get("Verstappen"),
  ];

  showDrivers(drivers);

  showClearButton();
};

function parseRow(d) {
  const r = {};
  Object.entries(d).forEach(([k, v]) => {
    r[k] = TextRows[k] ? v : +v;
  });
  return r;
}

async function readData() {
  Data.Races = await d3.csv("./data/races.csv", parseRow);
  Data.Drivers = await d3.csv("./data/drivers.csv", parseRow);
  Data.Standings = await d3.csv("./data/driver_standings.csv", parseRow);
  Data.Results = await d3.csv("./data/results.csv", parseRow);
}

function computeIndexes() {
  Index.Race = d3.index(Data.Races, (r) => r.raceId);
  Index.Driver = d3.index(Data.Drivers, (d) => d.driverId);
  Index.DriverByName = d3.index(
    Data.Drivers,
    (d) => d.firstname,
    (d) => d.lastname
  );
  Index.RacesByYear = d3.group(Data.Races, (r) => r.year);
  Index.StandingsByRace = d3.group(Data.Standings, (s) => s.raceId);
}

function computeLastRaceIds() {
  const lastRacesRollup = d3.rollup(Data.Races, lastRace, (d) => d.year);
  const lastRaces = [...lastRacesRollup.values()];

  const lastRaceIds = lastRaces.map((r) => r.raceId);
  return lastRaceIds;
}

function computeYearEndListAtPosition(position) {
  const lastRaceIds = computeLastRaceIds();

  const leaderStandings = Data.Standings.filter((s) => lastRaceIds.includes(s.raceId))
    .filter((s) => s.position === position)
    .map((s) => ({
      ...s,
      year: Index.Race.get(s.raceId).year,
    }))
    .filter((d) => d.year > 1990);

  const list = leaderStandings.map(({ driverId, year, wins }) => {
    const { firstname, lastname } = Index.Driver.get(driverId);
    return {
      year,
      driverId,
      firstname,
      lastname,
      wins,
    };
  });

  list.sort((a, b) => b.year - a.year);

  // console.log(`Position ${position}:`, list);

  return list;
}

function computeChampions() {
  return computeYearEndListAtPosition(1);
}

function computeDriverForYearAtPosition(year, position) {
  const list = computeYearEndListAtPosition(position);
  const entry = list.find((e) => e.year === year);
  return Index.Driver.get(entry.driverId);
}

function computeWinnersForYear(year) {
  const races = Data.Races.filter((r) => r.year === year);
  const raceIds = races.map((r) => r.raceId);

  console.log(`${races.length} races in ${year};\n`, races[0]);

  const winners = Data.Results.filter((r) => raceIds.includes(r.raceId))
    .filter((r) => r.position === 1)
    .map(({ raceId, driverId }) => ({
      round: Index.Race.get(raceId).round,
      firstname: Index.Driver.get(driverId).firstname,
      lastname: Index.Driver.get(driverId).lastname,
      raceId,
      driverId,
    }));

  winners.sort((a, b) => a.round - b.round);

  return winners;
}

function computeRaceIdsWonBy(driverId, yearMaybe) {
  let list = Data.Results.filter((r) => r.driverId === driverId)
    .filter((r) => r.position === 1)
    .map((r) => r.raceId);

  if (yearMaybe) {
    const raceIdsInYear = Data.Races.filter((r) => r.year === yearMaybe).map((r) => r.raceId);
    list = list.filter((raceId) => raceIdsInYear.includes(raceId));
  }

  const map = {};
  list.forEach((raceId) => {
    map[raceId] = true;
  });
  return map;
}

function computeDriver(driverId, yearRangeMaybe) {
  const lastRaceIds = computeLastRaceIds();

  const driverStandings = Data.Standings.filter((s) => lastRaceIds.includes(s.raceId))
    .filter((s) => s.driverId === driverId)
    .map(({ position, wins, raceId }) => ({
      year: Index.Race.get(raceId).year,
      position,
      wins,
    }));

  driverStandings.sort((a, b) => a.year - b.year);

  const allStandings = fillInMissingYears(driverStandings, yearRangeMaybe);
  console.log(`driverStandings for ${driverId}:`, driverStandings);
  return allStandings;
}

function fillInMissingYears(standings, yearRangeMaybe) {
  const years = standings.map((s) => s.year);
  const [min, max] = yearRangeMaybe || d3.extent(years);
  const allYears = d3.range(min, max + 1);
  const allStandings = allYears.map((year) => {
    const entry = standings.find((s) => s.year === year);
    return entry || { year, position: 0, wins: 0 };
  });
  return allStandings;
}

function computeWinsForDriver(driverId) {
  const wins = Data.Results.filter((r) => r.driverId === driverId)
    .filter((r) => r.position === 1)
    .map((r) => r.raceId);

  return wins;
}

function lastRace(races) {
  const maxRound = Math.max(...races.map((r) => r.round));
  return races.find((r) => r.round === maxRound);
}

function computePointsForDriverAtRace(driverId, raceId) {
  const standings = Index.StandingsByRace.get(raceId).filter((s) => s.driverId === driverId);

  return standings.map((s) => s.points);
}

function computePointsForDriverAtRaces(driverId, raceIds) {
  return raceIds.map((raceId) => computePointsForDriverAtRace(driverId, raceId));
}

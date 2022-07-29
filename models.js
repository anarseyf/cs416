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

  showChampions(champions);
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
  Index.Races = d3.index(Data.Races, (r) => r.raceId);
  Index.Drivers = d3.index(Data.Drivers, (d) => d.driverId);
  Index.RacesByYear = d3.group(Data.Races, (d) => d.year);
}

function computeLastRaceIds() {
  const lastRacesRollup = d3.rollup(Data.Races, lastRace, (d) => d.year);
  const lastRaces = [...lastRacesRollup.values()];

  const lastRaceIds = lastRaces.map((r) => r.raceId);
  return lastRaceIds;
}

function computeChampions() {
  const lastRaceIds = computeLastRaceIds();

  const leaderStandings = Data.Standings.filter((s) => lastRaceIds.includes(s.raceId))
    .filter((s) => s.position === 1)
    .map((s) => ({
      ...s,
      year: Index.Races.get(s.raceId).year,
    }));

  console.log("leaderStandings[0]", leaderStandings[0]);

  const champions = leaderStandings.map(({ driverId, year, wins }) => {
    const { firstname, lastname } = Index.Drivers.get(driverId);
    return {
      year,
      driverId,
      firstname,
      lastname,
      wins,
    };
  });

  champions.sort((a, b) => b.year - a.year);

  return champions;
}

function computeWinners(year) {
  const races = Data.Races.filter((r) => r.year === year);
  const raceIds = races.map((r) => r.raceId);

  console.log(`${races.length} races in ${year}:`, races[0]);

  const winners = Data.Results.filter((r) => raceIds.includes(r.raceId))
    .filter((r) => r.position === 1)
    .map(({ raceId, driverId }) => ({
      round: Index.Races.get(raceId).round,
      firstname: Index.Drivers.get(driverId).firstname,
      lastname: Index.Drivers.get(driverId).lastname,
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

function computeDriver(driverId) {
  const lastRaceIds = computeLastRaceIds();

  const driverStandings = Data.Standings.filter((s) => lastRaceIds.includes(s.raceId))
    .filter((s) => s.driverId === driverId)
    .map(({ position, wins, raceId }) => ({
      year: Index.Races.get(raceId).year,
      position,
      wins,
    }));

  driverStandings.sort((a, b) => a.year - b.year);

  console.log(`driverStandings for ${driverId}:`, driverStandings);

  return driverStandings;
}

function lastRace(races) {
  const maxRound = Math.max(...races.map((r) => r.round));
  return races.find((r) => r.round === maxRound);
}

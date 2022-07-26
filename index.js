window.onload = async () => {
  d3.select("#random").text(Math.round(Math.random() * 100000));

  const Races = await d3.csv("./data/races.csv", parseRow);
  const Drivers = await d3.csv("./data/drivers.csv", parseRow);
  const Standings = await d3.csv("./data/driver_standings.csv", parseRow);

  // console.log("Data >> races", Races);
  // console.log("Data >> standings", Standings);
  // console.log("Data >> drivers", Drivers);

  const raceIndex = d3.index(Races, (r) => r.raceId);

  const lastRacesRollup = d3.rollup(Races, lastRace, (d) => d.year);
  console.log("Last races rollup", lastRacesRollup);
  const lastRaces = [...lastRacesRollup.values()];

  const lastRaceIds = lastRaces.map((r) => r.raceId);

  const leaderStandings = Standings.filter((s) => lastRaceIds.includes(s.raceId))
    .filter((s) => s.position === 1)
    .map((s) => ({
      ...s,
      year: raceIndex.get(s.raceId).year,
    }));

  console.log("leaderStandings", leaderStandings[0]);

  const driverIndex = d3.index(Drivers, (d) => d.driverId);

  const champions = leaderStandings.map(({ driverId, year, wins }) => {
    const { firstname, lastname } = driverIndex.get(driverId);
    return {
      year,
      driverId,
      firstname,
      lastname,
      wins,
    };
  });

  champions.sort((a, b) => b.year - a.year);

  console.log("Champions", champions[0]);

  showChampions(champions);
};

function showChampions(champions) {
  d3.select("#champions")
    .selectAll(".row")
    .data(champions)
    .enter()
    .append("div")
    .attr("class", "row");

  d3.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.year);

  d3.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => `${d.firstname} ${d.lastname}`.toUpperCase());
}

const TextRows = {
  code: true,
  date: true,
  dob: true,
  driverRef: true,
  firstname: true,
  lastname: true,
  name: true,
  nationality: true,
  number: true,
  positionText: true,
  time: true,
  url: true,
};

function parseRow(d) {
  const r = {};
  Object.entries(d).forEach(([k, v]) => {
    r[k] = TextRows[k] ? v : +v;
  });
  return r;
}

function lastRace(races) {
  const maxRound = Math.max(...races.map((r) => r.round));
  return races.find((r) => r.round === maxRound);
}

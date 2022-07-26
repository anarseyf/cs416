window.onload = async () => {
  d3.select("#random").text(Math.round(Math.random() * 100000));

  const races = await d3.csv("./data/races.csv", parseRow);
  const standings = await d3.csv("./data/driver_standings.csv", parseRow);

  console.log("Data >> races", races);
  console.log("Data >> standings", standings);

  const lastRacesRollup = d3.rollup(races, lastRace, (d) => d.year);
  const lastRaces = [...lastRacesRollup.values()];

  console.log("Last races by year", lastRaces);

  const lastRaceIds = lastRaces.map((r) => r.raceId);

  const leaders = standings.filter((s) => lastRaceIds.includes(s.raceId));

  console.log("end-of-season standings", leaders);
};

const TextRows = {
  name: true,
  date: true,
  time: true,
  url: true,
  positionText: true,
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

function showYear(year) {
  clear();
  showHeader(year);

  const driver1 = computeDriverForYearAtPosition(year, 1);
  const driver2 = computeDriverForYearAtPosition(year, 2);

  const subtitle = `${nameFn(driver1)} vs ${nameFn(driver2)}`;
  showSubtitle(subtitle);

  const drivers = [driver1, driver2];
  showTableForYear(year, drivers);
  showLegendForYear(year, drivers);
}

function showTableForYear(year, drivers) {
  const [driver1, driver2] = drivers;
  const races = Index.RacesByYear.get(year).sort((a, b) => a.round - b.round);

  const raceIds = races.map((r) => r.raceId);

  const points1 = computePointsForDriverAtRaces(driver1.driverId, raceIds);
  const points2 = computePointsForDriverAtRaces(driver2.driverId, raceIds);

  const Sidebar = d3.select("#Sidebar");
  const Content = Sidebar.select(".content");

  Content.selectAll(".row").data(races).enter().append("div").attr("class", "row scene3");

  const winnersByRound = computeWinnersByRoundForYear(year);
  const raceColorFn = (d) => {
    const driverId = winnersByRound.get(d.round).driverId;
    const color =
      driverId === driver1.driverId ? "gold" : driverId === driver2.driverId ? "silver" : "other";
    return `race ${color}`;
  };

  Content.selectAll(".row").append("div").attr("class", raceColorFn);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.round);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => d.name);

  // Content.selectAll(".row").append("div").attr("class", "place1");
  // Content.selectAll(".row").append("div").attr("class", "place2");
  // Content.selectAll(".place1").data(points1).text(String);
  // Content.selectAll(".place2").data(points2).text(String);

  Content.selectAll(".row").append("div").attr("class", "pointsChart");

  const max = d3.max(points1);
  const pointsData = d3.zip(points1, points2).map((points) => ({ points, max }));
  Content.selectAll(".pointsChart").data(pointsData).each(showPointsChart);
}

function showLegendForYear(year, drivers) {
  const races = Index.RacesByYear.get(year).sort((a, b) => a.round - b.round);

  const winnersByRound = computeWinnersByRoundForYear(year);

  const numWonBy = (driverId) =>
    races
      .map((r) => winnersByRound.get(r.round))
      .map((w) => w.driverId)
      .filter((id) => id === driverId).length;

  const list = drivers.map((d, i) => ({
    // driverId: d.driverId,
    name: nameFn(d),
    wins: numWonBy(d.driverId),
    color: indexToColor(i),
  }));

  const totalWins = d3.sum(list, (d) => d.wins);

  const others = {
    name: "others",
    wins: races.length - totalWins,
    color: "other",
  };
  list.push(others);

  const Footer = d3.select("#Sidebar .footer");
  Footer.selectAll(".row")
    .data(list)
    .enter()
    .append("div")
    .attr("class", "row legend")
    .each(showLegendRow);
}

function showLegendRow(d) {
  const { name, wins, color } = d;
  const text = `won by ${d.name}`;

  d3.select(this)
    .append("div")
    .text((d) => d.wins);
  d3.select(this)
    .append("div")
    .attr("class", (d) => `race ${d.color}`);
  d3.select(this).append("div").text(text);
}

const indexToColor = (i) => (i === 0 ? "gold" : i === 1 ? "silver" : "other");

const pointsClassFn = (d, i) => `points ${indexToColor(i)}`;

const pointsWidthFn = (p, max) => `${Math.round((100 * p) / max)}%`;

function showPointsChart(d) {
  const { points, max } = d;

  d3.select(this)
    .selectAll(".points")
    .data(points)
    .enter()
    .append("div")
    .attr("class", pointsClassFn)
    .style("width", (d) => pointsWidthFn(d, max));
}

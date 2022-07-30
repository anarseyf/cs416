function showYear(year) {
  clear();
  showHeader(year);

  const races = Index.RacesByYear.get(year).sort((a, b) => a.round - b.round);

  const raceIds = races.map((r) => r.raceId);

  const driver1 = computeDriverForYearAtPosition(year, 1);
  const driver2 = computeDriverForYearAtPosition(year, 2);

  const points1 = computePointsForDriverAtRaces(driver1.driverId, raceIds);
  const points2 = computePointsForDriverAtRaces(driver2.driverId, raceIds);

  const pointsDiff = d3.zip(points1, points2).map(([p1, p2]) => p1 - p2);

  const Sidebar = d3.select("#Sidebar");
  const Subtitle = Sidebar.select(".subtitle");
  const text = `${nameFn(driver1)} vs ${nameFn(driver2)}`;
  Subtitle.text(text);

  // console.log(`${year}: ${text}`);

  const Content = Sidebar.select(".content");

  Content.selectAll(".row").data(races).enter().append("div").attr("class", "row scene3");

  Content.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.round);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "")
    .text((d) => d.name);

  Content.selectAll(".row").append("div").attr("class", "place1");
  Content.selectAll(".row").append("div").attr("class", "place2");
  Content.selectAll(".row").append("div").attr("class", "pointsChart");

  Content.selectAll(".place1").data(points1).text(String);
  Content.selectAll(".place2").data(points2).text(String);

  const max = d3.max(points1);
  const pointsData = d3.zip(points1, points2).map((points) => ({ points, max }));
  Content.selectAll(".pointsChart").data(pointsData).each(showPointsChart);
}

const pointsClassFn = (d, i) => {
  const color = i === 0 ? "gold" : i === 1 ? "silver" : "bronze";
  return `points ${color}`;
};
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

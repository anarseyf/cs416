function showYear(year) {
  clear();
  showHeader(year);

  const races = Index.RacesByYear.get(year).sort((a, b) => a.round - b.round);

  const raceIds = races.map((r) => r.raceId);

  const champion = computeDriverForYearAtPosition(year, 1);
  const runnerup = computeDriverForYearAtPosition(year, 2);

  const championPoints = computePointsForDriverAtRaces(champion.driverId, raceIds);
  const runnerupPoints = computePointsForDriverAtRaces(runnerup.driverId, raceIds);

  const pointsDiff = d3.zip(championPoints, runnerupPoints).map(([p1, p2]) => p1 - p2);

  const Sidebar = d3.select("#Sidebar");
  const Subtitle = Sidebar.select(".subtitle");
  const text = `${nameFn(champion)} vs ${nameFn(runnerup)}`;
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

  Content.selectAll(".row").append("div").attr("class", "champion");
  Content.selectAll(".row").append("div").attr("class", "runnerup");
  Content.selectAll(".row").append("div").attr("class", "diff");

  Content.selectAll(".champion").data(championPoints).text(String);
  Content.selectAll(".runnerup").data(runnerupPoints).text(String);
  Content.selectAll(".diff").data(pointsDiff).text(String);
}

const YearLimit = 2016; // 0

function prepareScene1(champions) {
  const filtered = champions.filter((d) => d.year > YearLimit);

  const Scene = d3.select("#Scene1");
  const Content = Scene.select(".content");
  Content.selectAll(".row").data(filtered).enter().append("div").attr("class", "row");

  Content.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.year);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name clickable")
    .text(nameFn)
    .on("click", (e, d) => {
      clearHighlights();
      highlightRacesWonBy(d.driverId);
    });

  Content.selectAll(".row").append("div").attr("class", "races").each(showRacesForYear);
}

function clearHighlights() {
  d3.select("#Scene1 .content").selectAll(".race").classed("highlight", false);
}

function highlightRacesWonBy(driverId, yearMaybe) {
  const racesMap = computeRaceIdsWonBy(driverId, yearMaybe);

  // console.log(`highlightRacesWonBy ${driverId} ${yearMaybe || ""}`, racesMap);

  d3.select("#Scene1")
    .selectAll(".race")
    .filter((d) => racesMap[d.raceId])
    .classed("highlight", true)
    .classed("year", !!yearMaybe);
}

function showRacesForYear(d) {
  const { year, driverId } = d;
  const races = Index.RacesByYear.get(year);
  races.sort((a, b) => a.round - b.round);

  d3.select(this).selectAll(".race").data(races).enter().append("div").attr("class", "race");
  // .text("/");

  highlightRacesWonBy(driverId, year);
}

function yearClick(e, d) {
  showYear(d.year);
}

function driverClick(e, d) {
  const driver = Index.Driver.get(d.driverId);
  console.log("Driver:", driver.lastname);
  showDriverCareer(driver);
}

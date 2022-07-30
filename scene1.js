function showChampions(champions) {
  const Scene = d3.select("#Scene1");
  Scene.selectAll(".row").data(champions).enter().append("div").attr("class", "row");

  Scene.selectAll(".row")
    .append("div")
    .attr("class", "year clickable")
    .text((d) => d.year)
    .on("click", yearClick);

  Scene.selectAll(".row")
    .append("div")
    .attr("class", "name clickable")
    .text(nameFn)
    .on("click", (e, d) => {
      clearHighlights();
      highlightRacesWonBy(d.driverId);
    });

  Scene.selectAll(".row").append("div").attr("class", "races").each(showRacesForYear);
}

function clearHighlights() {
  d3.select("#Scene1").selectAll(".race").classed("highlight", false);
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

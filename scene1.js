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

  Scene.selectAll(".row")
    .append("div")
    .attr("class", "races")
    .each(function (d) {
      showRacesForYear(this, d.year, d.driverId);
    });
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

function showRacesForYear(_this, year, driverId) {
  const races = Index.RacesByYear.get(year);
  races.sort((a, b) => a.round - b.round);

  d3.select(_this).selectAll(".race").data(races).enter().append("div").attr("class", "race");
  // .text("/");

  highlightRacesWonBy(driverId, year);
}

const nameFn = (d) => `${d.firstname} ${d.lastname}`.toUpperCase();

function showYear(year) {
  clear();
  showHeader(year);

  const races = Index.RacesByYear.get(year);

  const champion = computeDriverForYearAtPosition(year, 1);
  const runnerup = computeDriverForYearAtPosition(year, 2);

  const Sidebar = d3.select("#Sidebar");
  const Subtitle = Sidebar.select(".subtitle");
  const text = `${nameFn(champion)} vs ${nameFn(runnerup)}`;
  Subtitle.text(text);

  console.log(`${year}: ${text}`);

  const Content = Sidebar.select(".content");

  Content.selectAll(".row").data(races).enter().append("div").attr("class", "row");

  Content.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.round);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "")
    .text((d) => d.name);
}

function showHeader(text) {
  d3.select("#Sidebar .headline").text(text);
}

function yearClick(e, d) {
  showYear(d.year);
}

function driverClick(e, d) {
  const driver = Index.Drivers.get(d.driverId);
  console.log("Driver:", driver.lastname);
  showDriverCareer(driver);
}

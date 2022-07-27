function showChampions(champions) {
  const ChampionsSel = d3.select("#Champions");
  ChampionsSel.selectAll(".row").data(champions).enter().append("div").attr("class", "row");

  ChampionsSel.selectAll(".row")
    .append("div")
    .attr("class", "year clickable")
    .text((d) => d.year)
    .on("click", yearClick);

  ChampionsSel.selectAll(".row")
    .append("div")
    .attr("class", "name clickable")
    .text((d) => `${d.firstname} ${d.lastname}`.toUpperCase())
    .on("click", driverClick);
}

const nameFn = (d) => `${d.firstname} ${d.lastname}`.toUpperCase();

function showYear(year, winners) {
  clear();
  showHeader(year);

  const YearSel = d3.select("#Year");

  YearSel.selectAll(".row").data(winners).enter().append("div").attr("class", "row");

  YearSel.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.round);

  YearSel.selectAll(".row")
    .append("div")
    .attr("class", "name clickable")
    .text(nameFn)
    .on("click", driverClick);
}

function showDriver(driver, standings) {
  clear();

  const name = nameFn(driver);
  showHeader(name);

  const DriverSel = d3.select("#Driver");

  DriverSel.selectAll(".row").data(standings).enter().append("div").attr("class", "row standings");

  DriverSel.selectAll(".row")
    .append("div")
    .attr("class", "year clickable")
    .text((d) => d.year)
    .on("click", yearClick);

  DriverSel.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => d.position);

  DriverSel.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => d.wins);
}

function showHeader(text) {
  d3.select("#Header").text(text);
}

function clear() {
  d3.select("#Header").text("");
  d3.select("#Driver").text("");
  d3.select("#Year").text("");
}

function yearClick(e, d) {
  const winners = computeWinners(d.year);
  console.log("Year:", d.year);
  console.log("Winners", winners);
  showYear(d.year, winners);
}

function driverClick(e, d) {
  const driver = Index.Drivers.get(d.driverId);
  console.log("Driver:", driver.lastname);
  const standings = computeDriver(driver.driverId);
  showDriver(driver, standings);
}

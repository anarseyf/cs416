function showDriverCareer(driver) {
  clear();

  const Sidebar = d3.select("#Sidebar");
  Sidebar.select(".headline").text(nameFn(driver));

  const standings = computeDriver(driver.driverId);
  const numRaceWins = standings.map((s) => s.wins).reduce((acc, v) => acc + v, 0);

  const racesWon = computeWinsForDriver(driver.driverId);
  Sidebar.select(".subtitle").text(`Races won: ${racesWon.length} (${numRaceWins})`);

  const rows = Sidebar.selectAll(".row")
    .data(standings)
    .classed("champion", (d) => d.position === 1);

  rows
    .enter()
    .append("div")
    .attr("class", "row standings")
    .classed("champion", (d) => d.position === 1);

  rows.exit().remove();

  Sidebar.selectAll(".row")
    .append("div")
    .attr("class", "year clickable")
    .text((d) => d.year)
    .on("click", yearClick);

  Sidebar.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => d.position);

  Sidebar.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => d.wins);
}

function clear() {
  d3.select("#Header").text("");
  d3.select("#Driver").text("");
  d3.select("#Year").text("");
  d3.select("#Sidebar").selectAll("div").text("");
}

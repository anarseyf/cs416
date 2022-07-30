function showDrivers(drivers) {
  const Scene = d3.select("#Scene2");

  Scene.selectAll(".driver")
    .data(drivers)
    .enter()
    .append("div")
    .attr("class", "driver clickable")
    .text(nameFn)
    .on("click", (e, d) => {
      showDriverCareer(d);
    });
}

function showDriverCareer(driver) {
  clear();

  const Sidebar = d3.select("#Sidebar");
  const Headline = Sidebar.select(".headline");
  const Subtitle = Sidebar.select(".subtitle");
  const Content = Sidebar.select(".content");

  Headline.text(nameFn(driver));

  const standings = computeDriver(driver.driverId);
  const numRaceWins = standings.map((s) => s.wins).reduce((acc, v) => acc + v, 0);

  const racesWon = computeWinsForDriver(driver.driverId);
  const numTitles = standings.filter((s) => s.position === 1).length;

  Subtitle.text(`${numTitles} Titles, ${racesWon.length} (${numRaceWins}) Race wins`);

  Content.selectAll(".row")
    .data(standings)
    .enter()
    .append("div")
    .attr("class", "row scene2")
    .classed("champion", (d) => d.position === 1);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "year clickable")
    .text((d) => d.year)
    .on("click", yearClick);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => d.position);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => d.wins);
}

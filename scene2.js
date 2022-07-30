function showDrivers(drivers) {
  const Scene = d3.select("#Scene2");

  const Champions = Scene.select(".champions");
  const Timelines = Scene.select(".timelines");

  Champions.selectAll(".champion")
    .data(drivers)
    .enter()
    .append("div")
    .attr("class", "champion clickable")
    .text(nameFn)
    .on("click", (e, d) => {
      showDriverCareer(d);
    });

  const years = d3.range(1991, 2022);

  const Timeline = Timelines.append("div").attr("class", "timeline");

  Timeline.selectAll(".timelineYear")
    .data(years)
    .enter()
    .append("div")
    .attr("class", "timelineYear");
  // .text(String);
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
    .classed("champion", (d) => d.position === 1)
    .classed("missing", (d) => d.position === 0);

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

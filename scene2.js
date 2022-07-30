const TimelineMin = 1991,
  TimelineMax = 2022;

function showDrivers(drivers) {
  const Scene = d3.select("#Scene2");

  const Champions = Scene.select(".champions");
  const Timelines = Scene.select(".timelines");

  Champions.selectAll(".champion")
    .data(drivers)
    .enter()
    .append("div")
    .attr("class", "driver clickable")
    .text(nameFn)
    .on("click", (e, d) => {
      showDriverCareer(d);
    });

  const years = d3.range(TimelineMin, TimelineMax + 1);

  const driverTimelines = drivers
    .map((d) => d.driverId)
    .map((driverId) => computeDriver(driverId, [TimelineMin, TimelineMax]));

  console.log("driverTimelines", driverTimelines);

  Timelines.selectAll(".timeline")
    .data(driverTimelines)
    .enter()
    .append("div")
    .attr("class", "timeline")
    .each(function (d) {
      showTimeline(this, d);
    });
}

const opacityFn = (d) => {
  if (d.position === 0) {
    return 1.0;
  }
  const deficit = Math.min(7, d.position - 1);
  return 1.0 - deficit * 0.1;
};

function showTimeline(_this, driverTimeline) {
  d3.select(_this)
    .selectAll(".timelineYear")
    .data(driverTimeline)
    .enter()
    .append("div")
    .attr("class", "timelineYear")
    .classed("champion", (d) => d.position === 1)
    .classed("missing", (d) => d.position === 0)
    .style("opacity", opacityFn);
}

function showDriverCareer(driver) {
  clear();

  const Sidebar = d3.select("#Sidebar");
  const Headline = Sidebar.select(".headline");
  const Subtitle = Sidebar.select(".subtitle");
  const Content = Sidebar.select(".content");

  const name = nameFn(driver);
  Headline.text(name);

  const standings = computeDriver(driver.driverId);
  console.log(`Standings for ${name}:`, standings);

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

  Content.selectAll(".row").append("div").attr("class", "name").text(teamFn);
}

const teamFn = (d) => Index.Constructor.get(d.constructorId).name;

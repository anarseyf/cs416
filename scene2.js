const TimelineMin = 1991,
  TimelineMax = 2022;

function showDriverTimelines(drivers) {
  const Scene = d3.select("#Scene2");
  const Timelines = Scene.select(".timelines");

  const timelines = drivers
    .map((d) => d.driverId)
    .map((driverId) => computeDriver(driverId, [TimelineMin, TimelineMax]));

  const data = d3.zip(drivers, timelines).map(([driver, timeline]) => ({ driver, timeline }));

  console.log("drivers + timelines", drivers, timelines, data);

  const rows = Timelines.selectAll(".champion")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "scene2row");

  rows
    .append("div")
    .attr("class", "driver clickable")
    .text((d) => nameFn(d.driver))
    .on("click", (e, d) => {
      showDriverCareer(d.driver);
    });

  rows
    .append("div")
    .attr("class", "timeline")
    .each(function (d) {
      showTimeline(this, d.timeline);
    });

  showYearAxis();
}

function showTimeline(_this, timeline) {
  console.log(">> timeline:", timeline[0]);

  d3.select(_this)
    .selectAll(".timelineYear")
    .data(timeline)
    .enter()
    .append("div")
    .attr("class", "timelineYear")
    .classed("champion", (d) => d.position === 1)
    .classed("missing", (d) => d.position === 0)
    .style("opacity", opacityFn)
    .on("mouseenter", (e, d) => {
      highlightYearAndDriver(d.year, d.driverId);
    })
    .on("mouseleave", () => highlightYearAndDriver(undefined, undefined));
}

function showYearAxis() {
  const years = d3.range(TimelineMin, TimelineMax + 1);

  const Scene = d3.select("#Scene2");
  const Timelines = Scene.select(".timelines");

  const row = Timelines.append("div").attr("class", "scene2row");

  row.append("div");

  row
    .append("div")
    .attr("class", "timeline")
    .selectAll(".tick")
    .data(years)
    .enter()
    .append("div")
    .attr("class", "tick")
    // .text((d) => (d % 5 === 0 ? d : ""));
    .text(String)
    .on("mouseenter", (e, d) => highlightYear(d))
    .on("mouseleave", () => highlightYear(undefined));
}

function highlightYearAndDriver(yearMaybe, driverIdMaybe) {
  highlightYear(yearMaybe);
  highlightDriver(driverIdMaybe);

  const Scene = d3.select("#Scene2");
  Scene.selectAll(".timelineYear").classed(
    "highlighted",
    (d) => d.driverId === driverIdMaybe || d.year === yearMaybe
  );
}

function highlightYear(yearMaybe) {
  const Scene = d3.select("#Scene2");
  Scene.selectAll(".timelineYear").classed("highlighted", (d) => d.year === yearMaybe);
  Scene.selectAll(".tick").classed("highlighted", (d) => d === yearMaybe);
}

function highlightDriver(driverIdMaybe) {
  const Scene = d3.select("#Scene2");
  Scene.selectAll(".driver").classed("highlighted", (d) => d.driver.driverId === driverIdMaybe);
}

const opacityFn = (d) => {
  if (d.position === 0) {
    return 1.0;
  }
  const deficit = Math.min(7, d.position - 1);
  return 1.0 - deficit * 0.1;
};

function showDriverCareer(driver) {
  clear();

  const Sidebar = d3.select("#Sidebar");
  const Headline = Sidebar.select(".headline");
  const Subtitle = Sidebar.select(".subtitle");
  const Content = Sidebar.select(".content");

  const name = nameFn(driver);
  Headline.text(name);

  const standings = computeDriver(driver.driverId);
  // console.log(`Standings for ${name}:`, standings);

  const raceWinsByYear = standings.map((s) => s.wins);
  const numRaceWins = raceWinsByYear.reduce((acc, v) => acc + v, 0);

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

  Content.selectAll(".row").append("div").attr("class", "name").text(teamFn);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => (d.position === 0 ? "" : d.position));

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => (d.position === 0 ? "" : d.wins || "-"));

  // console.log(`>> raceWinsByYear: `, raceWinsByYear);

  Content.selectAll(".row").append("div").attr("class", "wins").each(showWins);
}

function showWins(d) {
  const data = d3.range(d.wins);
  d3.select(this).selectAll(".race").data(data).enter().append("div").attr("class", "race");
}

const teamFn = (d) => {
  const constructor = Index.Constructor.get(d.constructorId);
  return constructor?.name ?? "";
};

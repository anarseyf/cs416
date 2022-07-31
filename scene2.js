const TimelineMin = 1991,
  TimelineMax = 2021;

function prepareScene2(drivers) {
  const Content = d3.select("#Scene2 .content");

  const timelines = drivers
    .map((d) => d.driverId)
    .map((driverId) => computeDriver(driverId, [TimelineMin, TimelineMax]));

  const data = d3.zip(drivers, timelines).map(([driver, timeline]) => ({ driver, timeline }));

  console.log("drivers + timelines", drivers, timelines, data);

  const rows = Content.selectAll(".champion")
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
    })
    .on("mouseenter", (e, d) => {
      highlightTimeline(d.driver.driverId);
    })
    .on("mouseleave", (e, d) => {
      highlightTimeline(undefined);
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
      highlightIntersection(d);
    })
    .on("mouseleave", () => highlightIntersection(undefined));
}

function showYearAxis() {
  const years = d3.range(TimelineMin, TimelineMax + 1);

  const Scene = d3.select("#Scene2");
  const Content = Scene.select(".content");

  const row = Content.append("div").attr("class", "scene2row");

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

function highlightIntersection(dMaybe) {
  const { yearMaybe, driverIdMaybe } = dMaybe || {};
  highlightAxis(yearMaybe);
  highlightDriver(driverIdMaybe);
  highlightEither(yearMaybe, driverIdMaybe);
  showIntersectionTooltip(dMaybe);
}

function highlightEither(yearMaybe, driverIdMaybe) {
  const Content = d3.select("#Scene2 .content");
  Content.selectAll(".timelineYear").classed(
    "highlighted",
    (d) => d.driverId === driverIdMaybe || d.year === yearMaybe
  );
}

function highlightYear(yearMaybe) {
  const Content = d3.select("#Scene2 .content");
  Content.selectAll(".timelineYear").classed("highlighted", (d) => d.year === yearMaybe);
}

function highlightAxis(yearMaybe) {
  const Content = d3.select("#Scene2 .content");
  Content.selectAll(".tick").classed("highlighted", (d) => d === yearMaybe);
}

function highlightDriver(driverIdMaybe) {
  const Content = d3.select("#Scene2 .content");
  Content.selectAll(".driver").classed("highlighted", (d) => d.driver.driverId === driverIdMaybe);
}

function highlightTimeline(driverIdMaybe) {
  const Content = d3.select("#Scene2 .content");
  Content.selectAll(".timelineYear").classed("highlighted", (d) => d.driverId === driverIdMaybe);
}

function showIntersectionTooltip(dMaybe) {
  const Tooltip = d3.select("#Scene2 .tooltip");

  let text = "Hover on the heatmap to learn more.";
  if (dMaybe) {
    // console.log("tooltip:", dMaybe);
    const { year, driverId, position } = dMaybe;
    text = computeIntersectionText(year, driverId, position);
  }

  Tooltip.text(text);
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
  const Description = Sidebar.select(".description");
  const Content = Sidebar.select(".content");

  const name = nameFn(driver);
  Headline.text(name);

  const standings = computeDriver(driver.driverId);

  showDriverDescription(driver);
  const text = computeDriverSummaryText(driver.driverId);
  Subtitle.text(text);

  Content.selectAll(".row")
    .data(standings)
    .enter()
    .append("div")
    .attr("class", "row scene2")
    .classed("champion", (d) => d.position === 1)
    .classed("missing", (d) => d.position === 0);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.year);

  Content.selectAll(".row").append("div").attr("class", "name").text(teamFn);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => (d.position === 0 ? "" : d.position));

  Content.selectAll(".row").append("div").attr("class", "pointsChart").each(showPosition);

  Content.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => (d.position === 0 ? "" : d.wins || "-"));

  // console.log(`>> raceWinsByYear: `, raceWinsByYear);

  Content.selectAll(".row").append("div").attr("class", "wins").each(showWins);
}

function showDriverDescription(driver) {
  const name = nameFn(driver);

  const Description = d3.select("#Sidebar .description");
  const text = Descriptions.Scene2.drivers[name] || "";
  Description.text(text);
}

const positionWidthFn = (position) => {
  const fraction = Math.max(0, 11 - position) / 10;
  return `${100 * fraction}%`;
};

function showPosition(d) {
  if (!d.position) {
    return;
  }

  const width = positionWidthFn(d.position);
  d3.select(this).append("div").attr("class", "points").style("width", width);
}

function showWins(d) {
  const data = d3.range(d.wins);
  d3.select(this).selectAll(".race").data(data).enter().append("div").attr("class", "race");
}

const teamFn = (d) => {
  const constructor = Index.Constructor.get(d.constructorId);
  return constructor?.name ?? "";
};

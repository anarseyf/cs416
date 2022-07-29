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
  const Sidebar = d3.select("#Sidebar");
  Sidebar.select(".headline").text(nameFn(driver));
}

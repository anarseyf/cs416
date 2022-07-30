function clear() {
  console.log("Clear");

  d3.select("#Header").text("");
  d3.select("#Driver").text("");
  d3.select("#Year").text("");
  d3.select("#Sidebar").selectAll(".sidebarItem").text("");
}

const nameFn = (d) => `${d.firstname} ${d.lastname}`;

function showHeader(text) {
  d3.select("#Sidebar .headline").text(text);
}

function showSubtitle(text) {
  d3.select("#Sidebar .subtitle").text(text);
}

function showClearButton() {
  d3.select("#Sidebar .button")
    .append("div")
    .attr("class", "clickable")
    .text("Clear")
    .on("click", clear);
}

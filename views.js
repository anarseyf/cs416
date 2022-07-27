function showChampions(champions) {
  const ChampionsSel = d3.select("#Champions");
  ChampionsSel.selectAll(".row").data(champions).enter().append("div").attr("class", "row");

  ChampionsSel.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.year)
    .on("click", yearClick);

  ChampionsSel.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => `${d.firstname} ${d.lastname}`.toUpperCase())
    .on("click", driverClick);
}

function showYear(year, winners) {
  const YearSel = d3.select("#Year");
  YearSel.text("");

  YearSel.selectAll(".row").data(winners).enter().append("div").attr("class", "row");

  YearSel.selectAll(".row")
    .append("div")
    .attr("class", "year")
    .text((d) => d.round);

  YearSel.selectAll(".row")
    .append("div")
    .attr("class", "name")
    .text((d) => `${d.lastname}`.toUpperCase())
    .on("click", driverClick);
}

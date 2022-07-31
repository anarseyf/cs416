function clear() {
  console.log("Clear");
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

function showSceneDescriptions() {
  const Intro = d3.select("#Intro"),
    Scene1 = d3.select("#Scene1"),
    Scene2 = d3.select("#Scene2"),
    Scene3 = d3.select("#Scene3");
  Credits = d3.select("#Credits");

  const Desc0 = Intro.select(".description"),
    Legend = Intro.select(".legend"),
    Desc1 = Scene1.select(".description"),
    Desc2 = Scene2.select(".description"),
    Desc3 = Scene3.select(".description");
  DataNotes = Credits.select(".dataNotes");
  Author = Credits.select(".author");

  Desc0.text(Descriptions.Intro.description);
  Legend.text(Descriptions.Intro.legend);
  Desc1.text(Descriptions.Scene1.description);
  Desc2.text(Descriptions.Scene2.description);
  Desc3.text(Descriptions.Scene3.description);
  DataNotes.html(Descriptions.Credits.dataNotes);
  Author.text(Descriptions.Credits.author);
}

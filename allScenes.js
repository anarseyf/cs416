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
    Legend0 = Intro.select(".legend"),
    Desc1 = Scene1.select(".description"),
    Legend1 = Scene1.select(".legend"),
    Desc2 = Scene2.select(".description"),
    Legend2 = Scene2.select(".legend"),
    Desc3 = Scene3.select(".description"),
    Legend3 = Scene3.select(".legend"),
    DataNotes = Credits.select(".dataNotes"),
    Author = Credits.select(".author");

  Desc0.text(Descriptions.Intro.description);
  Legend0.html(Descriptions.Intro.legend);
  Desc1.text(Descriptions.Scene1.description);
  Legend1.html(Descriptions.Scene1.legend);
  Desc2.text(Descriptions.Scene2.description);
  Legend2.html(Descriptions.Scene2.legend);
  Desc3.text(Descriptions.Scene3.description);
  Legend3.html(Descriptions.Scene3.legend);
  DataNotes.html(Descriptions.Credits.dataNotes);
  Author.text(Descriptions.Credits.author);

  console.log("Legend: ", Descriptions.Scene1.legend);
}

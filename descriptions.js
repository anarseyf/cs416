const Descriptions = {
  Intro: {
    description:
      "<p>Explore the history of the Formula 1 World Championship</p>" +
      "<p>As you explore the data, details will be revealed in the sidebar.</p>",
    legend:
      "<p>Throughout this page:</p>" +
      "<p></span> Grand Prix (an individual race): <span class='race'></span><br>" +
      "Season (a year of races): <span class='championship'>&nbsp;</span><br>" +
      "Gold color indicates a title win: <span class='champion'>&nbsp;</span><br>" +
      "or a race win: <span class='race gold'></span></p>",
  },
  Sidebar: {
    hint: "<em>Select a name or a year on the left. Details will be revealed here.</em>",
  },
  Scene1: {
    description:
      "<p>The F1 Driver's championship started in 1950 with only 7 races. The seasons have grown steadily over the years, and today the Formula 1 championship features over 20 races each year.</p>" +
      "<p>Start by exploring the timeline of all completed championships between 1950 and today. Notice that some years (like <span class='bright'>2012</span>) are highly competitive, while others (like <span class='bright'>2013</span>) are dominated by a single driver.</p>" +
      "<p>Click on the name of a world champion to reveal their win pattern over the years, as well as career statistics in the sidebar.</p>" +
      "<p>Then scroll down to the next section to take a detailed look at a few World Champions of the last three decades.</p>",
    legend: "<span class='race highlight thatyear'></span> races won by that year's champion",
  },
  Scene2: {
    description: "World champions from 1994 to today. Click on a name to learn more.",
    legend: "<span class='champion'>&nbsp;</span><span> = championship won</span>",
    drivers: {
      "Michael Schumacher": "*** *** ***",
      "Damon Hill": "*** *** ***",
      "Jacques Villeneuve": "*** *** ***",
      "Mika Häkkinen": "*** *** ***",
      "Fernando Alonso":
        "Fernando Alonso is a 2-time World Champion, winning for Renault in 2006 and 2007.",
      "Kimi Räikkönen": "*** *** ***",
      "Lewis Hamilton": "*** *** ***",
      "Jenson Button": "*** *** ***",
      "Sebastian Vettel": "*** *** ***",
      "Nico Rosberg": "*** *** ***",
      "Max Verstappen": "*** *** ***",
    },
  },
  Scene3: {
    description: "These were the most memorable seasons in recent years. Click to learn more.",
    legend: "",
    years: {
      2012: {
        summary: "2012 season summary",
        description:
          "Vettel entered the final race of the season with a thirteen-point lead over Alonso. Alonso needed a podium finish to stand any chance of becoming World Drivers' Champion, but in a race of attrition that finished under the safety car, Vettel finished in sixth place, scoring enough points to win his third consecutive championship, becoming just the third driver in the sport's sixty-three-year history to do so.",
      },
      2016: {
        summary: "2016 season summary",
        description:
          "Nico Rosberg won his only World Drivers' Championship title in the final race of the season. With nine wins and seven other podiums, Rosberg beat teammate and defending World Champion Lewis Hamilton by five points. In doing so, Rosberg followed the success of his father in 1982 and became the second son of a champion to become champion himself, a feat previously achieved by Damon Hill in 1996. Rosberg announced his retirement from the sport shortly after winning the title.",
      },
      2021: {
        summary: "2021 season summary",
        description:
          "The season ended with a controversial finish, with the two title rivals for the drivers' crown entering the last race of the season with equal points. Verstappen sealed the title after winning the season-ending Abu Dhabi Grand Prix after a last-lap restart pass on Hamilton following a contentious conclusion of a safety car period.",
      },
    },
  },
  Credits: {
    dataNotes:
      "Data from this <a target='_blank' href='https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020'>Kaggle dataset</a>.",
    author: "Created by Anar Seyf in 2022. CS 416 Data Visualization @ UIUC MCS-DS.",
  },
};

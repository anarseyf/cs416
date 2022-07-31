const Descriptions = {
  Intro: {
    description: "Explore the history of the Formula 1 World Championship",
    legend: "Circle = race, rectangle = year or championship. Gold = won.",
  },
  Scene1: {
    description:
      "The F1 championship started in 1950 with only 8 races. Today's seasons feature over 20 races.",
    legend: "<span class='race highlight thatyear'></span> = race won by that year's champion",
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

# Narrative Visualization

## by Anar Seyf aseyf2@illinois.edu

- CS 416 Data Visualization @ UIUC MCS-DS
- Summer 2022
- [Source dataset](); [source code]()

## Messaging

> _What is the message you are trying to communicate with the narrative visualization?_

The goal of this project is to introduce the viewer to the world of Formula 1 through explanations backed by data-driven views. Each new section introduces a more curated and focused slice of data than the previous, with the goal of giving a sense of what can make a Formula 1 season unique and memorable, or what makes a driver one of the all-time greats.

## Narrative Structure

> _Which structure was your narrative visualization designed to follow (martini glass, interactive slide show or drop-down story)? How does your narrative visualization follow that structure? (All of these structures can include the opportunity to "drill-down" and explore. The difference is where that opportunity happens in the structure.)_

Interactive Slide Show.

The document consists of three scenes, each introducing a new aspect of the data. Each has a corresponding section title, a few sentences of context, followed by an interactive slide. Interacting with a slide provides a drill-down into that part of the data in a sidebar.

Together these sections serve as an introduction into the highly technical and competitive world of F1, while being selective in the kinds of data made available at each step, so as to avoid overwhelming the viewer.

## Visual Structure

> _What visual structure is used for each scene? How does it ensure the viewer can understand the data and navigate the scene? How does it highlight to urge the viewer to focus on the important parts of the data in each scene? How does it help the viewer transition to other scenes, to understand how the data connects to the data in other scenes?_

The scenes follow a consistent visual pattern: a title, followed by explanatory text, followed by the interactive slide, with details revealed in the sidebar.

The consistency is maintained at the level of individual elements, and reinforced through legends. A circle always represents a race, a rectangle corresponds to a season, and the gold color is used to represent a victory. This color scheme is expanded in Scene 3: gold still represents a win, and silver represents second place.

Wherever appropriate, numerical values are reinforced by showing a visual mark next to numbers. For example, in Scene 2 the sidebar table shows a bar chart in the position column; this provides an intuitive overview of the driver's career profile.

## Scenes

> _What are the scenes of your narrative visualization? How are the scenes ordered, and why?_

Scene 1 introduces the dataset by giving a high-level overview of what it represents (the Formula 1 championship). It provides a "fingerprint" of the entire history of the sport in compact form using a vertical timeline. (Vertical layout is preferred over horizontal for a timeline because most devices provide vertical scrolling, and users expect it.)

Scene 2 focuses on a few specific drivers, revealing their career highlights.

Scene 3 focuses on a handful of remarkable Formula 1 seasons, and provides a detailed look at rivalries that made each memorable.

### Why:

Each scene builds on the previous both in narrative and visual terms, and each provides a progressively narrower, and more curated, slice of the story. This helps take the user from a cold start to familiarity without disorienting them.

## Annotations.

> _What template was followed for the annotations, and why that template? How are the annotations used to support the messaging? Do the annotations change within a single scene, and if so, how and why?_

There are two types of annotations here:

Static:

- Pre-written text for each section, explaining the context and suggesting a starting point for exploration.
- Curated lists (drivers in Scene 2 and seasons in Scene 3) themselves serve as annotations.

Dynamic: generated based on user selections, used in each scene. For example:

- `Michael Schumacher won 7 titles and 93 races across 19 seasons` - in Scenes 1 and 2;
- `Jenson Button placed 2nd in the 2011 championship` - in Scene 2 on timeline mouse-over;
- `9 races won by Nico Rosberg` - in Scene 3 (used in the legend at the bottom of the table).

### Why:

Static annotations provide the look and feel of a newspaper article and help support the narrative structure; dynamic ones help support the data-driven part of the presentation, while making them read as complete sentences again helps with the narrative look and feel. This gives a balance which is a good match for the medium of an interactive document.

## Parameters and States

> _What are the parameters of the narrative visualization? What are the states of the narrative visualization? How are the parameters used to define the state and each scene?_

### Parameters

- **P1** (Scene 1): Selected driver (or none)
- **P2** (Scene 2): Mouseover driver and year (or none)
- **P3** (Scene 2): Selected driver (or none)
- **P4** (Scene 3): Selected season (or none)

### States

- Scene 1:
  - **S1** (default):
    - no driver win highlights;
    - empty sidebar;
    - no reset button;
  - **S2** (driver selected):
    - driver wins highligted;
    - driver stats in sidebar;
    - reset button shown;
- Scene 2:
  - **S3** (default):
    - no driver/year tooltip;
    - no driver highlight;
    - empty sidebar;
    - no reset button;
  - **S4** (driver selected, no mouseover):
    - no driver/year tooltip;
    - driver row highlighted;
    - career details in sidebar;
    - reset button shown;
  - **S5** (mouseover, no driver selected):
    - no driver/year tooltip;
    - driver row highlighted;
    - career details in sidebar;
    - no reset button;
  - **S6** (driver selected, mouseover):
    - driver/year tooltip shown;
    - driver row highlighted;
    - career details in sidebar;
    - reset button shown;
- Scene 3:
  - **S7** (default):
    - no season row highlighted;
    - empty sidebar;
  - **S8** (season selected):
    - season row highlighted;
    - career details in sidebar.

Making a selection in any section resets the other two sections to their default states.

(This is not a full representation of the state machine, but a compact description of each scene's sub-states. For example, on page load all the scenes' default states {**S1**, **S3**, **S7**} coexist.)

## Triggers

> _What are the triggers that connect user actions to changes of state in the narrative visualization? What affordances are provided to the user to communicate to them what options are available to them in the narrative visualization?_

### Triggers

- Scene 1:
  - **T1**: Select a driver → **S2**
  - **T2**: Click reset → **S1**
- Scene 2:
  - **T**: Select a driver → **S4**
  - **T**: Mouseover → **S5** or **S6**
  - **T**: Click reset → **S3**
- Scene 3:
  - **T**: Select a season → **S8**

### Affordances

- Scene 1:
  - The timeline is long, so the legend is provided both at the top and bottom of the list.
- Scene 2:
  - Names and years are shown in multiple places to help orient the viewer.
  - On mouseover both the row and the column are highlighted to help the viewer locate the corresponding values (name and year).
- Scene 3:
  - The entire row is a click target, instead of just the year label.

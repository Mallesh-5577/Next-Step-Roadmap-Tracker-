# SkillTrail – Personal Learning Roadmap Tracker

A beginner-friendly React project built with HTML, CSS and JavaScript. It is a frontend-only app: user data is stored in the browser using LocalStorage.

## Features
- Dashboard with learning progress and active roadmaps
- Explore and search career roadmaps
- Add roadmaps to your personal library
- Expand milestones and mark them complete
- Daily planner: add tasks, complete tasks and set a daily goal
- Log study sessions (25 or 50 minutes)
- Analytics overview and printable progress report
- Dark/light theme toggle
- Responsive layout for mobile, tablet and desktop
- LocalStorage persistence

## Requirements
- Node.js and npm (needed only to run the React development server)
- VS Code (recommended editor)

> Node.js is a development/runtime tool for running the React project. The application itself uses only React, JavaScript, HTML and CSS. There is no Node.js backend.

## Run the project
1. Extract the ZIP file.
2. Open the `skilltrail` folder in VS Code.
3. Open the VS Code terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

## Folder structure

```text
skilltrail/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Topbar.jsx
    │   ├── StatCard.jsx
    │   ├── RoadmapCard.jsx
    │   └── MilestoneModal.jsx
    └── data/
        └── roadmaps.js
```

## Where to edit things
- `src/data/roadmaps.js`: add or edit career roadmaps, milestone descriptions and tasks.
- `src/App.jsx`: application state, navigation, LocalStorage and page content.
- `src/styles.css`: colors, spacing, responsive styles and visual design.
- `src/components/`: reusable interface components.

## Important notes
- No account login or cloud sync is included. LocalStorage saves data in the current browser on the current device.
- The weekly chart currently uses illustrative sample values. Study time is recorded when you use the session buttons.
- "Export progress as PDF" opens the browser print dialog. Choose **Save as PDF**.
- The daily goal is a saved target; this frontend version does not send background notifications.
- If you clear browser site data, your locally saved SkillTrail data may be removed.
"# Next-Step-Roadmap-Tracker-" 

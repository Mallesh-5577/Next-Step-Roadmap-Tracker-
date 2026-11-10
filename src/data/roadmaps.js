// Edit this file to add, remove, or update the learning roadmaps.
export const roadmaps = [
  {
    id: "frontend",
    title: "Frontend Developer",
    category: "Development",
    level: "Beginner",
    duration: "12 weeks",
    description: "Build responsive, accessible websites and interactive user interfaces.",
    icon: "✦",
    color: "violet",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    milestones: [
      { id: "fe-1", title: "HTML foundations", description: "Learn page structure, semantic tags, forms and accessibility basics.", week: "Week 1", tasks: ["Understand HTML document structure", "Practice semantic elements", "Build a profile page"] },
      { id: "fe-2", title: "CSS and responsive design", description: "Style pages with layouts, Flexbox, Grid and responsive techniques.", week: "Weeks 2–3", tasks: ["Learn selectors and box model", "Practice Flexbox and Grid", "Make a responsive landing page"] },
      { id: "fe-3", title: "JavaScript fundamentals", description: "Understand variables, functions, arrays, objects, DOM and events.", week: "Weeks 4–6", tasks: ["Practice JavaScript basics", "Work with arrays and objects", "Build a DOM-based mini app"] },
      { id: "fe-4", title: "React fundamentals", description: "Build interfaces with components, props, state and Hooks.", week: "Weeks 7–9", tasks: ["Create reusable components", "Practice useState and useEffect", "Build a small React application"] },
      { id: "fe-5", title: "Portfolio projects", description: "Create polished projects and publish your work.", week: "Weeks 10–12", tasks: ["Build a complete project", "Upload code to GitHub", "Deploy your portfolio"] }
    ]
  },
  {
    id: "python-fullstack",
    title: "Python Full Stack Developer",
    category: "Development",
    level: "Beginner",
    duration: "16 weeks",
    description: "Learn Python, databases, APIs and frontend integration.",
    icon: "⌘",
    color: "blue",
    skills: ["Python", "SQL", "Django concepts", "React"],
    milestones: [
      { id: "py-1", title: "Python foundations", description: "Learn syntax, data types, conditions, loops, functions and OOP.", week: "Weeks 1–3", tasks: ["Practice Python syntax", "Solve 15 beginner problems", "Build a console application"] },
      { id: "py-2", title: "SQL and databases", description: "Understand tables, CRUD, joins, grouping and relationships.", week: "Weeks 4–5", tasks: ["Practice SELECT and filtering", "Learn joins and grouping", "Design a small database"] },
      { id: "py-3", title: "Backend fundamentals", description: "Understand routing, requests, responses, validation and REST API concepts.", week: "Weeks 6–9", tasks: ["Learn request and response flow", "Understand REST principles", "Plan API endpoints"] },
      { id: "py-4", title: "Frontend integration", description: "Connect a React interface to API endpoints and handle data.", week: "Weeks 10–12", tasks: ["Fetch and display data", "Handle loading and errors", "Create a CRUD interface"] },
      { id: "py-5", title: "Full-stack project", description: "Build, test and present a complete application.", week: "Weeks 13–16", tasks: ["Plan a full-stack project", "Complete core features", "Document and deploy the project"] }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data",
    level: "Beginner",
    duration: "10 weeks",
    description: "Turn raw data into useful insights with spreadsheets, SQL and Python.",
    icon: "▥",
    color: "orange",
    skills: ["Excel", "SQL", "Python", "Data storytelling"],
    milestones: [
      { id: "da-1", title: "Spreadsheet fundamentals", description: "Work with formulas, sorting, filtering and charts.", week: "Weeks 1–2", tasks: ["Practice essential formulas", "Clean a sample dataset", "Create a basic chart"] },
      { id: "da-2", title: "SQL for analysis", description: "Query and summarize data from relational tables.", week: "Weeks 3–4", tasks: ["Practice filtering and sorting", "Learn joins", "Write aggregate queries"] },
      { id: "da-3", title: "Python for data", description: "Use Python basics to inspect, clean and summarize datasets.", week: "Weeks 5–7", tasks: ["Practice Python data structures", "Clean a dataset", "Calculate summary statistics"] },
      { id: "da-4", title: "Portfolio case study", description: "Present an analysis with clear findings and recommendations.", week: "Weeks 8–10", tasks: ["Choose a dataset", "Write key findings", "Prepare a project presentation"] }
    ]
  },
  {
    id: "aiml",
    title: "AI / ML Beginner",
    category: "Artificial Intelligence",
    level: "Beginner",
    duration: "14 weeks",
    description: "Build a foundation in Python, data, machine learning and model evaluation.",
    icon: "◎",
    color: "green",
    skills: ["Python", "Math basics", "Machine learning", "Projects"],
    milestones: [
      { id: "ai-1", title: "Python for AI", description: "Strengthen Python programming and problem-solving skills.", week: "Weeks 1–3", tasks: ["Review Python fundamentals", "Practice functions and OOP", "Complete a mini project"] },
      { id: "ai-2", title: "Math and data basics", description: "Learn useful statistics, probability and data preparation concepts.", week: "Weeks 4–6", tasks: ["Review descriptive statistics", "Understand basic probability", "Explore a small dataset"] },
      { id: "ai-3", title: "Machine learning concepts", description: "Understand supervised learning, training and evaluation.", week: "Weeks 7–10", tasks: ["Learn regression and classification", "Understand train/test split", "Compare model metrics"] },
      { id: "ai-4", title: "Build an ML project", description: "Develop a small end-to-end machine learning project.", week: "Weeks 11–14", tasks: ["Choose a beginner dataset", "Train and evaluate a model", "Document project results"] }
    ]
  }
];

export const starterTasks = [
  { id: "task-1", title: "Study for 30 minutes", done: false },
  { id: "task-2", title: "Practice one coding problem", done: false },
  { id: "task-3", title: "Revise yesterday's topic", done: false }
];

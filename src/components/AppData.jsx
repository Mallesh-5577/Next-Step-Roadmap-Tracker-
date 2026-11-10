import { starterTasks as roadmapStarterTasks } from "../data/roadmaps";

export const STORAGE_KEY = "skilltrail-app-v1";
export const starterTasks = roadmapStarterTasks;

function readSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function getInitialData() {
  const saved = readSavedData();
  return saved ? {
    ...saved,
    dailyGoal: Number(saved.dailyGoal) || 0,
    dailyStudyMinutes: Number(saved.dailyStudyMinutes) || 0,
    goalReachedDate: saved.goalReachedDate || null,
    streak: Number(saved.streak) || 0
  } : {
    enrolled: [],
    completed: [],
    tasks: roadmapStarterTasks,
    dailyGoal: 0,
    studyMinutes: 0,
    dailyStudyMinutes: 0,
    lastVisit: new Date().toDateString(),
    streak: 0,
    goalReachedDate: null
  };
}

export const pageDetails = {
  dashboard: ["Your overview", "A little progress each day goes a long way."],
  explore: ["Explore roadmaps", "Choose a path that moves you closer to your goal."],
  "my-roadmaps": ["My roadmaps", "Your learning paths, all in one place."],
  planner: ["Today's tasks", "A few focused actions to make today count."],
  quizzes: ["Knowledge quizzes", "Test your skills and keep learning."],
  analytics: ["Learning analytics", "A clear picture of the effort you're putting in."]
};

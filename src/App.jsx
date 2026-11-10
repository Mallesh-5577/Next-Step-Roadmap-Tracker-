import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MilestoneModal from "./components/MilestoneModal";
import QuizPage from "./components/Quiz/QuizPage";
import Dashboard from "./components/Dashboard";
import Explore from "./components/Explore";
import MyRoadmaps from "./components/MyRoadmaps";
import Planner from "./components/Planner";
import Analytics from "./components/Analytics";
import Login from "./components/Login";
import Register from "./components/Register";
import Introduction from "./components/Introduction";
import { roadmaps, starterTasks } from "./data/roadmaps";
import { quizzes } from "./data/quizs";

const STORAGE_KEY = "skilltrail-app-v1";
const PAGE_DETAILS = {
  dashboard: ["Your overview", "A little progress each day goes a long way."],
  explore: ["Explore roadmaps", "Choose a path that moves you closer to your goal."],
  "my-roadmaps": ["My roadmaps", "Your learning paths, all in one place."],
  planner: ["Daily planner", "Make today count with a few focused actions."],
  quizzes: ["Knowledge quizzes", "Test your skills and keep learning."],
  analytics: ["Learning analytics", "A clear picture of the effort you're putting in."]
};

function getInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Use starter data when saved browser data is unavailable.
  }
  return {
    enrolled: ["frontend"], completed: [], tasks: starterTasks, dailyGoal: 60,
    studyMinutes: 0, lastVisit: new Date().toDateString(), streak: 0, lastStreakDate: null, dailyScreenTime: {}
  };
}

export default function App() {
  const [data, setData] = useState(getInitialData);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("skilltrail-theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [activeSeconds, setActiveSeconds] = useState(0);
  const sessionStartSeconds = useRef(0);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("next-step-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authView, setAuthView] = useState(null);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)), [data]);
  useEffect(() => {
    if (user) localStorage.setItem("next-step-user", JSON.stringify(user));
    else localStorage.removeItem("next-step-user");
  }, [user]);
  useEffect(() => {
    if (!user) return;
    const today = getDateKey();
    if (data.visitDates?.includes(today)) return;
    updateData({ visitDates: [...(data.visitDates || []), today] });
  }, [user]);
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("skilltrail-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (user && document.visibilityState === "visible") setActiveSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [user]);
  useEffect(() => {
    sessionStartSeconds.current = data.dailyScreenTime?.[getDateKey()] || 0;
    setActiveSeconds(0);
  }, [user]);
  useEffect(() => {
    if (!activeSeconds || activeSeconds % 60 !== 0) return;
    const today = getDateKey();
    const dailyScreenTime = {
      ...(data.dailyScreenTime || {}),
      [today]: sessionStartSeconds.current + activeSeconds
    };
    updateData({ dailyScreenTime });
  }, [activeSeconds]);
  useEffect(() => {
    if (activeSeconds < 30 * 60) return;
    const today = getDateKey();
    if (data.lastStreakDate === today) return;

    const yesterday = getDateKey(Date.now() - 24 * 60 * 60 * 1000);
    const nextStreak = data.lastStreakDate === yesterday ? data.streak + 1 : 1;
    updateData({ streak: nextStreak, lastStreakDate: today });
  }, [activeSeconds, data.lastStreakDate, data.streak]);

  const enrolledRoadmaps = roadmaps.filter(roadmap => data.enrolled.includes(roadmap.id));
  const totalMilestones = enrolledRoadmaps.reduce((sum, roadmap) => sum + roadmap.milestones.length, 0);
  const completedCount = enrolledRoadmaps.reduce((sum, roadmap) => sum + roadmap.milestones.filter(m => data.completed.includes(m.id)).length, 0);
  const overallProgress = totalMilestones ? Math.round(completedCount / totalMilestones * 100) : 0;
  const completedToday = data.tasks.filter(task => task.done).length;
  const filteredRoadmaps = useMemo(() => roadmaps.filter(roadmap => {
    const matchesSearch = `${roadmap.title} ${roadmap.category} ${roadmap.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === "All" || roadmap.category === category);
  }), [search, category]);

  function updateData(changes) {
    setData(previous => ({ ...previous, ...changes }));
  }

  function toggleTask(id) {
    updateData({ tasks: data.tasks.map(task => task.id === id ? { ...task, done: !task.done } : task) });
  }

  function addTask(event) {
    event.preventDefault();
    if (!newTask.trim()) return;
    updateData({ tasks: [...data.tasks, { id: `task-${Date.now()}`, title: newTask.trim(), done: false }] });
    setNewTask("");
  }

  function registerUser(newUser, setError) {
    try {
      const users = JSON.parse(localStorage.getItem("next-step-users") || "[]");
      if (users.some(existingUser => existingUser.email === newUser.email)) {
        setError("An account with this email already exists.");
        return;
      }
      localStorage.setItem("next-step-users", JSON.stringify([...users, newUser]));
      setAuthView("login");
    } catch {
      setError("Unable to create your account in this browser.");
    }
  }

  function loginUser(credentials, setError) {
    try {
      const users = JSON.parse(localStorage.getItem("next-step-users") || "[]");
      const matchedUser = users.find(savedUser => savedUser.email === credentials.email && savedUser.password === credentials.password);
      if (!matchedUser) {
        setError("Email or password is incorrect.");
        return;
      }
      setUser({ name: matchedUser.name, email: matchedUser.email });
      setAuthView(null);
    } catch {
      setError("Unable to log in from this browser.");
    }
  }

  const actions = {
    enrollRoadmap: id => !data.enrolled.includes(id) && updateData({ enrolled: [...data.enrolled, id] }),
    toggleMilestone: id => updateData({ completed: data.completed.includes(id) ? data.completed.filter(item => item !== id) : [...data.completed, id] }),
    clearDoneTasks: () => updateData({ tasks: data.tasks.filter(task => !task.done) }),
    openRoadmap: roadmap => setSelectedRoadmap(roadmap)
  };

  const [pageTitle, pageSubtitle] = PAGE_DETAILS[activePage] || PAGE_DETAILS.dashboard;

  if (!user) {
    return (
      <>
        <Introduction onLogin={() => setAuthView("login")} onRegister={() => setAuthView("register")} />
        <AuthDialog authView={authView} setAuthView={setAuthView} onLogin={loginUser} onRegister={registerUser} />
      </>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} open={menuOpen} onClose={() => setMenuOpen(false)} visitDates={data.visitDates || []} />
      {menuOpen && <button className="mobile-scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      <main className="main-area">
        <Topbar title={pageTitle} subtitle={pageSubtitle} darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} onMenu={() => setMenuOpen(true)} user={user} onLogin={() => setAuthView("login")} onRegister={() => setAuthView("register")} onLogout={() => setUser(null)} />
        <div className="page-content">
          {activePage === "dashboard" && <Dashboard user={user} enrolled={enrolledRoadmaps} data={data} overallProgress={overallProgress} completedCount={completedCount} totalMilestones={totalMilestones} completedToday={completedToday} onOpen={actions.openRoadmap} onNavigate={setActivePage} onToggleTask={toggleTask} quizzes={quizzes} />}
          {activePage === "explore" && <Explore search={search} setSearch={setSearch} category={category} setCategory={setCategory} roadmaps={filteredRoadmaps} enrolled={data.enrolled} completed={data.completed} onEnroll={actions.enrollRoadmap} onOpen={actions.openRoadmap} />}
          {activePage === "my-roadmaps" && <MyRoadmaps roadmaps={enrolledRoadmaps} completed={data.completed} onOpen={actions.openRoadmap} onExplore={() => setActivePage("explore")} />}
          {activePage === "planner" && <Planner tasks={data.tasks} newTask={newTask} setNewTask={setNewTask} onAddTask={addTask} onToggleTask={toggleTask} onClearDone={actions.clearDoneTasks} />}
          {activePage === "analytics" && <Analytics enrolled={enrolledRoadmaps} completed={data.completed} studyMinutes={data.studyMinutes} dailyScreenTime={data.dailyScreenTime} liveSeconds={activeSeconds} sessionStartSeconds={sessionStartSeconds.current} overallProgress={overallProgress} totalMilestones={totalMilestones} completedCount={completedCount} />}
          {activePage === "quizzes" && <QuizPage />}
        </div>
        <footer className="footer">Made for steady progress <span>✦</span> Next Step</footer>
      </main>
      <MilestoneModal roadmap={selectedRoadmap} completed={data.completed} onToggle={actions.toggleMilestone} onClose={() => setSelectedRoadmap(null)} />
      <AuthDialog authView={authView} setAuthView={setAuthView} onLogin={loginUser} onRegister={registerUser} />
    </div>
  );
}

function AuthDialog({ authView, setAuthView, onLogin, onRegister }) {
  if (!authView) return null;
  return <div className="auth-modal-backdrop" role="dialog" aria-modal="true">
    <div className="auth-modal">
      <button className="auth-modal-close" onClick={() => setAuthView(null)} aria-label="Close authentication dialog">×</button>
      {authView === "login"
        ? <Login onLogin={onLogin} onShowRegister={() => setAuthView("register")} />
        : <Register onRegister={onRegister} onShowLogin={() => setAuthView("login")} />}
    </div>
  </div>;
}

function getDateKey(timestamp = Date.now()) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

import { useState } from "react";

export default function Planner({ tasks, newTask, setNewTask, onAddTask, onToggleTask, onClearDone }) {
  const [filter, setFilter] = useState("all");
  const done = tasks.filter(task => task.done).length;
  const visibleTasks = tasks.filter(task => filter === "all" || (filter === "done" ? task.done : !task.done));
  const dateLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return <section className="daily-plan"><div className="daily-plan-paper"><div className="paper-edge" aria-hidden="true" /><span className="daily-plan-kicker">TO DO LIST</span><h2>Today's Tasks</h2><p className="daily-plan-date">{dateLabel}</p><div className="paper-rule" />
    <form className="daily-add-form" onSubmit={onAddTask}><span aria-hidden="true">＋</span><input value={newTask} onChange={event => setNewTask(event.target.value)} placeholder="Log a new task..." aria-label="New task" /><button type="submit">ADD</button></form>
    <div className="daily-filters" role="tablist" aria-label="Task filter">{["all", "active", "done"].map(item => <button key={item} type="button" className={filter === item ? "selected" : ""} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item.toUpperCase()}</button>)}</div>
    <div className="daily-plan-tasks">{visibleTasks.length ? visibleTasks.map(task => <label className={`daily-plan-task ${task.done ? "task-done" : ""}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => onToggleTask(task.id)} /><span className="daily-plan-check" aria-hidden="true">{task.done ? "✓" : ""}</span><span>{task.title}</span></label>) : <div className="daily-plan-empty">The page is blank. Log your first task<br />above.</div>}</div>
    <div className="daily-plan-footer"><span>{tasks.length - done} tasks left</span><button type="button" onClick={onClearDone} disabled={!done}>Clear done</button></div>
  </div></section>;
}

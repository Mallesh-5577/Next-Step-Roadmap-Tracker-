import RoadmapCard from "./RoadmapCard";

export default function Explore({ search, setSearch, category, setCategory, roadmaps, enrolled, completed, onEnroll, onOpen }) {
  const categories = ["All", ...new Set(roadmaps.map(roadmap => roadmap.category))];
  return <>
    <section className="intro-row"><div><span className="eyebrow">FIND YOUR NEXT CHALLENGE</span><h2>Choose your direction.</h2><p>Every expert starts somewhere. Pick a roadmap and take the first step.</p></div><div className="explore-count"><strong>{roadmaps.length}</strong><span>roadmaps available</span></div></section>
    <div className="filter-bar"><div className="search-box"><span>⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search skills or roadmaps..." /></div><div className="category-filters">{categories.map(item => <button key={item} className={category === item ? "filter-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
    <div className="roadmap-grid">{roadmaps.map(roadmap => <RoadmapCard key={roadmap.id} roadmap={roadmap} enrolled={enrolled.includes(roadmap.id)} progress={Math.round(roadmap.milestones.filter(m => completed.includes(m.id)).length / roadmap.milestones.length * 100)} onEnroll={onEnroll} onOpen={onOpen} />)}</div>
    {!roadmaps.length && <div className="empty-box">No roadmaps found. Try another search.</div>}
  </>;
}

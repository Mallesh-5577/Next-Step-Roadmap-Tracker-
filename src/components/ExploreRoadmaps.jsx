import RoadmapCard from "./RoadmapCard";

export default function ExploreRoadmaps({ search, setSearch, category, setCategory, roadmaps, enrolled, completed, onEnroll, onOpen }) {
  const categories = ["All", ...new Set(roadmaps.map(r => r.category))];
  return <>
    <section className="intro-row"><div><span className="eyebrow">FIND YOUR NEXT CHALLENGE</span><h2>Choose your direction.</h2><p>Every expert starts somewhere. Pick a roadmap and take the first step.</p></div><div className="explore-count"><strong>{roadmaps.length}</strong><span>roadmaps available</span></div></section>
    <div className="filter-bar"><div className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills or roadmaps..." /></div><div className="category-filters">{categories.map(c => <button key={c} className={category === c ? "filter-active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
    <div className="roadmap-grid">{roadmaps.map(r => <RoadmapCard key={r.id} roadmap={r} enrolled={enrolled.includes(r.id)} progress={Math.round(r.milestones.filter(m => completed.includes(m.id)).length / r.milestones.length * 100)} onEnroll={onEnroll} onOpen={onOpen} />)}</div>
    {!roadmaps.length && <div className="empty-box">No roadmaps found. Try another search.</div>}
  </>;
}

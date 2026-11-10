import RoadmapCard from "./RoadmapCard";

export default function MyRoadmaps({ roadmaps, completed, onOpen, onExplore }) {
  return <>
    <section className="intro-row"><div><span className="eyebrow">YOUR PERSONAL LIBRARY</span><h2>Keep your momentum.</h2><p>Open a roadmap to check off milestones and keep moving forward.</p></div><button className="button button-primary" onClick={onExplore}>＋ Find a roadmap</button></section>
    {roadmaps.length ? <div className="roadmap-grid">{roadmaps.map(r => <RoadmapCard key={r.id} roadmap={r} enrolled progress={Math.round(r.milestones.filter(m => completed.includes(m.id)).length / r.milestones.length * 100)} onOpen={onOpen} />)}</div> : <div className="empty-box"><strong>Your learning library is empty.</strong><button className="button button-primary" onClick={onExplore}>Explore roadmaps</button></div>}
  </>;
}

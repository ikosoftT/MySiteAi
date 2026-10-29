'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function AcademyCatalog({ courses }) {
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('All');
  const categories=['All',...new Set(courses.map(c=>c.category))];
  const filtered=courses.filter(c=>(category==='All'||c.category===category)&&c.title.toLowerCase().includes(query.trim().toLowerCase()));
  return <><div className="catalog-toolbar"><label className="search-box"><span className="sr-only">Search courses</span><span aria-hidden="true">⌕</span><input type="search" placeholder="Search courses" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="filters" aria-label="Course topics">{categories.map(c=><button key={c} aria-pressed={category===c} className={category===c?'selected':''} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>{filtered.length?<div className="course-grid">{filtered.map(course=><article className="course-card" key={course.id}><Link href={'/academy/'+course.slug} className="course-image"><Image src={course.thumbnail} alt={`${course.title} playlist thumbnail`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized/><span>{course.lessons.length} lessons</span></Link><div className="course-info"><p className="eyebrow">{course.category} / YASSIN CODES</p><h3>{course.title}</h3><Link href={'/academy/'+course.slug}>Start learning <span>↗</span></Link></div></article>)}</div>:<div className="empty-state" role="status"><h3>No matching courses</h3><p>Try a different title or topic.</p><button onClick={()=>{setQuery('');setCategory('All')}}>Clear search</button></div>}</>
}

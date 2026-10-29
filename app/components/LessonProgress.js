'use client';
import { useEffect, useState } from 'react';
export default function LessonProgress({ courseId, lessonId, lessonIds }) {
 const [completed,setCompleted]=useState([]); const key=`iko-academy-progress:${courseId}`;
 useEffect(()=>{try{localStorage.setItem('iko-academy-last',JSON.stringify({courseId,lessonId}))}catch{}},[courseId,lessonId]);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))queueMicrotask(()=>setCompleted(saved.filter(id=>lessonIds.includes(id))))}catch{}},[key,lessonIds]);
 const marked=completed.includes(lessonId);
 function toggle(){const next=marked?completed.filter(id=>id!==lessonId):[...completed,lessonId];setCompleted(next);try{localStorage.setItem(key,JSON.stringify(next));localStorage.setItem('iko-academy-last',JSON.stringify({courseId,lessonId}))}catch{}}
 return <div className="lesson-progress"><div><strong>{completed.length} / {lessonIds.length} completed</strong><small>Saved on this device</small></div><button type="button" aria-pressed={marked} onClick={toggle}>{marked?'✓ Completed':'Mark lesson complete'}</button></div>
}

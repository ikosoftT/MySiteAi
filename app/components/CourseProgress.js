'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function CourseProgress({courseId,slug,lessonIds}){
 const [completed,setCompleted]=useState([]);const [last,setLast]=useState(null);
 useEffect(()=>{queueMicrotask(()=>{try{const saved=JSON.parse(localStorage.getItem(`iko-academy-progress:${courseId}`)||'[]');if(Array.isArray(saved))setCompleted(saved.filter(id=>lessonIds.includes(id)));const recent=JSON.parse(localStorage.getItem('iko-academy-last')||'null');if(recent?.courseId===courseId&&lessonIds.includes(recent.lessonId))setLast(recent.lessonId)}catch{}})},[courseId,lessonIds]);
 return <div className="course-progress"><span>{completed.length} of {lessonIds.length} lessons marked complete on this device</span>{last&&<Link href={`/academy/${slug}/${last}`}>Resume last lesson ↗</Link>}</div>
}

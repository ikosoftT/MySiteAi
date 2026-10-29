import { projects } from './data/projects';
import { verifiedCourses } from './data/academy';
export default function sitemap(){return ['', '/projects', '/academy', '/about', '/ikosoft', '/contact', ...projects.map(p=>'/projects/'+p.slug), ...verifiedCourses.map(c=>'/academy/'+c.slug), ...verifiedCourses.flatMap(c=>c.lessons.map(l=>'/academy/'+c.slug+'/'+l.id))].map(path=>({url:'https://ikoubazen.vercel.app'+path}))}

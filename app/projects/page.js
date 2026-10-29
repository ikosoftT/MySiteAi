import Navbar from '../components/Navbar';
import Link from 'next/link';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import { getRepositories } from '../lib/github';
export const metadata={title:'Projects | Yassine Ikoubazene',description:'Explore software, AI, systems and algorithm projects by Yassine Ikoubazene.',alternates:{canonical:'/projects'},openGraph:{url:'/projects'}};
export default async function ProjectsPage(){const repos=await getRepositories();return <><Navbar/><main id="main-content" className="projects-page"><section className="page-hero projects-page-hero"><div className="page-container"><p className="eyebrow">SELECTED WORK / PUBLIC ARCHIVE</p><h1>Proof in the <em>projects.</em></h1><p>Products, experiments, systems and algorithms built while learning in public.</p><Link className="button primary" href="/contact">Discuss a project ↗</Link></div></section><Projects repos={repos}/></main><Footer/></>}

import React, { useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'
import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);
    const [activeProject, setActiveProject] = useState(null)

    const projects = [
        {
            id: 'p1',
            title: 'Small OpenGL Light Simulation',
            img: '/images/openGLProj.png',
            description: `This is a simulation of Phong lighting in OpenGL, utilizing components such as ambient, diffuse, and specular lighting. This project is tiny. It consists of some floating cubes, an interactive camera, an ImGui interface for manipulating data, two point lights, a directional light, and a spot light. I plan to gradually fix some features and add more as I continue my journey into Computer Graphics.`,
            tools: ['C++', 'OpenGL', 'GLFW', 'GLEW', 'ImGui']
        },
        {
            id: 'p2',
            title: 'Sinful Waves - A Collaborative Game Off 2025 Submission',
            img: '/images/sinfulWaves.png',
            description: 'A collaborative game jam submission showcasing gameplay and cooperative mechanics.',
            tools: ['Unity', 'C#', 'Netcode']
        },
        {
            id: 'p3',
            title: 'YC Directory - A Startup Showcase App',
            img: '/images/project3.png',
            description: 'A small directory app to showcase startups and profiles.',
            tools: ['React', 'Vite', 'Tailwind']
        }
    ]

    useGSAP(() => {
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

        projects.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    y: 50, opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=100'
                    }
                }
            )
        })

        gsap.fromTo(sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 })
    }, []);

    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
               <TitleHeader title="Showcase" sub="My Projects"/>
                <div className="showcaselayout">
                    <div className="first-project-wrapper" ref={project1Ref}>
                        <div className="image-wrapper clickable" onClick={() => setActiveProject(projects[0])}>
                            <img src={projects[0].img} alt={projects[0].title} />
                        </div>
                        <div className="text-content">
                            <h2 onClick={() => setActiveProject(projects[0])} className="clickable">{projects[0].title}</h2>
                            <p className="text-white-50 md:text-xl">
                                {projects[0].description}
                            </p>
                        </div>
                    </div>
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={project2Ref}>
                            <div className="image-wrapper clickable" onClick={() => setActiveProject(projects[1])}>
                                <img src={projects[1].img} alt={projects[1].title} />
                            </div>
                            <h2 onClick={() => setActiveProject(projects[1])} className="clickable">
                                {projects[1].title}
                            </h2>
                        </div>

                        <div className="project" ref={project3Ref}>
                            <div className="image-wrapper bg-[#ffe7eb] clickable" onClick={() => setActiveProject(projects[2])}>
                                <img src={projects[2].img} alt={projects[2].title} />
                            </div>
                            <h2 onClick={() => setActiveProject(projects[2])} className="clickable">
                                {projects[2].title}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Sidebar for project details */}
                {activeProject && (
                    <div className="project-sidebar">
                        <div className="overlay" onClick={() => setActiveProject(null)} />
                        <aside className="panel">
                            <button className="close-btn" onClick={() => setActiveProject(null)}>Close</button>
                            <div className="panel-content">
                                <img src={activeProject.img} alt={activeProject.title} className="w-full rounded" />
                                <h3 className="mt-4">{activeProject.title}</h3>
                                <p className="mt-2">{activeProject.description}</p>
                                <h4 className="mt-4">Tools</h4>
                                <ul className="tools-list">
                                    {activeProject.tools.map((t) => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Showcase
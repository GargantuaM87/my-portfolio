import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'
import TitleHeader from '../components/TitleHeader';
import { useSidebar } from '../contexts/SidebarContext.jsx';

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
    const sectionRef = useRef(null);
    const cardRefs = useRef({});
    const [activeProject, setActiveProject] = useState(null)
    const { openSidebar, closeSidebar } = useSidebar();

    const projects = [
        {
            id: 'p1',
            title: 'Small OpenGL Light Simulation',
            cardImage: '/images/lightSimCardPic.png',
            sidebarImage: '/images/openGLProj.png',
            description: `A simulation of Phong lighting in OpenGL with ambient, diffuse, and specular lighting components.`,
            fullDescription: `This is a simulation of Phong lighting in OpenGL, utilizing components such as ambient, diffuse, and specular lighting. This project is tiny. It consists of some floating cubes, an interactive camera, an ImGui interface for manipulating data, two point lights, a directional light, and a spot light. I plan to gradually fix some features and add more as I continue my journey into Computer Graphics.`,
            tools: ['C', 'C++', 'OpenGL', 'GLFW', 'GLEW', 'ImGui', 'GLM'],
            links: [
                { label: 'GitHub', url: 'https://github.com/GargantuaM87/OpenGL-Light-Simulation' }
            ]
        },
        {
            id: 'p2',
            title: 'Sinful Waves',
            cardImage: '/images/sinfulWaves.png',
            sidebarImage: '/images/sinfulWaves.png',
            description: 'A collaborative game jam submission showcasing gameplay and cooperative mechanics.',
            fullDescription: 'A collaborative game jam submission showcasing gameplay and cooperative mechanics.',
            tools: ['Unity', 'C#'],
            links: [
                { label: 'Demo', url: 'https://opaline-games.itch.io/sinfulwaves' }
            ]
        },
        {
            id: 'p3',
            title: 'Ark Shell',
            cardImage: '/images/arkShellCardPic.png',
            sidebarImage: '/images/arkShellCardPic.png',
            description: 'A small shell that reads commands and executes them.',
            fullDescription: 'A small shell created from scratch in C. It is responsible for reading input from the terminal, splitting that input into tokens, then executing appropiate programs according to what was inputted. This features only a few built-in commands and I plan to add more in the future.',
            tools: ['C'],
            links: [
                { label: 'GitHub', url: 'https://github.com/GargantuaM87/ark-shell' }
            ]
        }
    ]

    useEffect(() => {
        const handleMouseMove = (e) => {
          Object.values(cardRefs.current).forEach((ref) => {
            if (!ref) return
            const rect = ref.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            ref.style.setProperty('--mouse-x', `${x}px`)
            ref.style.setProperty('--mouse-y', `${y}px`)
          })
        }
    
        const handleMouseLeave = (e) => {
          Object.values(cardRefs.current).forEach((ref) => {
            if (!ref) return
            const rect = ref.getBoundingClientRect()
            if (
              e.clientX < rect.left ||
              e.clientX > rect.right ||
              e.clientY < rect.top ||
              e.clientY > rect.bottom
            ) {
              ref.style.setProperty('--mouse-x', '-1000px')
              ref.style.setProperty('--mouse-y', '-1000px')
            }
          })
        }
    
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)
    
        return () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseleave', handleMouseLeave)
        }
      }, [])

    useGSAP(() => {
        gsap.fromTo('.project-card',
            {
                y: 50, opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center'
                }
            }
        )
    }, []);

    return (
        <section id="work" ref={sectionRef} className="flex-center section-padding min-h-screen">
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader title="Showcase" sub="My Projects"/>
                <div className="grid-3-cols mt-16">
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            ref={(el) => {
                                if (el) cardRefs.current[project.id] = el
                            }}
                            onClick={() => {
                                setActiveProject(project);
                                openSidebar();
                            }}
                            className="project-card card-border card-highlight rounded-xl overflow-hidden bg-black-100 h-full 
                                       transition-all duration-300 hover:bg-black-200 cursor-pointer
                                       group hover:border-blue-75"
                        >
                            <div className="relative w-full h-48 overflow-hidden">
                                <img 
                                    src={project.cardImage} 
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-8 flex flex-col gap-4">
                                <h2 className="text-2xl font-semibold group-hover:text-blue-75 transition-colors">
                                    {project.title}
                                </h2>
                                <p className="text-white-50 text-base flex-grow">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool) => (
                                        <span 
                                            key={tool}
                                            className="text-xs px-2 py-1 bg-black-200 text-blue-50 rounded"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-blue-75 text-sm font-medium mt-4 group-hover:translate-x-1 transition-transform">
                                    View Details →
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Sidebar for project details */}
                {activeProject && (
                    <div className="project-sidebar">
                        <div className="overlay" onClick={() => {
                            setActiveProject(null);
                            closeSidebar();
                        }} />
                        <aside className="panel">
                            <button className="close-btn" onClick={() => {
                                setActiveProject(null);
                                closeSidebar();
                            }}>Close</button>
                            <div className="panel-content">
                                <img src={activeProject.sidebarImage} alt={activeProject.title} className="w-full rounded" />
                                <div className="hero-heading-with-bar mt-2">
                                    <span className="hero-heading-bar"></span>
                                    <h3 className="text-2xl md:text-3xl font-semibold mt-4">{activeProject.title}</h3>
                                </div>
                                
                                <p className="mt-2">{activeProject.fullDescription}</p>
                                
                                {activeProject.links && activeProject.links.length > 0 && (
                                    <>
                                        <div className="hero-heading-with-bar">
                                            <span className="hero-heading-bar mt-2"></span>
                                            <h4 className="text-2xl md:text-3xl font-semibold mt-4">Links</h4>
                                        </div>
                                        <div className="links-list flex flex-wrap gap-2 mt-4">
                                            {activeProject.links.map((link) => (
                                                <a 
                                                    key={link.label}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-blue-75 text-white rounded font-medium 
                                                               hover:bg-blue-85 transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}
                                
                                <div className="hero-heading-with-bar">
                                    <span className="hero-heading-bar mt-2"></span>
                                    <h4 className="text-2xl md:text-3xl font-semibold mt-4">Tools</h4>
                                </div>
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
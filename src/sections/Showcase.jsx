import React, { useRef } from 'react'
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
                        <div className="image-wrapper">
                            <img src="/images/openGLProj.png" alt="" />
                        </div>
                        <div className="text-content">
                            <h2>Small OpenGL Light Simulation</h2>
                            <p className="text-white-50 md:text-xl">
                                This is a simulation of Phong lighting in OpenGL, utilizing components such as ambient, diffuse, and specular lighting. 
                                This project is tiny. 
                                It consists of some floating cubes, an interactive camera, an ImGui interface for manipulating data, two point lights, a directional light, and a spot light. 
                                I plan to gradually fix some features and add more as I continue my journey into Computer Graphics.
                            </p>
                        </div>
                    </div>
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={project2Ref}>
                                <img src="/images/sinfulWaves.png" alt="A Game Submission" />
                            </div>
                            <h2>
                                Sinful Waves - A Collaborative Game Off 2025 Submission 
                            </h2>
                        <div className="project" ref={project3Ref}>
                            <div className="image-wrapper bg-[#ffe7eb]">
                                <img src="/images/project3.png" alt="YC Directory" />
                            </div>
                            <h2>
                                YC Directory - A Startup Showcase App
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Showcase
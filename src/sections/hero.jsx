import HeroExperience from '../components/HeroExperience.jsx'
import UpdatePanel from '../components/UpdatePanel.jsx'
import { words } from '../constants/index.js'
import { useRef, useEffect } from 'react'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap'



const hero = () => {
    const welcomeCardRef = useRef(null)
    const tidbitsCardRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            [welcomeCardRef, tidbitsCardRef].forEach((cardRef) => {
                if (!cardRef.current) return
                const rect = cardRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                cardRef.current.style.setProperty('--mouse-x', `${x}px`)
                cardRef.current.style.setProperty('--mouse-y', `${y}px`)
            })
        }

        const handleMouseLeave = (e) => {
            [welcomeCardRef, tidbitsCardRef].forEach((cardRef) => {
                if (!cardRef.current) return
                const rect = cardRef.current.getBoundingClientRect()
                if (
                    e.clientX < rect.left ||
                    e.clientX > rect.right ||
                    e.clientY < rect.top ||
                    e.clientY > rect.bottom
                ) {
                    cardRef.current.style.setProperty('--mouse-x', '-1000px')
                    cardRef.current.style.setProperty('--mouse-y', '-1000px')
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
        gsap.fromTo('.hero-text h1',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.inOut'
            },
        )
    })

    return (
        <section id="hero" className="relative overflow-hidden pt-20 md:pt-24">
            <div className="absolute top0 left-0 z-10">
                <img src="/images/bg.png" alt="background" />
            </div>

            <div className="hero-layout">
                {/*LEFT: HERO CONTENT */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-2">
                        <div className="hero-text">
                            <h1>Shaping
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word) => (
                                            <span key={word.text} className="flex items-center md:gap-3 gap-1 pb-2">
                                                <img
                                                    src={word.imgPath}
                                                    alt={word.text}
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />

                                                <span>{word.text}</span>

                                            </span>))}
                                    </span>
                                </span>
                            </h1>
                            <h1>Into Personal Projects</h1>
                            <h1>That Amass Interest</h1>
                        </div>

                        <section className="mt-2 max-w-3xl space-y-6">
                            <div ref={welcomeCardRef} className="card-border card-highlight rounded-xl p-8 bg-black-100">
                                <div className="hero-heading-with-bar mb-4">
                                    <span className="hero-heading-bar" />
                                    <h2 className="text-3xl md:text-4xl font-semibold">
                                        Welcome!
                                    </h2>
                                </div>
                                <p className="text-white-50 md:text-xl leading-relaxed">
                                    I've always had an interest in 3D art and game development and this
                                    is my little corner to express those interests, encourage my chronic overthinking, and develop my
                                    identity a little more.
                                </p>
                                <p className="text-white-50 md:text-xl leading-relaxed mt-4">
                                    Currently I'm learning Computer Graphics through OpenGL. Some really math heavy stuff,
                                    it really teaches me to love math more and more. I'm also trying to finish up some abandoned projects,
                                    before moving onto new ones. They'll be posted in the projects section once I'm finished with them!
                                </p>
                            </div>

                            {/* Row: Tidbits card + Updates panel (side-by-side on md+, stacked on small screens) */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div ref={tidbitsCardRef} className="card-border card-highlight rounded-xl p-8 bg-black-100 md:flex-1">
                                    <div className="hero-heading-with-bar mb-4">
                                        <span className="hero-heading-bar" />
                                        <h3 className="text-2xl md:text-2xl font-semibold">
                                            Interests!
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-white-50 md:text-xl leading-relaxed indent-10">
                                            I love computer science, game development, and computer graphics. Regarding mathematics, I have an interest in linear algebra, discrete math, and calculus. 
                                        </p>
                                    </div>
                                </div>

                                <div className="md:w-80">
                                    <UpdatePanel />
                                </div>
                            </div>
                        </section>
                    </div>
                </header>
                {/*RIGHT: 3D Model */}
                <figure>
                    <div className="hero-3d-layout">
                        <HeroExperience />
                    </div>

                    {/* Duplicate UpdatePanel removed to avoid overlap; panel now only appears beside Tidbits. */}
                </figure>
            </div>
        </section>
    )
}

export default hero

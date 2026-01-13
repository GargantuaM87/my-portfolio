import HeroExperience from '../components/HeroExperience.jsx'
import { words } from '../constants/index.js'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap'



const hero = () => {
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
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top0 left-0 z-10">
                <img src="/images/bg.png" alt="background" />
            </div>

            <div className="hero-layout">
                {/*LEFT: HERO CONTENT */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
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

                        <section className="mt-2 max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                                Welcome!
                            </h2>
                            <p className="text-white-50 md:text-xl leading-relaxed">
                                I've always had an interest in 3D art and game development and this
                                is my little corner to express those interests, encourage my chronic overthinking, and develop my
                                identity a little more.


                                <p className="text-white-50 md:text-xl leading-relaxed mt-2">
                                            Currently I'm learning Computer Graphics through OpenGL. Some really math heavy stuff, 
                                            it really teaches me to love math more and more. I'm also trying to finish up some abandoned projects,
                                            before moving onto new ones. They'll be posted in the projects section once I'm finished with them!
                                </p>
                            </p>
                            <h3 className="text-2xl md:text-3xl font-semibold mt-2">
                                Some stuff that definately don't matter!
                            </h3>
                            <p className="text-white-50 md:text-xl leading-relaxed mt-2 indent-10">
                                • I have an Afro-Caribbean-South-American heritage (Guyanese)
                            </p>
                            <p className="text-white-50 md:text-xl leading-relaxed mt-2 indent-10">
                                • Track and Field is my favorite sport
                            </p>
                            <p className="text-white-50 md:text-xl leading-relaxed mt-2 indent-10">
                                • I'm a huge cat person, but I don't own one (yet)
                            </p>
                            <p className="text-white-50 md:text-xl leading-relaxed mt-2 indent-10">
                                • I listen to so many genres of music like jazz, lofi-hiphop, rap, samba, afrobeats 
                                    and more
                            </p>
                        </section>
                    </div>
                </header>
                {/*RIGHT: 3D Model */}
                <figure>
            <div className="hero-3d-layout">
                        <HeroExperience />
                    </div>
                </figure>
            </div>
        </section>
    )
}

export default hero

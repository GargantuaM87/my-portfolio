import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../constants/index.js'
import { useEffect, useState } from 'react'
import { useSidebar } from '../contexts/SidebarContext.jsx'

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { isSidebarOpen } = useSidebar();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        }
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    if (isSidebarOpen) {
        return null;
    }

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <div className="inner">
                <NavLink className="logo" to="/">
                    Ayinde Abrams
                </NavLink>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({ path, name }) => (
                            <li key={name} className="group">
                                <NavLink
                                  to={path}
                                  className={({ isActive }) =>
                                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                                  }
                                >
                                    <span>{name}</span>
                                    <span className="underline" />
                                    <span className="active-indicator" />
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Link to="/contact" className="contact-btn group">
                    <div className="inner">
                        <span>Contact Me</span>
                    </div>

                </Link>
            </div>
        </header>
    )
}

export default NavBar

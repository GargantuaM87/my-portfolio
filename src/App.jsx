import NavBar from './components/NavBar.jsx'
import Hero from './sections/hero.jsx'
import Showcase from './sections/Showcase.jsx'
import LogoSection from './components/LogoSection.jsx'
import FeatureCards from './sections/FeatureCards.jsx'
import Experience from './sections/Experience.jsx'
import TechStack from './sections/techStack.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <Showcase />
            <LogoSection />
            <Experience />
            <TechStack />
            <Contact />
            <Footer />
        </>
    )
}

export default App
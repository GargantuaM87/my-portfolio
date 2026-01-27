import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './sections/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import TechStack from './pages/TechStack.jsx'
import Contact from './pages/Contact.jsx'
import { SidebarProvider } from './contexts/SidebarContext.jsx'

const App = () => {
    return (
        <HashRouter>
            <SidebarProvider>
                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/tech-stack" element={<TechStack />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </SidebarProvider>
        </HashRouter>
    )
}

export default App

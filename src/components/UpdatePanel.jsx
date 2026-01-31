import { blogPosts } from '../constants/blogPosts.js'
import { techStackImgs } from '../constants/index.js'
import { useRef, useEffect } from 'react'

const formatBlogItem = (post) => ({
  id: `blog-${post.id}`,
  type: 'Blog',
  title: post.title,
})

const formatSkillItem = (skill, idx) => ({
  id: `skill-${idx}`,
  type: 'Skill',
  title: skill.name || skill.title || 'New Skill',
  img: skill.imgPath,
  desc: `Added to tech stack`,
})

const UpdatePanel = () => {
  const panelRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!panelRef.current) return
      const rect = panelRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      panelRef.current.style.setProperty('--mouse-x', `${x}px`)
      panelRef.current.style.setProperty('--mouse-y', `${y}px`)
    }

    const handleMouseLeave = (e) => {
      if (!panelRef.current) return
      const rect = panelRef.current.getBoundingClientRect()
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        panelRef.current.style.setProperty('--mouse-x', '-1000px')
        panelRef.current.style.setProperty('--mouse-y', '-1000px')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  const items = [
    ...blogPosts.map(formatBlogItem),
    ...techStackImgs.slice(0, 3).map(formatSkillItem),
  ].slice(0, 5)

  return (
    <aside ref={panelRef} className="card-border card-highlight w-72 md:w-80 bg-black-90 border border-white-10 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="hero-heading-with-bar mb-4">
            <span className="hero-heading-bar" />
            <h4 className="text-white text-2xl font-semibold">Updates</h4>
        </div>
        
        <span className="text-white-50 text-sm">Recent</span>
      </div>

      <ul className="space-y-3 max-h-56 overflow-y-auto pr-2">
        {items.map((it) => (
          <li key={it.id} className="flex items-start gap-3">
            {it.img ? (
              <img src={it.img} alt={it.title} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 bg-white-5 rounded-md flex items-center justify-center text-xs text-white-50">{it.type[0]}</div>
            )}

            <div className="flex-1">
              <div className="text-white text-sm font-medium leading-tight">{it.title}</div>
              <div className="text-white-50 text-xs truncate">{it.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default UpdatePanel

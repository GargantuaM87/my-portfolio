import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TitleHeader from '../components/TitleHeader'
import { blogPosts } from '../constants/blogPosts'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Blog = () => {
  const cardRefs = useRef({})

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
    gsap.fromTo(
      '.blog-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#blog',
          start: 'top center',
        },
      }
    )
  }, [])

  return (
    <section id="blog" className="flex-center section-padding min-h-screen">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Blog" sub="Writing, projects, and learning" />
        <div className="grid-3-cols mt-16">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <article
                ref={(el) => {
                  if (el) cardRefs.current[post.slug] = el
                }}
                className="blog-card card-border card-highlight rounded-xl p-8 flex flex-col gap-4 bg-black-100 h-full 
                           transition-all duration-300 hover:bg-black-200 cursor-pointer
                           group-hover:border-blue-75"
              >
                <h2 className="text-2xl font-semibold group-hover:text-blue-75 transition-colors">
                  {post.title}
                </h2>
                <p className="text-blue-50 text-sm">{post.date}</p>
                <p className="text-white-50 text-base flex-grow">{post.description}</p>
                <div className="text-blue-75 text-sm font-medium mt-4 group-hover:translate-x-1 transition-transform">
                  Read More →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog

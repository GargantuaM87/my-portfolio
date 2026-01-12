import React from 'react'
import TitleHeader from '../components/TitleHeader'

const blogPosts = [
  {
    title: 'Building This Portfolio',
    date: 'Ongoing',
    description:
      'Notes on how this React + Vite portfolio is put together—from GSAP animations to 3D scenes with React Three Fiber.',
  },
  {
    title: 'Small OpenGL Light Simulation',
    date: 'Project Deep Dive',
    description:
      'A closer look at the Phong lighting demo: ambient, diffuse, and specular lighting with an interactive camera and ImGui controls.',
  },
  {
    title: 'Game Off 2025: Sinful Waves',
    date: 'Game Jam Retrospective',
    description:
      'Thoughts on building Sinful Waves, a collaborative game jam submission, and what went well (and what didn\'t).',
  },
]

const Blog = () => {
  return (
    <section id="blog" className="flex-center section-padding">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Blog" sub="Writing, projects, and learning" />
        <div className="grid-3-cols mt-16">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="card-border rounded-xl p-8 flex flex-col gap-4 bg-black-100"
            >
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-blue-50 text-sm">{post.date}</p>
              <p className="text-white-50 text-base">{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog

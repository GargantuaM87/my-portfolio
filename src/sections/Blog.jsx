import React from 'react'
import { Link } from 'react-router-dom'
import TitleHeader from '../components/TitleHeader'
import { blogPosts } from '../constants/blogPosts'

const Blog = () => {
  return (
    <section id="blog" className="flex-center section-padding min-h-screen">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Blog" sub="Writing, projects, and learning" />
        <div className="grid-3-cols mt-16">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group"
            >
              <article
                className="card-border rounded-xl p-8 flex flex-col gap-4 bg-black-100 h-full 
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

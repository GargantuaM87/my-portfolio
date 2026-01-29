import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { blogPosts } from '../constants/blogPosts'
import Button from '../components/Button'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="flex-center section-padding min-h-screen">
        <div className="w-full h-full md:px-20 px-5 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <p className="text-white-50">The blog post you're looking for doesn't exist.</p>
          <Button
            name="Back to Blog"
            onClick={() => navigate('/blog')}
            className="mt-4"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="flex-center section-padding min-h-screen">
      <article className="w-full h-full md:px-20 px-5 flex justify-center">
        <div className="w-full max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="text-blue-50 hover:text-blue-75 transition-colors mb-8 flex items-center gap-2"
        >
          ← Back to Blog
        </button>

        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-50 text-sm mb-2">{post.date}</p>
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-white-50 text-lg">{post.description}</p>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-invert max-w-none lg:max-w-5xl">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold mt-12 mb-6 text-white" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-bold mt-10 mb-4 text-white" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-semibold mt-8 mb-3 text-white" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-white-50 text-base leading-relaxed mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside text-white-50 mb-4 space-y-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside text-white-50 mb-4 space-y-2"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="text-white-50" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-50 pl-4 italic text-white-50 my-6"
                  {...props}
                />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="bg-black-200 text-blue-75 px-2 py-1 rounded text-sm font-mono"
                    {...props}
                  />
                ) : (
                  <code
                    className="bg-black-200 text-blue-75 block p-4 rounded overflow-x-auto font-mono text-sm my-4"
                    {...props}
                  />
                ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-black-200 p-4 rounded overflow-x-auto my-4"
                  {...props}
                />
              ),
              table: ({ node, ...props }) => (
                <table
                  className="w-full border-collapse my-6 text-white-50"
                  {...props}
                />
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-black-200 border-b border-white-10" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="border border-white-10 px-4 py-2 text-left font-semibold" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-white-10 px-4 py-2" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-75 hover:underline" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-white-10" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white-10">
          <button
            onClick={() => navigate('/blog')}
            className="text-blue-50 hover:text-blue-75 transition-colors flex items-center gap-2"
          >
            ← Back to Blog
          </button>
        </div>
        </div>
      </article>
    </section>
  )
}

export default BlogPost

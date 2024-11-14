import React from 'react'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  return (
    <div>
        <BlogCard
            authorName={"Stavya"}
            title={"Title of the blog"}
            content={"Content of the blog"}
            publishedDate={"2nd Feb 2024"}
        />
    </div>
  )
}

export default Blogs
import React from 'react'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  return (
    <div className='flex justify-center'>
      <div className='max-w-xl'>
          <BlogCard
            authorName={"Stavya"}
            title={"How to make money while you sleep and be lazy the entire time"}
            content={"How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time"}
            publishedDate={"2nd Feb 2024"}
          />
          <BlogCard
            authorName={"Stavya"}
            title={"How to make money while you sleep and be lazy the entire time"}
            content={"How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time"}
            publishedDate={"2nd Feb 2024"}
          />
          <BlogCard
            authorName={"Stavya"}
            title={"How to make money while you sleep and be lazy the entire time"}
            content={"How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time How to make money while you sleep and be lazy the entire time"}
            publishedDate={"2nd Feb 2024"}
          />
      </div>
    </div>
    
  )
}

export default Blogs
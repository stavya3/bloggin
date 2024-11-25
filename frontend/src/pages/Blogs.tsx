
import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton';

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading){
    return <div>
        <AppBar />
        <div className='flex flex-col items-center justify-center'>
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    </div>
  }
  
  return (
    <div>
      <AppBar />
    <div className='flex justify-center'>
      
      <div>
              
        {blogs.map(blog => <BlogCard
            id={blog.id}
            authorName={"Stavya"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2024"}
        />)}

      </div>
      </div>
    </div>
    
  )
}

export default Blogs

import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks'

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading){
    return <div>
      loadin ...
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
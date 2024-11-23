import { Blog } from "../hooks"
import AppBar from "./AppBar"
import { Avatar } from "./BlogCard"


const FullBlog = ({ blog }: {blog: Blog}) => {
  return (
    <div>
        <AppBar />
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-12">
        <div className= "col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 23rd November 2024</div>
            <div className="">{blog.content}</div>
        </div>
        <div className="col-span-4">
            <div className="text-slate-600 text-lg">
                Author
            </div>
            <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                </div>
                
                <div>
                    <div className="text-xl font-bold">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500">
                        Random catch phrase about the author it could also be the about me that the user can enter.
                    </div>
                </div>
                
            </div>
            
        </div>
        </div>
    </div>
    </div>
    
  )
}

export default FullBlog
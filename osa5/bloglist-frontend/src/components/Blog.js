import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, getAllBlogs, token}) => {
  const [blogVisible, setBlogVisible] = useState(false)

  async function updateLikes() {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      username: blog.user.username
    }
    //await blogService.like(blog._id, blogObj)
    getAllBlogs()
  }

  async function handleDelete() {
    await blogService.deleteBlog(blog._id, token)
    getAllBlogs()
  }

  return (
    <div>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(!blogVisible)}>
          {blogVisible ? 'hide' : 'show'}
        </button>
        <div id='blogshown' style={{display: blogVisible ? '' : 'none'}}>
          <p>{blog.url}</p>
          {blog.likes}
          <button onClick={updateLikes}>like</button>
          <button onClick={handleDelete}>delete blog</button>
        </div>
    </div>  
  )

}

export default Blog

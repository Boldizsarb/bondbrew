import React from 'react'
import './postList.css'
import { PostsData } from '../../data/postData'
import Post from '../aPost/aPost'


const Posts = () => {
  return (
    <div className="Posts">
        {PostsData.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts
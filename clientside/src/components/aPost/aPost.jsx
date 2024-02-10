import React, {  useEffect } from 'react';
import './aPost.css'
import { useSelector, useDispatch } from "react-redux";
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like1.png'
import NotLike from '../../img/notlike.png'
import { useState } from 'react';
import { likePost } from "../../api/postRequest";




// each post




const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const dispatch = useDispatch()


  const sharedBy = data.sharedby === user.firstname ? "Me" : data.sharedby;   // if the post origin is the current user it will show me
  
  const handleLike = () => { // like
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  ///// sared by ///////// shared by 
 

 
  return (
    <div className="Post">
      {/*console.log("data.image:", data.image)*/}
      <img
         src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
         alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
        <span>Shared by: {sharedBy}</span>
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
import React, {  useEffect } from 'react';
import './aPost.css'
import { useSelector, useDispatch } from "react-redux";
import Bin2 from '../../img/bin2.png'
import Bin from '../../img/bin.png'
import Share from '../../img/share.png'
import Heart from '../../img/like1.png'
import NotLike from '../../img/notlike.png'
import { useState } from 'react';
import { likePost } from "../../api/postRequest";
import PostModal from './aPostModal'; 
import ConfirmDelete from './confirmDelete';




// each post


const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;


const Post = ({ data,location,onPostDelete }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const dispatch = useDispatch()
  const [modalOpened, setModalOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // over hover the bin icon
  const [modalOpened1, setModalOpened1] = useState(false);


  const sharedBy = data.sharedby === user.firstname ? "Me" : data.sharedby;   // if the post origin is the current user it will show me
  
  const handleLike = () => { // like
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  ///// sared by ///////// shared by 
 
  const imageName = process.env.REACT_APP_PUBLIC_FOLDER + data.image;

  const openModal = () => {
    setModalOpened(true);

};
  
const handleShowPicture = () => {
  //console.log(imageName);
  openModal();
}
  //console.log(location)
const handleDelete = () => {
  //console.log(data._id);
  setModalOpened1(true);
}
const deletePost = async (postId) => {
  // console.log(postId);
  // console.log(user._id);
  try {
    const deletePost = await fetch(`${getUserUrl}post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    }).then((res) => res.json());
    // console the respose 
    console.log(deletePost);
    onPostDelete(); // call back that triggers the refresh of the posts
    
  } catch (error) {
    console.log(error.message);
  }

}


 
  return (
    <div className="Post">
      {/*console.log("data.image:", data.image)*/}
      <img
         src={data.image ? imageName : ""}
         alt=""
         onClick={handleShowPicture}
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        {/** Only show the bin when the focus is on profile page*/}
         {location === "profilePage" && ( 
          <img
            src={isHovered ? Bin2 : Bin} 
            alt=""
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleDelete}
          />
        )}
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
      <PostModal modalOpened={modalOpened} setModalOpened={setModalOpened} imageName={imageName} />
      <ConfirmDelete
        modalOpened1={modalOpened1}
        setModalOpened1={setModalOpened1}
        postId = {data._id}
        deletePost={deletePost}
       
      />
    </div>
  );
};

export default Post;
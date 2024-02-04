import React from "react";
import PostShare from "../sharingPost/postShare";
import Posts from "../allPosts/postList";


/// the middle of the page 




const PostSides = () => {
    return (
        <div className="PostSide">
            <PostShare />
            <Posts />
    
   </div>
    );
};


export default PostSides;

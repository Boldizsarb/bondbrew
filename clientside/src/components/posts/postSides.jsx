import React from "react";
import PostShare from "../sharingPost/postShare";
import Posts from "../allPosts/postList";


/// the middle of the page 




const PostSides = ({location}) => {
    return (
        <div className="PostSide">
            {location !== "clickedProfilePage" && <PostShare />}
            <Posts />
    
   </div>
    );
};

// the <PostShare /> is not shown on the clickedProfilePage, but on the profilePage!
export default PostSides;

import React from "react";
import "./Home.css";
import ProfileSide from "../../components/profileside/profile";
import PostSides from "../../components/posts/postSides";
import RightSide from "../../components/rightSide/rideSide";


// the whole page 



const Home = () => {
    return (
        <div className="Home">
            <ProfileSide />
            <PostSides />
            <RightSide />
        </div>
    );
    };

export default Home;
import React, {  useEffect,useState } from 'react';
import "./profilecard.css";
import Cover from "../../img/logo1.png";
import Profile from "../../img/linkedin.JPG";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostModal from '../aPost/aPostModal';


const ProfileCard = ({location, person}) => {
    const ProfilePage = true;
    //console.log(person);

    // the person is being passed from the clickedUserProfile page and the user is converrted to the person
    const storeUser = useSelector((state) => state.authReducer.authData.user);
    //const user = location === "clickedProfilePage" ? person : storeUser;
    const user = location === "clickedProfilePage" ? (person || storeUser) : storeUser;
    
    //const { user } = useSelector((state) => state.authReducer.authData);
    //console.log(user) 

    const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    

    const posts = useSelector((state)=>state.postReducer.posts) // getting the posts from the store for the number of posts
    // image modal: 
    const [modalOpened, setModalOpened] = useState(false);
    const imageName = serverPubicFolder + user.profilePicture
    
    const openModal = () => {
      setModalOpened(true);
  };


    return (
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img src={user.coverPicture? serverPubicFolder + user.coverPicture : serverPubicFolder + "defaultCover.png"} alt="Profile Picture" />
      <img src={user.profilePicture? imageName : serverPubicFolder + "defaultProfile.png"} alt="Profile Picture" 
         onClick={openModal} />
        </div>
  
        <div className="ProfileName">
        <span>{user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)} {user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}</span>
          <span style={{ fontStyle: 'italic'}}> {user.worksAt? user.worksAt : "About me"}</span>
        </div>
  
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>Friends</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>
  
            {ProfilePage && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{posts.filter((post)=> post.userId === user._id).length}</span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>{/*do not show the my profile on the profile page */}
         {location === "profilePage" || location === "clickedProfilePage"? (
        ""
      ) : (
        <span >
          <Link className='myProfileText' to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
            My Profile
          </Link>
        </span>
      )}
      <PostModal modalOpened={modalOpened} setModalOpened={setModalOpened} imageName={imageName} />
      </div>
    );
  };

export default ProfileCard;

// {ProfilePage ? "" : <span>My Profile</span>}
import React, { useState, useRef } from "react";
import ProfileImage from "../../img/linkedin.JPG"; // will need to be dinamic
import "./postShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";



// sharing posts

const PostShare = () => {
    const [image, setImage] = useState(null); 
    const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData); // getting the user from the store
    const desc = useRef();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.postReducer.uploading);


  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if (/^image\//.test(img.type)) { // checking if the file is an image
        setImage(img);
      } else {
        // Alert the user if the file is not an image
        alert("Only image files are allowed!");
      }
    }
  };



    const imageRef = useRef();

    const resetPost = () => { // setting the post to the initial state
      desc.current.value = "";
      setImage(null);
    }

    const handleUpload = async (e) => {
      e.preventDefault();
      if (!image && !desc.current.value.trim()) { // wont allow empty posts
        alert('Cannot upload empty post.');
        return; // exit
      }
  
      //post data
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
        sharedby: user.firstname,
      };
  
      // if there is an image with post
      if (image) {
        const data = new FormData();
        const fileName = Date.now() + image.name;
        data.append("name", fileName);
        data.append("file", image);
        newPost.image = fileName;
        console.log(newPost);
        try {
          dispatch(uploadImage(data));
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(uploadPost(newPost));
      resetPost();
    };
    
    return (
      <div className="PostShare">
        <img src={user.profilePicture? serverPubicFolder + user.profilePicture : serverPubicFolder + "defaultProfile.png"} alt="" />
        <div>
          <input ref={desc} required type="text" placeholder="Share with you friends" />
          <div className="postOptions">
            <div className="option" style={{ color: "var(--buttonHover)" }}
            onClick={()=>imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <button className="button ps-button" onClick={handleUpload} disabled={loading}>{loading? "Uploading...": "Share"}</button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
        {image && (
  
          <div className="previewImage">
            <UilTimes onClick={()=>setImage(null)}/>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
  
        )}
  
  
        </div>
      </div>
    );
  };
  
  export default PostShare;
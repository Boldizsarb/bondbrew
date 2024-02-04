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
    const imageRef = useRef();
    const { user } = useSelector((state) => state.authReducer.authData); // getting the user from the store
    const desc = useRef();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.postReducer.uploading);
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        setImage(
          //image: URL.createObjectURL(img),
           img
        );
      }
    };

    const resetPost = () => { // setting the post to the initial state
      desc.current.value = "";
      setImage(null);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
       
      const newPost = {
        userId: user._id,
        desc: desc.current.value
      }
      if(image){ // storing static files in the filesystem
        const data = new FormData();
        const filename = Date.now() + image.name; // creating a unique name for the file
        data.append("name", filename);
        data.append("file", image);
        newPost.img = filename;
        console.log(newPost);
        try{
          dispatch(uploadImage(data))

        }catch(err){
          console.log(err);
        }
      }
      dispatch(uploadPost(newPost));
      resetPost();
    };
    
    return (
      <div className="PostShare">
        <img src={ProfileImage} alt="" />
        <div>
          <input ref={desc} required type="text" placeholder="What's happening" />
          <div className="postOptions">
            <div className="option" style={{ color: "var(--photo)" }}
            onClick={()=>imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <button className="button ps-button" onClick={handleSubmit} disabled={loading}>{loading? "Uploading...": "Share"}</button>
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
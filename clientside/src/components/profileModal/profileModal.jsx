import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../api/uploadRequest";
import { updateUser } from "../../actions/userAction";

// this will pop up on the profile page when clicking on the edit button 


function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  //console.log(formData);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData); // from the store

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      // Check if the file is an image
      if (/^image\//.test(img.type)) {
        // Assign the image based on the input field's name attribute
        if (event.target.name === "profileImage") {
          setProfileImage(img);
        } else if (event.target.name === "coverImage") {
          setCoverImage(img);
        }
      } else {
        // Alert the user if the file is not an image
        alert("Only image files are allowed!");
      }
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData(); // same logic as sharing a post
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData)); // updating the user in the store
    setModalOpened(false); // closing the modal
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm"> {/* the informations of the profile*/}
        <h3>Your info</h3>
        {/* the input fields for the profile */}
        <div>
          <input   
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange} // when the input changes
            value={formData.firstname} // the value of the input
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Life Motto"
            onChange={handleChange} 
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
            onChange={handleChange}
            value={formData.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div>
          <select
            className="infoInput"
            name="gender"
            onChange={handleChange}
            value={formData.gender}
          >
            <option value="" >Keep it secret</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="about"
            placeholder="Field of work"
            onChange={handleChange}
            value={formData.about}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="mostinterestedin"
            placeholder="I am most interested in..."
            onChange={handleChange}
            value={formData.mostinterestedin}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="hobbies"
            placeholder="My most favorite hobbies are..."
            onChange={handleChange}
            value={formData.hobbies}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="bio"
            placeholder="Write something about yourself..."
            onChange={handleChange}
            value={formData.bio}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input  type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;

// to add data: add it to user model, then add input over here within the modal
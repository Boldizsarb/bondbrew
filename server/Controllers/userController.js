import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const frontEndUrl = process.env.FRONTEND_BASE_URL;


// get all users 
export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc // taking the password out of the user details upon request, this makes it invisible
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};



// get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;  // taking the password out of the user details upon request, this makes it invisible

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


 // querrying first and last name
export const getUserByFirstName = async (req, res) => {

  const name = req.params.name;

  if (!name) {
    return res.status(400).json("Name parameter is required");
  }

  try {
    const users = await UserModel.find({
      $or: [
        { firstname: { $regex: new RegExp(name, 'i') } }, 
        { lastname: { $regex: new RegExp(name, 'i') } }   
      ]
    });

    if (users.length > 0) {
      // Exclude the password from the response
      const sanitizedUsers = users.map(user => {
        const { password, ...otherDetails } = user.toObject(); 
        return otherDetails;
      });
      res.status(200).json(sanitizedUsers);
    } else {
      res.status(404).json("User(s) not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};




export const getUserByUserName = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const { password, ...otherDetails } = user._doc;  // taking the password out of the user details upon request, this makes it invisible

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

  ///// FORGOT PASSWORD    ///// FORGOT PASSWORD    ///// FORGOT PASSWORD    ///// FORGOT PASSWORD    ///// FORGOT PASSWORD    ///// FORGOT PASSWORD    
export const getUserByUsername = async (req, res) => {
  const username  = req.params.username;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      // Return all user data if a match is found
      const secret = SECRET_KEY + user.password;
      const token = jwt.sign({ username: user.username, id: user._id }, secret, {
        expiresIn: "1h",
      });
      // the link
      //const link = `http://localhost:3000/resetpassword/${user._id}/${token}`; // have to be 3000 || the link to front end 
       const link = `${frontEndUrl}/resetpassword/${user._id}/${token}`; // have to be 3000 || the link to front end
      console.log(link);
    
      res.status(200).json({ link: link });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  //console.log(req.params);
  const user = await UserModel.findOne({ _id: id });
  if(!user) return res.status(404).json("User does not exist");
  const secret = SECRET_KEY + user.password;
  // veryfying the token
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      res.status(200).json(user);
     // res.status(200).json("verified");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //res.status(200).json("done");
};


export const updatePassword = async (req, res) => {
  const id = req.params.id; // The ID from URL parameters
  const { _id, password } = req.body; // Extracting _id, password, and admin status from request body
  
  // Validate current user's ID or admin status before proceeding
  if (id === _id ) {
    if (!password) {
      return res.status(400).json("Password is required.");
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update only the password field in the user document
      const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { password: hashedPassword } }, { new: true });

      // Simplified response without the token
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("Access Denied! You can only update your own profile.");
  }
};


////////////////////// END OF FORGOT PASSWORD    ///////// END OF FORGOT PASSWORD    ///////// END OF FORGOT PASSWORD    ///////// END OF FORGOT PASSWORD    

export const fetchUserById = async (req, res) => {
  const id = req.body.userId;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;  // taking the password out of the user details upon request, this makes it invisible

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body; 
                /// currentuserid needs to be in the body of the request, so that the user can be identified
  if (id === _id || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10); // hashing backwards too 
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign(
        {username: user.username, id: user._id},
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
      );

      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;
                // currentuserid needs to be in the body of the request or needs to be admin 
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) { // one cannot follow oneself
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow a User
export const UnFollowUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const getUserInterests = async (req, res) => {
  //const _id = req.body 
  const _id = req.body._id;
  
  try {
    //const user = await UserModel.findById(_id); // Selects only the interests field and excludes the _id field
    const user = await UserModel.findById(_id).select('interests -_id'); 
    if (!user) {
      return res.status(404).json("User not found.");
    }
    // Return the interests of the user
    res.status(200).json({ interests: user.interests });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


export const updateInterests = async (req, res) => {

  //const id = req.params.id; // The ID from URL parameters
  const { _id, interests } = req.body; // Extracting _id and interests from request body
  
  // Validate current user's ID before proceeding
  //if (id === _id) {
    if (!interests || !Array.isArray(interests) || interests.length === 0 || interests.length > 5) {
      return res.status(400).json("Interests are required and must be a non-empty array.");
    }
    try {    
      const updatedUser = await UserModel.findByIdAndUpdate(_id, { $set: { interests } }, { new: true });

      res.status(200).json("Successfully updated interests.");
    } catch (error) {
      res.status(500).json(error.message);
    }
  //} else {
    res.status(403).json("Access Denied! You can only update your own profile.");
  //}
};



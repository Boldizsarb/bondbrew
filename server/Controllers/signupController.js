import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Register
export const registerUser = async (req, res) => {
    //const { username, password, firstname, lastname } = req.body;
   
  
    const salt = await bcrypt.genSalt(10);   // 10 times hashing for speed 
    const hashedPass = await bcrypt.hash(req.body.password, salt);// hashing the password before saving it to the database

    req.body.password = hashedPass; // 
    const newUser = new UserModel(req.body) // only req.body
    const {username } =req.body
  
    // const newUser = new UserModel({ //  testing purpose only 
    //   username,
    //   password: hashedPass,
    //   firstname,
    //   lastname,
    // });
  
    try {
      const oldUser = await UserModel.findOne({username});
      if (oldUser) return res.status(400).json({ message: "Username already exists" });
      const user = await newUser.save();
        //// jwt token
      const token = jwt.sign({ username: user.username, id: user._id },
        process.env.SECRET_KEY, { expiresIn: "1h" }) // token expires in 1 hour

      res.status(200).json({user, token}); // sending the token as well, this will be stored in the redux store 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  

  
  // login User
  
export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})


        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)


            //validity? res.status(200).json(user): res.status(400).json("Wrong Password")
            if(!validity)
            {
                res.status(400).json("Wrong Password")
            }else{ // otherwise use jwt token
                const token = jwt.sign({ username: user.username, id: user._id },
                    process.env.SECRET_KEY, { expiresIn: "1h" })
                    res.status(200).json({user, token});
            
            }
        }
        else{
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
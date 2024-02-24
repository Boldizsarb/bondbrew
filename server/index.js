import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import SignupRouter from "./Routes/signupRouter.js";
import Userrouter from "./Routes/userRoutes.js";
import PostRouter from "./Routes/postRoutes.js";
import UploadRouter from "./Routes/uploadRoutes.js";
import ChatRouter from "./Routes/chatRoutes.js";
import MessageRouter from "./Routes/messageRoutes.js";
import PlanRouter from "./Routes/planRoutes.js";


const app = express();
app.use(express.json());
dotenv.config();

// serving images to public, ergo the client side can access the images
app.use(express.static("public"));
app.use("/images", express.static("images"));


// Middleware
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());


// Routes
app.use("/user", SignupRouter); // login and register
//http://localhost:5000/user/register
app.use("/userser", Userrouter); // get, update, delete, follow, unfollow

app.use("/post", PostRouter); // create, get, update, delete, like, timeline

app.use("/upload", UploadRouter); // upload image

app.use("/chat", ChatRouter); // create, get, find

app.use("/message", MessageRouter); // add, get

app.use("/plan", PlanRouter); // 





mongoose.connect(process.env.MONGO_DB, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));



// original: "mongodb+srv://donboyszy:WFU3NSzMmNOmWjSD@bondbrew.t7bbpt4.mongodb.net/?retryWrites=true&w=majority"



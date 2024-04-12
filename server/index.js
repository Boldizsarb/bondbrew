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
import MatchRouter from "./Routes/matchesRoutes.js";
import ChatBot from "./Routes/chatBotRoutes.js";
import Notification from "./Routes/notificationRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();
app.use(express.json());
dotenv.config();

// serving images to public, ergo the client side can access the images
app.use(express.static("public"));
app.use("/images", express.static("images"));


// Middleware
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

//app.use(cors()); // original

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://176.58.109.95', 'http://localhost:3000', 'http://localhost5000']; // Add more domains as needed
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// Routes
app.use("/user", SignupRouter); // login and register

app.use("/userser", Userrouter); // get, update, delete, follow, unfollow

app.use("/post", PostRouter); // create, get, update, delete, like, timeline

app.use("/upload", UploadRouter); // upload image

app.use("/chat", ChatRouter); // create, get, find

app.use("/message", MessageRouter); // add, get

app.use("/plan", PlanRouter); // 

app.use("/match", MatchRouter); // get, create, delete

app.use("/chatbot", ChatBot);

app.use("/notification", Notification);


const swaggerOptions = {

  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'API Endpoints testing',
          description: 'API Information',
          contact: {
              name: 'Developer'
          },
          licence: {
              name: 'Apache 2.0',
              url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
          },
          servers: [
              {url: 'http://localhost:5000'}
          ]
      }
  },
  apis: ["./Routes/*.js"]
};


const swaggerDocs = swaggerJSDoc(swaggerOptions); // the original 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));





mongoose.connect(process.env.MONGO_DB, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(` Server: Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));




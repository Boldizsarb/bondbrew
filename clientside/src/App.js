import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Auth from "./pages/signup/signup";
import "./style/App.css";
import {Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/chat/chat";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import ResetPassword from "./pages/resetPassword/resetPassword";
import ClickedUserProfile from "./pages/clickedUserProfile/clickedUserProfile";

//////  this file enables the routing of the app
function App() {

  const user = useSelector((state) => state.authReducer.authData); // user state from the redux store

  return (
    
    <div className="App"> 
      <div className="blur" style={{top:'-18%',right:'0'}}></div>
      <div className="blur" style={{top: '36%',left:'-6rem'}}></div>
      <div className="blur" style={{top: '-20%',left:'20rem'}}></div>
      <div className="blur" id="moreblur" style={{top: '40%',left:'40rem'}}></div>
     <Routes>
     <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
         <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
         <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
         <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
        <Route
          path="/forgotPassword"
          element={!user ? <ForgotPassword /> : <Navigate to="../auth" />}
        />
        <Route
          path="/resetpassword/:id/:token" // coming from the signuprequest.js/ api
          element={!user ? <ResetPassword /> : <Navigate to="../auth" />}
        />
        <Route
          path="/clickProfile/:id"
          element={user ? <ClickedUserProfile /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;


// the home will be called with router 
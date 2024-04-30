import React, { useEffect, useState} from "react";
import './postList.css';
import Post from '../aPost/aPost'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {getTimelinePosts} from '../../actions/postAction';



const Posts = () => {

  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData); // fetchign user from redux store
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [location, setLocation] = useState("");

  const [refreshTrigger, setRefreshTrigger] = useState(0); // to refresh the posts upon delete
  const refreshTrigger1 = useSelector(state => state.refreshReducer); // when following or unfollowing a user, the posts need to be refreshed


 

  useEffect(() => { 
    dispatch(getTimelinePosts(user._id));
  }, [refreshTrigger,refreshTrigger1]); // if the trigger changes the useEffect will run again, refresing the posts


  useEffect(() => {
    if (params.id) {
      setLocation(params.id === user._id ? "profilePage" : "");
    }
  }, [params.id, user._id]); 
  //console.log(location);

  if(!posts) return 'There are no posts to show...';

  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  //console.log(params.id);


  
  return (
    <div className="Posts">
      {loading
        ? "Loading posts...."
        : posts.map((post, id) => { // onpost delete is a function that will be passed to the post component, and the callback will be called when the delete button is clicked
            return <Post data={post} key={id} location={location} onPostDelete={() => setRefreshTrigger(prev => prev + 1)}/>;
          })}
    </div>
  );
};

export default Posts;


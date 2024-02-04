import React, { useEffect } from "react";
import './postList.css'
import { PostsData } from '../../data/postData'
import Post from '../aPost/aPost'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {getTimelinePosts} from '../../actions/postAction';



const Posts = () => {

  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData); // fetchign user from redux store
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if(!posts) return 'There are no posts to show. Post something!';

  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      {loading
        ? "Loading posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
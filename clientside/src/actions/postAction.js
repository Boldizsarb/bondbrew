import * as PostsApi from "../api/postRequest";
import { useSelector, useDispatch } from "react-redux";

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
      const { data } = await PostsApi.getTimelinePosts(id);
      dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "RETREIVING_FAIL" });
    }
  };
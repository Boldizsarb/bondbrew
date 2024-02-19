
//import * as AuthApi from "../api/signupRequest";
import * as AuthApi from "../api/signupRequest";




export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    //console.log(error);
    const errorMessage = error.response && error.response.data && error.response.data.message 
                         ? error.response.data.message 
                         : 'Password or username is incorrect. Please try again.';
    dispatch({ type: "AUTH_FAIL", payload: errorMessage });

    //dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    //console.log(error.message);
    const errorMessage = error.response && error.response.data && error.response.data.message 
                         ? error.response.data.message 
                         : 'Something went wrong. Please try again.';
    dispatch({ type: "AUTH_FAIL", payload: errorMessage });
    //dispatch({ type: "AUTH_FAIL" });
  }
};


export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}

export const resetAuthError = () => {
  return { type: 'AUTH_ERROR_RESET' };
};
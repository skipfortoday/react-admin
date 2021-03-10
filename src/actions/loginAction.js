import axios from "axios";
import { BASEURL } from "./adminAction";

export const POST_LOGIN_USER = "POST_LOGIN_USER";
export const POST_LOGOUT_USER = "POST_LOGOUT_USER";

export const postLoginUser = (data) => {
  return (dispatch) => {
    axios
      .post("http://"+BASEURL+"/api/login", data)
      .then(function (response) {
        dispatch({
          type: POST_LOGIN_USER,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_LOGIN_USER,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: POST_LOGOUT_USER
  };
};



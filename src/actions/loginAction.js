import axios from "axios";
import { headers } from "../config";
import { BASEURL } from "./adminAction";

export const POST_LOGIN_USER = "POST_LOGIN_USER";
export const POST_LOGOUT_USER = "POST_LOGOUT_USER";
export const RESET_STATE = "RESET_STATE";

export const resetState = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_STATE,
    })
  }
}

export const postLoginUser = (data) => {
  return (dispatch) => {
    axios
      .post(BASEURL+"/api/login", data, headers)
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
            data: {status:false},
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



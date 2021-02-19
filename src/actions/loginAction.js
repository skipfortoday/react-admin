import axios from "axios";

export const POST_LOGIN_USER = "POST_LOGIN_USER";

export const postLoginUser = (data) => {
  return (dispatch) => {
    axios
      .post("http://192.168.0.25:3001/api/login", data)
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

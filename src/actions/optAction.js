import axios from "axios";

export const GET_OPT_USER = "GET_OPT_USER";




export const getOptUser = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.0.25:3001/api/cabang")
      .then(function (response) {
        dispatch({
          type: GET_OPT_USER,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_USER,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

import axios from "axios";

export const GET_OPT_USER = "GET_OPT_USER";
export const GET_OPT_GROUP = "GET_OPT_GROUP";
export const GET_OPT_CABANG = "GET_OPT_CABANG";


export const getOptUser = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.0.25:3001/api/optuser")
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

export const getOptGroup = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.0.25:3001/api/optgroup")
      .then(function (response) {
        dispatch({
          type: GET_OPT_GROUP,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_GROUP,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptCabang = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.0.25:3001/api/optcabang")
      .then(function (response) {
        dispatch({
          type: GET_OPT_CABANG,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_CABANG,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

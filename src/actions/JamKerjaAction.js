import axios from "axios";

export const GET_JAMKERJA_LIST = "GET_JAMKERJA_LIST";
export const GET_JAMKERJA_DETAIL = "GET_JAMKERJA_DETAIL";
export const POST_JAMKERJA_CREATE = "POST_JAMKERJA_CREATE";
export const PUT_JAMKERJA_EDIT = "PUT_JAMKERJA_EDIT";



export const getJamKerjaList = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.1.100:3001/api/user")
      .then(function (response) {
        dispatch({
          type: GET_JAMKERJA_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_JAMKERJA_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getJamKerjaDetail = (Shift) => {
  return (dispatch) => {
    axios
      .get(
        "http://192.168.1.100:3001/api/user/"+Shift
      )
      .then(function (response) {
        dispatch({
          type: GET_JAMKERJA_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_JAMKERJA_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postJamKErjaCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://192.168.1.100:3001/api/user/",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_JAMKERJA_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_JAMKERJA_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putJamKerjaUpdate = (data, Shift) => {
  return (dispatch) => {
    axios
      .put(
        "http://192.168.1.100:3001/api/user/"+Shift,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_JAMKERJA_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_JAMKERJA_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteJamKerja = (Shift) => {
  return (dispatch) => {
    axios
      .delete(
         "http://192.168.1.100:3001/api/user/"+Shift
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataJamKerja = () => {
  return (dispatch) => {
    dispatch({
      type: GET_JAMKERJA_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_JAMKERJA_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};

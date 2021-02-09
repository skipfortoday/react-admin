import axios from "axios";

export const GET_IZIN_LIST = "GET_IZIN_LIST";
export const GET_IZIN_DETAIL = "GET_IZIN_DETAIL";
export const POST_IZIN_CREATE = "POST_IZIN_CREATE";
export const POST_IZIN_GROUP = "POST_IZIN_GROUP";
export const PUT_IZIN_EDIT = "PUT_IZIN_EDIT";



export const getIzinList = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.1.30:3001/api/izin")
      .then(function (response) {
        dispatch({
          type: GET_IZIN_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_IZIN_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getIzinDetail = (UserID) => {
  return (dispatch) => {
    axios
      .get(
        "http://192.168.1.30:3001/api/user/"+UserID
      )
      .then(function (response) {
        dispatch({
          type: GET_IZIN_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_IZIN_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postIzinCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://192.168.1.30:3001/api/izin",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_IZIN_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_IZIN_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postIzinGroup= (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://192.168.1.30:3001/api/izingroup",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_IZIN_GROUP,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_IZIN_GROUP,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putIzinUpdate = (data, DatangID) => {
  return (dispatch) => {
    axios
      .put(
        "http://192.168.1.30:3001/api/izin/"+DatangID,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_IZIN_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_IZIN_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteIzin = (DatangID) => {
  return (dispatch) => {
    axios
      .delete(
         "http://192.168.1.30:3001/api/izin/"+DatangID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataIzin = () => {
  return (dispatch) => {
    dispatch({
      type: GET_IZIN_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_IZIN_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};

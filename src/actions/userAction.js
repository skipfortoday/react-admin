import axios from "axios";
import { siteConfig } from "../config";
import { BASEURL } from "./adminAction";

export const GET_USERS_LIST = "GET_USERS_LIST";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const POST_USER_CREATE = "POST_USER_CREATE";
export const PUT_USER_EDIT = "PUT_USER_EDIT";
export const GET_USER_V = "GET_USER_V";
export const GET_CABANG_LIST = "GET_CABANG_LIST";
export const GET_CABANG_DETAIL = "GET_CABANG_DETAIL";
export const POST_CABANG_CREATE = "POST_CABANG_CREATE";
export const PUT_CABANG_EDIT = "PUT_CABANG_EDIT";
// export const SET_TGL_CUTI = "SET_TGL_CUTI";

let headers = {
  headers :{
    'Access-Control-Allow-Origin':'*',
    KodeCabang:siteConfig.kodeCabang
  }
}

export const getUsersList = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/user", headers)
      .then(function (response) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const getUserV = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/vuser")
      .then(function (response) {
        dispatch({
          type: GET_USER_V,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USER_V,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getUserDetail = (UserID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/user/"+UserID
      )
      .then(function (response) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postUserCreate = (data) => {
  data.GroupID = data.GroupID.value;
  data.KodeCabang = data.KodeCabang.value;
  return (dispatch) => {
    axios
      .post(
         BASEURL+"/api/user/",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_USER_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_USER_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putUserUpdate = (data, UserID) => {
  return (dispatch) => {
    data.GroupID = data.GroupID.value;
    data.KodeCabang = data.KodeCabang.value;
    axios
      .put(
        BASEURL+"/api/user/"+UserID,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_USER_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_USER_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteUser = (UserID) => {
  return (dispatch) => {
    axios
      .delete(
         BASEURL+"/api/user/"+UserID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const resetUser = (UserID) => {
  return (dispatch) => {
    axios
      .put(
         BASEURL+"/api/resetdevice/"+UserID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};

export const resetPasswordUser = (UserID) => {
  return (dispatch) => {
    axios
      .put(
         BASEURL+"/api/resetpassworduser/"+UserID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
    dispatch({
      type: POST_USER_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};

export const getCabangList = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/cabang")
      .then(function (response) {
        dispatch({
          type: GET_CABANG_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_CABANG_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getCabangDetail = (KodeCabang) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/cabang/"+KodeCabang
      )
      .then(function (response) {
        dispatch({
          type: GET_CABANG_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_CABANG_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postCabangCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         BASEURL+"/api/cabang/",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_CABANG_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_CABANG_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putCabangUpdate = (data, KodeCabang) => {
  return (dispatch) => {
    axios
      .put(
        BASEURL+"/api/cabang/"+KodeCabang,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_CABANG_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_CABANG_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteCabang = (KodeCabang) => {
  return (dispatch) => {
    axios
      .delete(
         BASEURL+"/api/cabang/"+KodeCabang
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataCabang = () => {
  return (dispatch) => {
    dispatch({
      type: GET_CABANG_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_CABANG_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};


// export const setTglCuti = () => {
//   return (dispatch) =>{
//     dispatch({
//       type: SET_TGL_CUTI,
//       payload: {

//       }
//     })
//   }
// }
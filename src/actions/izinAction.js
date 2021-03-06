import axios from "axios";
import { headers } from "../config";
import { BASEURL } from "./adminAction";

export const GET_IZIN_LIST = "GET_IZIN_LIST";
export const GET_IZIN_LISTSOLO = "GET_IZIN_LISTSOLO";
export const GET_IZIN_DETAIL = "GET_IZIN_DETAIL";
export const POST_IZIN_CREATE = "POST_IZIN_CREATE";
export const POST_IZIN_GROUP = "POST_IZIN_GROUP";
export const PUT_IZIN_EDIT = "PUT_IZIN_EDIT";
export const GET_IZIN_DETAIL_FORM = "GET_IZIN_DETAIL_FORM";
export const GET_IZIN_DETAIL_FORM_STATUS = "GET_IZIN_DETAIL_FORM_STATUS";
export const EDIT_JAM_FORM = "EDIT_JAM_FORM";
export const RESET_IZIN_SOLO = "RESET_IZIN_SOLO";
export const RESET_RESPONSE_DI = "RESET_RESPONSE_DI";
export const ON_SUBMITIING = "ON_SUMBITTING";

export const setOnSubmitting = (val) => {
  return (dispatch) => {
    dispatch({
      type: ON_SUBMITIING,
      payload:{
        data:val
      }
    })
  }
}

export const resetResponseDataIzin = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_RESPONSE_DI,
      payload:{
        data:false
      }
    })
  }
}

export const getIzinList = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/izin", headers)
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

export const getIzinListSolo = (UserID = null,TglAwal = null,TglAkhir = null) => {
  
  if(UserID == null){
    return (dispatch) => {
      dispatch({
        type: GET_IZIN_LISTSOLO,
        payload: {
          data: false,
          errorMessage: false,
        },
      });
    }
  }

  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/izinsolo/"+UserID+"&"+TglAwal+"&"+TglAkhir,
        headers
      )
      .then(function (response) {
        dispatch({
          type: GET_IZIN_LISTSOLO,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_IZIN_LISTSOLO,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getIzinDetail = (UserID = null) => {
  if(UserID == null){
    return (dispatch) => {
      dispatch({
        type: GET_IZIN_DETAIL,
        payload: {
          data: false,
          errorMessage: false,
        },
      });
    }
  }
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/user/"+UserID,
        headers
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
        BASEURL+"/api/izin",
        data,
        headers
      )
      .then(function (response) {
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

export const putIzinUpdate = (data, DatangID) => {
  return (dispatch) => {
    axios
      .put(
        BASEURL+"/api/izin/"+DatangID,
        data,
        headers
      )
      .then(function (response) {
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


export const postIzinGroup= (data) => {
  return (dispatch) => {
    axios
      .post(
        BASEURL+"/api/pilihizin",
        data,
        headers
      )
      .then(function (response) {
        // console.log(response)
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

export const deleteIzin = (DatangID) => {
  return (dispatch) => {
    axios
      .delete(
        BASEURL+"/api/izin/"+DatangID,
        headers
      )
      .then(function (response) {
        dispatch({
          type: RESET_RESPONSE_DI,
          payload: {
            data:false
          },
        });
        
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


// detail data untuk form edit 
export const getIzinDetailForm = (DatangID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/detailAbsensi/"+DatangID,
        headers
      )
      .then(function (response) {
        dispatch({
          type: GET_IZIN_DETAIL_FORM,
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

export const setEditJamForm = (checked) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_JAM_FORM,
      payload: {
        data: checked
      },
    });
  }
};

export const setStatusForm = (value) => {
  return (dispatch) => {
    dispatch({
      type: GET_IZIN_DETAIL_FORM_STATUS,
      payload:{
        data:{
          STATUS: value
        }
      }
    });
  }
};
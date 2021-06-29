import axios from "axios";
import { headers } from "../config";
import { BASEURL } from "./adminAction";

export const GET_OPT_USER = "GET_OPT_USER";
export const GET_OPT_USERMANUAL = "GET_OPT_USERMANUAL";
export const GET_OPT_USERMANUALPULANG = "GET_OPT_USERMANUALPULANG";
export const GET_OPT_USERMANUALKELUAR = "GET_OPT_USERMANUALKELUAR";
export const GET_OPT_USERMANUALKEMBALI = "GET_OPT_USERMANUALKEMBALI";
export const GET_OPT_USERMANUALKELUARIST = "GET_OPT_USERMANUALKELUARIST";
export const GET_OPT_USERMANUALKEMBALIIST = "GET_OPT_USERMANUALKEMBALIIST";
export const GET_OPT_GROUP = "GET_OPT_GROUP";
export const GET_OPT_CABANG = "GET_OPT_CABANG";
export const GET_OPT_TERLAMBAT = "GET_OPT_TERLAMBAT";
export const AFTER_FINGER = "AFTER_FINGER";


export const getOptUser = (reset = false) => {
  if(reset == true){
    return (dispatch) => {
      dispatch({
        type: GET_OPT_USER,
        payload: {
          data: false,
          errorMessage: false,
        },
      });
    }
  }
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optuser", headers)
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

export const takeScreenShoot=(UserID)=>{
  axios.get("http://localhost:8081/screenshoot/"+UserID);
}

export const cekUserAfterFinger = (UserID = null, Action = null) => {
  if(UserID == null){
    console.log('reset')
    return(dispatch) => {
      dispatch({
        type: AFTER_FINGER,
          payload: {
            data: false,
            errorMessage: false,
          },
      })
    }
  }
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/cekuserafterfinger/"+UserID+"/"+Action, headers)
      .then(function (response) {
        dispatch({
          type: AFTER_FINGER,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: AFTER_FINGER,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
}

export const getOptUserManual = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optusermanual", headers)
      .then(function (response) {
        dispatch({
          type: GET_OPT_USERMANUAL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_USERMANUAL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptUserManualPulang = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optusermanualpulang", headers)
      .then(function (response) {
        dispatch({
          type: GET_OPT_USERMANUALPULANG,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_USERMANUALPULANG,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptUserManualKeluar = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optusermanualkeluar", headers)
      .then(function (response) {
        dispatch({
          type: GET_OPT_USERMANUALKELUAR,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_USERMANUALKELUAR,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptUserManualKembali = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optusermanualkembali", headers)
      .then(function (response) {
        dispatch({
          type: GET_OPT_USERMANUALKEMBALI,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_USERMANUALKEMBALI,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptUserManualKeluarIst = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optusermanualkeluarist", headers)
      .then(function (response) {
        dispatch({
          type: GET_OPT_USERMANUALKELUARIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_USERMANUALKELUARIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getOptUserManualKembaliIst = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optusermanualkembaliist", headers)
      .then(function (response) {
        dispatch({
          type: GET_OPT_USERMANUALKEMBALIIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_USERMANUALKEMBALIIST,
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
      .get(BASEURL+"/api/optgroup", headers)
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

export const getOptTerlambat = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/optTerlambat", headers)
      .then(function (response) {
        dispatch({
          type: GET_OPT_TERLAMBAT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_OPT_TERLAMBAT,
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
      .get(BASEURL+"/api/optcabang", headers)
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

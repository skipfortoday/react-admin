import axios from "axios";
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


export const getOptUser = () => {
  return (dispatch) => {
    axios
      .get("http://"+BASEURL+"/api/optuser")
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

export const getOptUserManual = () => {
  return (dispatch) => {
    axios
      .get("http://"+BASEURL+"/api/optusermanual")
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
      .get("http://"+BASEURL+"/api/optusermanualpulang")
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
      .get("http://"+BASEURL+"/api/optusermanualkeluar")
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
      .get("http://"+BASEURL+"/api/optusermanualkembali")
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
      .get("http://"+BASEURL+"/api/optusermanualkeluarist")
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
      .get("http://"+BASEURL+"/api/optusermanualkembaliist")
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
      .get("http://"+BASEURL+"/api/optgroup")
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
      .get("http://"+BASEURL+"/api/optTerlambat")
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
      .get("http://"+BASEURL+"/api/optcabang")
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

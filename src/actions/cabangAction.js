import axios from "axios";
import { headers, API_BASEURL } from "../config";
let BASEURL = API_BASEURL;


export const GET_CABANG_LIST = "GET_CABANG_LIST";
export const GET_CABANG_DETAIL = "GET_CABANG_DETAIL";
export const POST_CABANG_CREATE = "POST_CABANG_CREATE";
export const PUT_CABANG_EDIT = "PUT_CABANG_EDIT";
export const POST_CONFIG = "POST_CONFIG";
export const RESET_POST_CONFIG = "RESET_POST_CONFIG";
export const SET_PEGAWAI_SELECT = "SET_PEGAWAI_SELECT"

export const setPegawaiSelect = (val) => {
  return (dispatch) => {
    dispatch({
      type : SET_PEGAWAI_SELECT,
      payload :  {
        pegawai : !val ? null :  {
          UserID : val.value,
          Nama : val.label,
        },
        cabang : !val ? null : {
          KodeCabang : val.KodeCabang,
          NamaCabang : val.NamaCabang,
        }
      }
    })
  }
}

export const resetPostConfig = () =>{
  return (dispatch) => {
    dispatch({
      type: RESET_POST_CONFIG,
    })
  }
}

export const postConfig = (data) => {
  return (dispatch) => {
    axios
      .post(BASEURL+"/api/setconfig", data, headers)
      .then(function(response){
        dispatch({
          type: POST_CONFIG,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        })
      })
      .catch(function (error) {
        dispatch({
          type: POST_CONFIG,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
    
  }
}

export const getCabangList = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/cabang", headers)
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
        BASEURL+"/api/cabang/"+KodeCabang, headers
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
        data, headers
      )
      .then(function (response) {
        
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
        data, headers
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
         BASEURL+"/api/cabang/"+KodeCabang, headers
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

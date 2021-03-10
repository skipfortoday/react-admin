import axios from "axios";
import { BASEURL } from "./adminAction";

export const GET_CABANG_LIST = "GET_CABANG_LIST";
export const GET_CABANG_DETAIL = "GET_CABANG_DETAIL";
export const POST_CABANG_CREATE = "POST_CABANG_CREATE";
export const PUT_CABANG_EDIT = "PUT_CABANG_EDIT";



export const getCabangList = () => {
  return (dispatch) => {
    axios
      .get("http://"+BASEURL+"/api/cabang")
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
        "http://"+BASEURL+"/api/cabang/"+KodeCabang
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
         "http://"+BASEURL+"/api/cabang/",
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
        "http://"+BASEURL+"/api/cabang/"+KodeCabang,
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
         "http://"+BASEURL+"/api/cabang/"+KodeCabang
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

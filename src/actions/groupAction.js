import axios from "axios";
import { siteConfig } from "../config";
import { BASEURL } from "./adminAction";

export const GET_GROUP_LIST = "GET_GROUP_LIST";
export const GET_GROUP_DETAIL = "GET_GROUP_DETAIL";
export const GET_GROUP_TERLAMBAT1 = "GET_GROUP_TERLAMBAT1";
export const GET_GROUP_TERLAMBAT2 = "GET_GROUP_TERLAMBAT2";
export const GET_GROUP_TERLAMBAT3 = "GET_GROUP_TERLAMBAT3";
export const POST_GROUP_CREATE = "POST_GROUP_CREATE";
export const PUT_GROUP_EDIT = "PUT_GROUP_EDIT";

let headers = {
  headers :{
    'Access-Control-Allow-Origin':'*',
    KodeCabang:siteConfig.kodeCabang
  }
}

export const getGroupList = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/group", headers)
      .then(function (response) {
        dispatch({
          type: GET_GROUP_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getGroupDetail = (GroupID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/group/"+GroupID
      )
      .then(function (response) {
        dispatch({
          type: GET_GROUP_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getGroupTerLambat1 = (GroupID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"api/groupterlambat1/"+GroupID
      )
      .then(function (response) {
        dispatch({
          type: GET_GROUP_TERLAMBAT1,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_TERLAMBAT1,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getGroupTerLambat2 = (GroupID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/groupterlambat2/"+GroupID
      )
      .then(function (response) {
        dispatch({
          type: GET_GROUP_TERLAMBAT2,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_TERLAMBAT2,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getGroupTerLambat3 = (GroupID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/groupterlambat3/"+GroupID
      )
      .then(function (response) {
        dispatch({
          type: GET_GROUP_TERLAMBAT3,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_TERLAMBAT3,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postGroupCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
        BASEURL+"/api/group/",
        data,
        headers
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_GROUP_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_GROUP_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putGroupUpdate = (data, GroupID) => {
  return (dispatch) => {
    axios
      .put(
        BASEURL+"/api/group/"+GroupID,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_GROUP_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_GROUP_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteGroup = (GroupID) => {
  return (dispatch) => {
    axios
      .delete(
         BASEURL+"/api/group/"+GroupID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataGroup = () => {
  return (dispatch) => {
    dispatch({
      type: GET_GROUP_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_GROUP_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};

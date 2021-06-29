import axios from "axios";
import {API_BASEURL, headers} from '../config'

export const BASEURL = API_BASEURL;

// export const GET_ADMIN_TIMENOW = "GET_ADMIN_TIMENOW";
export const GET_ADMIN_LIST = "GET_ADMIN_LIST";
export const GET_ADMIN_ONDUTY = "GET_ADMIN_ONDUTY";
export const GET_ADMIN_DETAIL = "GET_ADMIN_DETAIL";
export const POST_ADMIN_CREATE = "POST_ADMIN_CREATE";
export const PUT_ADMIN_EDIT = "PUT_ADMIN_EDIT";

export const getAdminOnDuty = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/onduty", headers)
      .then(function (response) {
        dispatch({
          type: GET_ADMIN_ONDUTY,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_ADMIN_ONDUTY,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const getAdminList = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/superadmin", headers)
      .then(function (response) {
        dispatch({
          type: GET_ADMIN_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_ADMIN_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getAdminDetail = (AdminID = null) => {
  if(AdminID == null){
    return (dispatch) => {
      dispatch({
        type: GET_ADMIN_DETAIL,
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
        BASEURL+"/api/superadmin/"+ AdminID, headers
      )
      .then(function (response) {
        dispatch({
          type: GET_ADMIN_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_ADMIN_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postAdminCreate = (data) => {
  if(data == null){
    return (dispatch) => {
      dispatch({
        type: POST_ADMIN_CREATE,
        payload: {
          data: false,
          errorMessage: false,
        },
      });
    }
  }

  return (dispatch) => {
    axios
      .post(
        BASEURL+"/api/superadmin",
        data, 
        headers
      )
      .then(function (response) {
        
        dispatch({
          type: POST_ADMIN_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_ADMIN_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putAdminUpdate = (data,AdminID) => {
  return (dispatch) => {
    axios
      .put(
        BASEURL+"/api/superadmin/"+AdminID,
        data, 
        headers
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_ADMIN_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_ADMIN_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteAdmin = (AdminID) => {
  return (dispatch) => {
    axios
      .delete(
        BASEURL+"/api/superadmin/"+AdminID, 
        headers
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};



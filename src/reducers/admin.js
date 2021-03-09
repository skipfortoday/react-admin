import {
    GET_ADMIN_DETAIL,
    POST_ADMIN_CREATE,
    PUT_ADMIN_EDIT,
    GET_ADMIN_TIMENOW,
  } from "../actions/adminAction"
  
  let initialState = {
    getAdminList: false,
    errorAdminList: false,
    getAdminTimeNow: false,
    errorAdminTimeNow: false,
    getAdminDetail: false,
    errorAdminDetail: false,
    getResponDataAdmin: false,
    errorResponDataAdmin: false,
  };
  
  const Admin = (state = initialState, action) => {
    switch (action.type) {

      case GET_ADMIN_TIMENOW:
        return {
          ...state,
          getAdminTimeNow: action.payload.data,
          errorAdminTimeNow: action.payload.errorMessage,
        };

      case GET_ADMIN_TIMENOW:
        return {
          ...state,
          getAdminTimeNow: action.payload.data,
          errorAdminTimeNow: action.payload.errorMessage,
        };
  
      case GET_ADMIN_DETAIL:
        return {
          ...state,
          getAdminDetail: action.payload.data,
          errorAdminDetail: action.payload.errorMessage,
        };
  
      case POST_ADMIN_CREATE:
        return {
          ...state,
          getResponDataAdmin: action.payload.data,
          errorResponDataAdmin: action.payload.errorMessage,
        };
  
      case PUT_ADMIN_EDIT:
        return {
          ...state,
          getResponDataAdmin: action.payload.data,
          errorResponDataAdmin: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Admin ;
  
import {
    GET_ADMIN_LIST,
    GET_ADMIN_DETAIL,
    POST_ADMIN_CREATE,
    PUT_ADMIN_EDIT,
  } from "../actions/adminAction"
  
  let initialState = {
    getAdminList: false,
    errorAdminList: false,
    getAdminDetail: false,
    errorAdminDetail: false,
    getResponDataAdmin: false,
    errorResponDataAdmin: false,
  };
  
  const Admin = (state = initialState, action) => {
    switch (action.type) {
      case GET_ADMIN_LIST:
        return {
          ...state,
          getAdminList: action.payload.data,
          errorAdminList: action.payload.errorMessage,
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
  
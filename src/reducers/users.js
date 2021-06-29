import {
  DELETE_FP,
  GET_USERS_LIST,
  GET_USER_DETAIL,
  LOCAL_FP,
  POST_DOWNLOAD_FP,
  POST_USER_CREATE,
  PUT_USER_EDIT,
} from "../actions/userAction";

let initialState = {
  getUsersList: false,
  errorUsersList: false,
  getUserDetail: false,
  errorUserDetail: false,
  getResponDataUser: false,
  errorResponDataUser: false,
  getLocalFp:false,
  errorGetLocalFp:false,
  postDownloadFp:false,
  errorPostDownloadFp:false,
  deleteFp:false,
  errorDeleteFp:false
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FP:
      return{
        ...state,
        deleteFp:action.payload.data,
        errorDeleteFp:action.payload.errorMessage
      }
    case POST_DOWNLOAD_FP:
      return {
        ...state,
        postDownloadFp: action.payload.data,
        errorPostDownloadFp: action.payload.errorMessage,
      };
    
    case LOCAL_FP:
      return {
        ...state,
        getLocalFp: action.payload.data,
        errorGetLocalFp: action.payload.errorMessage,
      };

    case GET_USERS_LIST:
     
      return {
        ...state,
        getUsersList: action.payload.data,
        errorUsersList: action.payload.errorMessage,
      };

    case GET_USER_DETAIL:
      return {
        ...state,
        getUserDetail: action.payload.data,
        errorUserDetail: action.payload.errorMessage,
      };

    case POST_USER_CREATE:
      return {
        ...state,
        getResponDataUser: action.payload.data,
        errorResponDataUser: action.payload.errorMessage,
      };

    case PUT_USER_EDIT:
      return {
        ...state,
        getResponDataUser: action.payload.data,
        errorResponDataUser: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default users;

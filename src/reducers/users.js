import {
  DELETE_FP,
  DOWNLOAD_USER,
  GET_LIST_MUTASI_PEGAWAI,
  GET_USERS_LIST,
  GET_USER_DETAIL,
  LIST_ABSENSI_OFFLINE,
  LOCAL_FP,
  POST_DOWNLOAD_FP,
  POST_MUTASI_PEGAWAI,
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
  errorDeleteFp:false,
  resPostMutasi:false,
  errResPostMutasi:false,
  getListMutasi:false,
  errGetListMutasi:false,
  listOffline:false,
  errListOffline:false,
  downloadUser:false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_USER :
      return {
        ...state,
        downloadUser:action.payload.data
      }

    case LIST_ABSENSI_OFFLINE : 
      return {
        ...state,
        listOffline:action.payload.data,
        errListOffline:action.payload.errorMessage
      }
    case GET_LIST_MUTASI_PEGAWAI : 
      return {
        ...state,
        getListMutasi:action.payload.data,
        errGetListMutasi:action.payload.errorMessage
      }

    case POST_MUTASI_PEGAWAI: 
      return {
        ...state,
        resPostMutasi:action.payload.data,
        errResPostMutasi:action.payload.errorMessage
      }

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

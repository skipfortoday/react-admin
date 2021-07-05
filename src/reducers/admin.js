import {
  GET_ADMIN_DETAIL,
  GET_ADMIN_LIST,
  GET_ADMIN_ONDUTY,
  POST_ADMIN_CREATE,
  PUT_ADMIN_EDIT,
  SYNC_TO_LOCAL,
  SYNC_TO_SERVER,
  // GET_ADMIN_TIMENOW,
} from "../actions/adminAction";

let initialState = {
  getAdminList: false,
  errorAdminList: false,
  getAdminOnDuty: false,
  errorAdminOnDuty: false,
  // getAdminTimeNow: false,
  // errorAdminTimeNow: false,
  getAdminDetail: false,
  errorAdminDetail: false,
  getResponDataAdmin: false,
  errorResponDataAdmin: false,

  syncToLocal:false,
  errSyncToLocal:false,
  syncToLocalServer:false,
  errSyncToServer:false
};

const Admin = (state = initialState, action) => {
  switch (action.type) {
    // case GET_ADMIN_TIMENOW:
    //   return {
    //     ...state,
    //     getAdminList: action.payload.data,
    //     errorAdminList action.payload.errorMessage,
    //   };
    case SYNC_TO_SERVER:
      return {
        ...state, 
        syncToServer:action.payload.data,
        errSyncToServer:action.payload.errorMessage
      }
    case SYNC_TO_LOCAL :
      return {
        ...state,
        syncToLocal:action.payload.data,
        errSyncToLocal:action.payload.errorMessage
      }

    case GET_ADMIN_LIST:
      return {
        ...state,
        getAdminList: action.payload.data,
        errorAdminList: action.payload.errorMessage,
      };

    case GET_ADMIN_ONDUTY:
      return {
        ...state,
        getAdminOnDuty: action.payload.data,
        errorAdminOnDuty: action.payload.errorMessage,
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

export default Admin;

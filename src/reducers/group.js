import {
  GET_GROUP_LIST,
  GET_GROUP_DETAIL,
  POST_GROUP_CREATE,
  PUT_GROUP_EDIT,
  GET_GROUP_TERLAMBAT1,
  GET_GROUP_TERLAMBAT2,
  GET_GROUP_TERLAMBAT3,
  DELETE_GROUP,

} from "../actions/groupAction";

let initialState = {
  getGroupList: false,
  errorGroupList: false,
  getGroupDetail: false,
  errorGroupDetail: false,
  getGroupTerlambat1: false,
  errorGroupTerlambat1: false,
  getGroupTerlambat2: false,
  errorGroupTerlambat2: false,
  getGroupTerlambat3: false,
  errorGroupTerlambat3: false,
  getResponDataGroup: false,
  errorResponDataGroup: false,
  deleteGroup:false,
  errDeleteGroup:false,
};

const Group = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_GROUP : 
      return {
        ...state,
        deleteGroup: action.payload.data,
        errDeleteGroup: action.payload.errorMessage,
      }
    case GET_GROUP_LIST:
      return {
        ...state,
        getGroupList: action.payload.data,
        errorGroupList: action.payload.errorMessage,
      };

    case GET_GROUP_DETAIL:
      return {
        ...state,
        getGroupDetail: action.payload.data,
        errorGroupDetail: action.payload.errorMessage,
      };

    case GET_GROUP_TERLAMBAT1:
      return {
        ...state,
        getGroupTerlambat1: action.payload.data,
        errorGroupTerlambat1: action.payload.errorMessage,
      };

    case GET_GROUP_TERLAMBAT2:
      return {
        ...state,
        getGroupTerlambat2: action.payload.data,
        errorGroupTerlambat2: action.payload.errorMessage,
      };

    case GET_GROUP_TERLAMBAT3:
      return {
        ...state,
        getGroupTerlambat3: action.payload.data,
        errorGroupTerlambat3: action.payload.errorMessage,
      };

    case POST_GROUP_CREATE:
      return {
        ...state,
        getResponDataGroup: action.payload.data,
        errorResponDataGroup: action.payload.errorMessage,
      };

    case PUT_GROUP_EDIT:
      return {
        ...state,
        getResponDataGroup: action.payload.data,
        errorResponDataGroup: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default Group;

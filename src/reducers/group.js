import {
    GET_GROUP_LIST,
    GET_GROUP_DETAIL,
    POST_GROUP_CREATE,
    PUT_GROUP_EDIT,
  } from "../actions/groupAction"
  
  let initialState = {
    getGroupList: false,
    errorGroupList: false,
    getGroupDetail: false,
    errorGroupDetail: false,
    getResponDataGroup: false,
    errorResponDataGroup: false,
  };
  
  const Group = (state = initialState, action) => {
    switch (action.type) {
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
  
  export default Group ;
  
Import {
    GET_GROUP_LIST,
    GET_GROUP_DETAIL,
    POST_GROUP_CREATE,
    PUT_GROUP_EDIT,
  } from "../actions/groupAction";
  
  let initialState = {
    getGroupList: false,
    errorGroupList: false,
    getGroupDetail: false,
    errorGroupDetail: false,
    getResponDataGroup: false,
    errorResponDataGroup: false,
    title: "System Absensi",
  };
  
  const Group = (state = initialState, action) => {
    switch (action.type) {
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
  
  export default Group ;
  
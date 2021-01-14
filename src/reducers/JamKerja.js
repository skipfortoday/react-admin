import {
    GET_JAMKERJA_LIST,
    GET_JAMKERJA_DETAIL,
    POST_JAMKERJA_CREATE,
    PUT_JAMKERJA_EDIT,
  } from "../actions/JamKerjaAction";
  
  let initialState = {
    getJamKerjaList: false,
    errorJamKerjaList: false,
    getJamKerjaDetail: false,
    errorJamKerjaDetail: false,
    getResponJamKerja: false,
    errorResponJamKerja: false,
  };
  
  const JamKerja = (state = initialState, action) => {
    switch (action.type) {
      case GET_JAMKERJA_LIST:
        return {
          ...state,
          getJamKerjaList: action.payload.data,
          errorJamKerjaList: action.payload.errorMessage,
        };
  
      case GET_JAMKERJA_DETAIL:
        return {
          ...state,
          getJamKerjaDetail: action.payload.data,
          errorJamKerjaDetail: action.payload.errorMessage,
        };
  
      case POST_JAMKERJA_CREATE:
        return {
          ...state,
          getResponJamKerja: action.payload.data,
          errorResponJamKerja: action.payload.errorMessage,
        };
  
      case PUT_JAMKERJA_EDIT:
        return {
          ...state,
          getResponJamKerja: action.payload.data,
          errorResponJamKerja: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default JamKerja;
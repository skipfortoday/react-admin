import {
    GET_IZIN_LIST,
    GET_IZIN_DETAIL,
    POST_IZIN_CREATE,
    PUT_IZIN_EDIT,
  } from "../actions/izinAction"
  
  let initialState = {
    getIzinList: false,
    errorIzinList: false,
    getIzinDetail: false,
    errorIzinDetail: false,
    getResponDataIzin: false,
    errorResponDataIzin: false,
  };
  
  const Izin = (state = initialState, action) => {
    switch (action.type) {
      case GET_IZIN_LIST:
        return {
          ...state,
          getIzinList: action.payload.data,
          errorIzinList: action.payload.errorMessage,
        };
  
      case GET_IZIN_DETAIL:
        return {
          ...state,
          getIzinDetail: action.payload.data,
          errorIzinDetail: action.payload.errorMessage,
        };
  
      case POST_IZIN_CREATE:
        return {
          ...state,
          getResponDataIzin: action.payload.data,
          errorResponDataIzin: action.payload.errorMessage,
        };
  
      case PUT_IZIN_EDIT:
        return {
          ...state,
          getResponDataIzin: action.payload.data,
          errorResponDataIzin: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Izin ;
  
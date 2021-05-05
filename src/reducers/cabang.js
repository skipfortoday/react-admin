import {
    GET_CABANG_LIST,
    GET_CABANG_DETAIL,
    POST_CABANG_CREATE,
    PUT_CABANG_EDIT,
    POST_CONFIG,
    RESET_POST_CONFIG,
  } from "../actions/cabangAction"
  
  let initialState = {
    getCabangList: false,
    errorCabangList: false,
    getCabangDetail: false,
    errorCabangDetail: false,
    getResponDataCabang: false,
    errorResponDataCabang: false,
    getResponseSetConfig:false,
    errorGetResponseSetConfig:false
  };
  
  const Cabang = (state = initialState, action) => {
    switch (action.type) {
      case RESET_POST_CONFIG:{
        return {
          ...state,
          getResponseSetConfig:false,
          errorGetResponseSetConfig:false,
        }
      }
      case POST_CONFIG:
        return {
          ...state,
          getResponseSetConfig:action.payload.data,
          errorGetResponseSetConfig:action.payload.errorMessage,
        }
      case GET_CABANG_LIST:
        return {
          ...state,
          getCabangList: action.payload.data,
          errorCabangList: action.payload.errorMessage,
        };
  
      case GET_CABANG_DETAIL:
        return {
          ...state,
          getCabangDetail: action.payload.data,
          errorCabangDetail: action.payload.errorMessage,
        };
  
      case POST_CABANG_CREATE:
        return {
          ...state,
          getResponDataCabang: action.payload.data,
          errorResponDataCabang: action.payload.errorMessage,
        };
  
      case PUT_CABANG_EDIT:
        return {
          ...state,
          getResponDataCabang: action.payload.data,
          errorResponDataCabang: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Cabang ;
  
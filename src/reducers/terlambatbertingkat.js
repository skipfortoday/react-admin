import {
    GET_TERLAMBATBERTINGKAT_LIST,
    GET_TERLAMBATBERTINGKAT_DETAIL,
    POST_TERLAMBATBERTINGKAT_CREATE,
    PUT_TERLAMBATBERTINGKAT_EDIT,
    GET_TERLAMBATBERTINGKAT_DETAIL2,
    POST_TERLAMBATBERTINGKAT_SALIN
  } from "../actions/TerlambatBertingkatAction"
  
  let initialState = {
    getTerlambatBertingkatList: false,
    errorTerlambatBertingkatList: false,
    getTerlambatBertingkatDetail: false,
    errorTerlambatBertingkatDetail: false,
    getTerlambatBertingkatDetail2: false,
    errorTerlambatBertingkatDetail2: false,
    getResponDataTerlambatBertingkat: false,
    errorResponDataTerlambatBertingkat: false,

    postTerlambatBertingkatSalin:false,
    errorTerlambatBertingkatSalin:false
  };
  
  const TerlambatBertingkat = (state = initialState, action) => {
    switch (action.type) {
      case GET_TERLAMBATBERTINGKAT_LIST:
        return {
          ...state,
          getTerlambatBertingkatList: action.payload.data,
          errorTerlambatBertingkatList: action.payload.errorMessage,
        };
  
      case GET_TERLAMBATBERTINGKAT_DETAIL:
        return {
          ...state,
          getTerlambatBertingkatDetail: action.payload.data,
          errorTerlambatBertingkatDetail: action.payload.errorMessage,
        };

        case GET_TERLAMBATBERTINGKAT_DETAIL2:
        return {
          ...state,
          getTerlambatBertingkatDetail2: action.payload.data,
          errorTerlambatBertingkatDetail2: action.payload.errorMessage,
        };
  
      case POST_TERLAMBATBERTINGKAT_CREATE:
        return {
          ...state,
          getResponDataTerlambatBertingkat: action.payload.data,
          errorResponDataTerlambatBertingkat: action.payload.errorMessage,
        };
  
      case PUT_TERLAMBATBERTINGKAT_EDIT:
        return {
          ...state,
          getResponDataTerlambatBertingkat: action.payload.data,
          errorResponDataTerlambatBertingkat: action.payload.errorMessage,
        };
  
      case POST_TERLAMBATBERTINGKAT_SALIN:
        return {
          ...state,
          postTerlambatBertingkatSalin: action.payload.data,
          errorTerlambatBertingkatSalin: action.payload.errorMessage
        }

      default:
        return state;
    }
  };
  
  export default TerlambatBertingkat ;
  
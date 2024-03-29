import {
  POST_MANUAL_KELUAR,
  POST_MANUAL_MASUK,
  PUT_MANUAL_KELISTIRAHAT,
  PUT_MANUAL_KEMBALI,
  PUT_MANUAL_KEMISTIRAHAT,
  PUT_MANUAL_PULANG,
  CLEAR_MANUAL,
  RESET_PROPS,
  POST_MASUK_OFFLINE,
  PUT_PULANG_OFFLINE,
} from "../actions/manualAction";

let initialState = {
  getResponDataManual: false,
  errorResponDataManual: false,
  postMasukOffline:false,
  errPostMasukOffline:false,
  putPulangOffline:false,
  errPutPulangOffline:false,
};

const Manual = (state = initialState, action) => {

  switch (action.type) {
    case POST_MASUK_OFFLINE :
      return {
        ...state,
        postMasukOffline:action.payload.data,
        errPostMasukOffline:action.payload.errorMessage,
      }
    
    case PUT_PULANG_OFFLINE : 
      return {
        ...state,
        putPulangOffline:action.payload.data,
        errPutPulangOffline:action.payload.errorMessage,
      }
    
    case RESET_PROPS :
      return {
        ...state,
        getResponDataManual:false,
        errorResponDataManual:false
      }
    case POST_MANUAL_MASUK:
      return {
        ...state,
        getResponDataManual: action.payload.data,
        errorResponDataManual: action.payload.errorMessage,
      };

    case PUT_MANUAL_PULANG:
      return {
        ...state,
        getResponDataManual: action.payload.data,
        errorResponDataManual: action.payload.errorMessage,
      };

    case POST_MANUAL_KELUAR:
      return {
        ...state,
        getResponDataManual: action.payload.data,
        errorResponDataManual: action.payload.errorMessage,
      };

      case PUT_MANUAL_KEMBALI:
        return {
          ...state,
          getResponDataManual: action.payload.data,
          errorResponDataManual: action.payload.errorMessage,
        };

    case PUT_MANUAL_KELISTIRAHAT:
      return {
        ...state,
        getResponDataManual: action.payload.data,
        errorResponDataManual: action.payload.errorMessage,
      };

    case PUT_MANUAL_KEMISTIRAHAT:
      return {
        ...state,
        getResponDataManual: action.payload.data,
        errorResponDataManual: action.payload.errorMessage,
      };

    case CLEAR_MANUAL:
        return {
          ...state,
          getResponDataManual: false,
          errorResponDataManual: false,
        };

    default:
      return state;
  }
};

export default Manual;

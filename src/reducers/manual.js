import {
  POST_MANUAL_KELUAR,
  POST_MANUAL_MASUK,
  PUT_MANUAL_KELISTIRAHAT,
  PUT_MANUAL_KEMBALI,
  PUT_MANUAL_KEMISTIRAHAT,
  PUT_MANUAL_PULANG,
} from "../actions/manualAction";

let initialState = {
  getResponDataManual: false,
  errorResponDataManual: false,
};

const Manual = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default Manual;
import { GET_OPT_USER , GET_OPT_GROUP, GET_OPT_CABANG, GET_OPT_TERLAMBAT } from "../actions/optAction";

let initialState = {
  getOptUser: false,
  errorOptUser: false,
  getOptGroup: false,
  errorOpGroup: false,
  getOptTerlambat: false,
  errorOptTerlambat: false,
  getOptCabang: false,
  errorOpCabang: false,
};

const Opt = (state = initialState, action) => {
  switch (action.type) {
    case GET_OPT_USER:
      return {
        ...state,
        getOptUser: action.payload.data,
        errorOptUser: action.payload.errorMessage,
      };

    case GET_OPT_GROUP:
      return {
        ...state,
        getOptGroup: action.payload.data,
        errorOptGroup: action.payload.errorMessage,
      };

      case GET_OPT_TERLAMBAT:
      return {
        ...state,
        getOptTerlambat: action.payload.data,
        errorOptTerlambat: action.payload.errorMessage,
      };

      case GET_OPT_CABANG:
        return {
          ...state,
          getOptCabang: action.payload.data,
          errorOptCabang: action.payload.errorMessage,
        };
    default:
      return state;
  }
};

export default Opt;

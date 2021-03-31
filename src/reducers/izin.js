import {
  GET_IZIN_LIST,
  GET_IZIN_LISTSOLO,
  GET_IZIN_DETAIL,
  POST_IZIN_CREATE,
  POST_IZIN_GROUP,
  PUT_IZIN_EDIT,
  GET_IZIN_DETAIL_FORM,
  EDIT_JAM_FORM,
} from "../actions/izinAction";

let initialState = {
  getIzinList: false,
  errorIzinList: false,
  getIzinListSolo: false,
  errorIzinListSolo: false,
  getIzinDetail: false,
  errorIzinDetail: false,
  getResponDataIzin: false,
  errorResponDataIzin: false,
  getIzinDetailForm: false,
  errorIzinDetailForm: false,

  editJamForm: false,
};

const Izin = (state = initialState, action) => {
  switch (action.type) {
    case GET_IZIN_LIST:
      return {
        ...state,
        getIzinList: action.payload.data,
        errorIzinList: action.payload.errorMessage,
      };

    case GET_IZIN_LISTSOLO:
      return {
        ...state,
        getIzinListSolo: action.payload.data,
        errorIzinListSolo: action.payload.errorMessage,
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

    case POST_IZIN_GROUP:
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

    case GET_IZIN_DETAIL_FORM:
      return {
        ...state,
        getIzinDetailForm: action.payload.data,
        errorIzinDetailForm: action.payload.errorMessage
      }

    case EDIT_JAM_FORM:
      return {
        ...state,
        editJamForm: action.payload.data,
      }


    default:
      return state;
  }
};

export default Izin;

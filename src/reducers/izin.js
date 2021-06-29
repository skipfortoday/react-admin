import {
  GET_IZIN_LIST,
  GET_IZIN_LISTSOLO,
  GET_IZIN_DETAIL,
  POST_IZIN_CREATE,
  POST_IZIN_GROUP,
  PUT_IZIN_EDIT,
  GET_IZIN_DETAIL_FORM,
  EDIT_JAM_FORM,
  GET_IZIN_DETAIL_FORM_STATUS,
  RESET_RESPONSE_DI,
  ON_SUBMITIING

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
  getIzinDetailFormStatus:false,
  getResponFormIzin:false,
  isOnSubmitting:false
};

const Izin = (state = initialState, action) => {
  switch (action.type) {
    case ON_SUBMITIING :
      return {
        ...state,
        isOnSubmitting:action.payload.data
      }
    case RESET_RESPONSE_DI :
      return {
        ...state,
        getResponDataIzin:action.payload.data,
        getIzinDetailForm:false,
      }
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
        getResponFormIzin:true
      };
    
    case PUT_IZIN_EDIT:
      console.log(action.payload.data)
      return {
        ...state,
        getResponDataIzin: action.payload.data,
        errorResponDataIzin: action.payload.errorMessage,
        getResponFormIzin:true
      };
      
    case POST_IZIN_GROUP:
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
    
    case GET_IZIN_DETAIL_FORM_STATUS:
      // console.log(action.payload.data);
      return {
        ...state,
        getIzinDetailFormStatus: action.payload.data,
      }



    default:
      return state;
  }
};

export default Izin;

import {
  GET_OPT_USER,
  GET_OPT_GROUP,
  GET_OPT_CABANG,
  GET_OPT_TERLAMBAT,
  GET_OPT_USERMANUAL,
  GET_OPT_USERMANUALPULANG,
  GET_OPT_USERMANUALKELUAR,
  GET_OPT_USERMANUALKEMBALI,
  GET_OPT_USERMANUALKELUARIST,
  GET_OPT_USERMANUALKEMBALIIST,
  AFTER_FINGER,
  IS_ONLINE
} from "../actions/optAction";

let initialState = {
  getOptUser: false,
  errorOptUser: false,
  getOptUserManual: false,
  errorOptUserManual: false,
  getOptUserManualPulang: false,
  errorOptUserManualPulang: false,
  getOptUserManualKeluar: false,
  errorOptUserManualKeluar: false,
  getOptUserManualKembali: false,
  errorOptUserManualKembali: false,
  getOptUserManualKeluarIst: false,
  errorOptUserManualKeluarIst: false,
  getOptUserManualKembaliIst: false,
  errorOptUserManualKembaliIst: false,
  getOptGroup: false,
  errorOpGroup: false,
  getOptTerlambat: false,
  errorOptTerlambat: false,
  getOptCabang: false,
  errorOpCabang: false,
  getAfterFinger: false,
  errorgetAfterFinger: false,
  isOnline:true,
};

const Opt = (state = initialState, action) => {
  switch (action.type) {
    case IS_ONLINE:
      return {
        ...state,
        isOnline:action.payload.data
      }

    case AFTER_FINGER:
      if (action.payload.data.status == 1) {
        return {
          ...state,
          getAfterFinger: action.payload.data,
          errorgetAfterFinger: action.payload.errorMessage,
          getOptUserManual: [{
            value: action.payload.data.UserID,
            label: action.payload.data.UserID + " - " + action.payload.data.Nama
          }],
          getOptUserManualPulang: [{
            DatangID: action.payload.data.DatangID,
            value: action.payload.data.UserID,
            label: action.payload.data.UserID + " - " + action.payload.data.Nama
          }],
          getOptUserManualKeluar: [
            {
              DatangID: action.payload.data.DatangID,
              value: action.payload.data.UserID,
              label: action.payload.data.UserID + " - " + action.payload.data.Nama
            }
          ],
          getOptUserManualKembali: [
            {
              KeluarID: action.payload.data.KeluarID,
              value: action.payload.data.UserID,
              label: action.payload.data.UserID + " - " + action.payload.data.Nama
            }
          ],
          getOptUserManualKeluarIst: [
            {
              DatangID: action.payload.data.DatangID,
              value: action.payload.data.UserID,
              label: action.payload.data.UserID + " - " + action.payload.data.Nama
            }
          ],
          getOptUserManualKembaliIst: [
            {
              DatangID: action.payload.data.DatangID,
              value: action.payload.data.UserID,
              label: action.payload.data.UserID + " - " + action.payload.data.Nama
            }
          ],

        };
      } else {
        return {
          ...state,
          getAfterFinger: action.payload.data,
          errorgetAfterFinger: action.payload.errorMessage
        };
      }

    case GET_OPT_USER:
      return {
        ...state,
        getOptUser: action.payload.data,
        errorOptUser: action.payload.errorMessage,
      };

    case GET_OPT_USERMANUAL:
      return {
        ...state,
        getOptUserManual: action.payload.data,
        errorOptUserManual: action.payload.errorMessage,
      };

    case GET_OPT_USERMANUALPULANG:
      return {
        ...state,
        getOptUserManualPulang: action.payload.data,
        errorOptUserManualPulang: action.payload.errorMessage,
      };

    case GET_OPT_USERMANUALKELUAR:
      return {
        ...state,
        getOptUserManualKeluar: action.payload.data,
        errorOptUserManualKeluar: action.payload.errorMessage,
      };

    case GET_OPT_USERMANUALKEMBALI:
      return {
        ...state,
        getOptUserManualKembali: action.payload.data,
        errorOptUserManualKembali: action.payload.errorMessage,
      };

    case GET_OPT_USERMANUALKELUARIST:
      return {
        ...state,
        getOptUserManualKeluarIst: action.payload.data,
        errorOptUserManualKeluarIst: action.payload.errorMessage,
      };

    case GET_OPT_USERMANUALKEMBALIIST:
      return {
        ...state,
        getOptUserManualKembaliIst: action.payload.data,
        errorOptUserManualKembaliIst: action.payload.errorMessage,
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

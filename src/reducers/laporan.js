import {
    GET_LAPORAN_LIST,
    GET_LAPORAN_DETAIL,
    GET_LAPORAN_REKAP,
    GET_LAPORAN_HEAD,
  } from "../actions/laporanAction";
  
  let initialState = {
    getLaporanList: false,
    getExpandKey: false,
    errorExpandKey:false,
    errorLaporanList: false,
    getLaporanDetail: false,
    errorLaporanDetail: false,
    getLaporanRekap:false,
    errorLaporanRekap:false,
    getLaporanHead:false,
    errorLaporanHead:false,

  };
  
  const Laporan = (state = initialState, action) => {
    switch (action.type) {
      case GET_LAPORAN_LIST:
        return {
          ...state,
          getLaporanList: action.payload.data,
          getExpandKey: action.payload.expandKey,
          errorExpandKey: action.payload.expandKey,
          errorLaporanList: action.payload.errorMessage,
        };
  
      case GET_LAPORAN_DETAIL:
        return {
          ...state,
          getLaporanDetail: action.payload.data,
          getExpandKey: action.payload.expandKey,
          errorExpandKey: action.payload.expandKey,
          errorLaporanDetail: action.payload.errorMessage,
        };

        case GET_LAPORAN_REKAP:
          return {
            ...state,
            getLaporanRekap: action.payload.data,
            errorLaporanRekap: action.payload.errorMessage,
          };

          case GET_LAPORAN_HEAD:
          return {
            ...state,
            getLaporanHead: action.payload.data,
            errorLaporanHead: action.payload.errorMessage,
          };
  
      default:
        return state;
    }
  };
  
  export default Laporan;
  
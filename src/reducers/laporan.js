import {
    GET_LAPORAN_LIST,
    GET_LAPORAN_DETAIL,
  } from "../actions/laporanAction";
  
  let initialState = {
    getLaporanList: false,
    errorLaporanList: false,
    getLaporanDetail: false,
    errorLAporanDetail: false,

  };
  
  const Laporan = (state = initialState, action) => {
    switch (action.type) {
      case GET_LAPORAN_LIST:
        return {
          ...state,
          getLaporanList: action.payload.data,
          errorLaporanList: action.payload.errorMessage,
        };
  
      case GET_LAPORAN_DETAIL:
        return {
          ...state,
          getLaporanDetail: action.payload.data,
          errorLaporanDetail: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Laporan;
  
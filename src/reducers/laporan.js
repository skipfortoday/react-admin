import {
  GET_LAPORAN_LIST,
  GET_LAPORAN_DETAIL,
  GET_LAPORAN_REKAP,
  GET_LAPORAN_HEAD,
  POST_LAPORAN_PROSES,
  RESET_LAPORAN,
  RESET_LAPORAN_RESPON,
  IS_LOADING,
  GET_LAPORAN_KELENGKAPAN
} from "../actions/laporanAction";
import { formatTglYmd } from '../containers/formatTgl';

let initialState = {
  getLaporanList: false,
  getExpandKey: false,
  errorExpandKey: false,
  errorLaporanList: false,
  getLaporanDetail: false,
  errorLaporanDetail: false,
  getLaporanRekap: false,
  errorLaporanRekap: false,
  getLaporanHead: false,
  errorLaporanHead: false,
  getResponDataLaporan: false,
  errorResponDataLaporan: false,
  getLaporanKelengkapan:false,
  errorLaporanKelengkapan:false,
  isLoading:false,
  defTglAwal: formatTglYmd(new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 30
  )),
  defTglAkhir: formatTglYmd(new Date()),

};

const Laporan = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.data
      }

    case RESET_LAPORAN :
      return {
        ...state,
        getLaporanHead: false,
        errorLaporanHead: false,
        getResponDataLaporan:false,
        errorResponDataLaporan:false
      };

      case RESET_LAPORAN_RESPON :
      return {
        ...state,
        getResponDataLaporan:false,
        errorResponDataLaporan:false
      };

    case GET_LAPORAN_LIST:
      return {
        ...state,
        getLaporanList: action.payload.data,
        getExpandKey: action.payload.expandKey,
        errorLaporanList: action.payload.errorMessage,
      };

    case GET_LAPORAN_DETAIL:
      return {
        ...state,
        
        getLaporanDetail: action.payload.data,
        getExpandKey: action.payload.expandKey,
        errorLaporanDetail: action.payload.errorMessage,
        isLoading:false,
        getLaporanRekap: action.payload.data.footer,
        getLaporanHead: action.payload.data.header,
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

      case GET_LAPORAN_KELENGKAPAN:
        return {
          ...state,
          getLaporanKelengkapan: action.payload.data,
          errorLaporanKelengkapan: action.payload.errorMessage,
          isLoading:false,
        };

    case POST_LAPORAN_PROSES:
      return {
        ...state,
        getResponDataLaporan: action.payload.data,
        errorResponDataLaporan: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default Laporan;

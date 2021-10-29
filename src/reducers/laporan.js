import { act } from "react-dom/test-utils";
import {
  GET_LAPORAN_LIST,
  GET_LAPORAN_DETAIL,
  GET_LAPORAN_REKAP,
  GET_LAPORAN_HEAD,
  POST_LAPORAN_PROSES,
  RESET_LAPORAN,
  RESET_LAPORAN_RESPON,
  IS_LOADING,
  GET_LAPORAN_KELENGKAPAN,
  RESET_RESPONSE_DATA_LAPORAN,
  CHECK_BELUM_PULANG_TODAY,
  GET_LAPORAN_DETAIL_BANYAK,
  GET_LIST_PERIODE,
  GET_LOG_ATTLOG,
  WAIT_PRINTING,
  GET_DTL_PERIODE,
  POST_PERIODE,
  PUT_PERIODE
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
  getLaporanKelengkapan: false,
  errorLaporanKelengkapan: false,
  isLoading: false,
  defTglAwal: formatTglYmd(new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 30
  )),
  defTglAkhir: formatTglYmd(new Date()),
  defNama: {
    value: 'all',
    label: 'Semua Karyawan'
  },
  checkBelumPulang:{status:false, message:""},
  laporanBanyak:false,
  listPeriode:false,
  logAttlog:false,
  errLogAttlog:false,
  waitPrinting:false,
  dtlPeriode:false,
  errDtlPeriode:false,
  postPeriode:false,
  errPostPeriode:false,
  putPeriode:false,
  errPutPeriode:false
};

const Laporan = (state = initialState, action) => {
  switch (action.type) {
    case WAIT_PRINTING :
      return {
        ...state,
        waitPrinting:action.payload.data
      }

    case GET_LOG_ATTLOG :
      return {
        ...state,
        logAttlog:action.payload.data,
        errLogAttlog: action.payload.errorMessage,
      }

    case GET_LIST_PERIODE : 
      return {
        ...state,
        listPeriode:action.payload.data
      }

    case GET_DTL_PERIODE :
      return {
        ...state,
        dtlPeriode:action.payload.data,
        errDtlPeriode: action.payload.errorMessage,
      }
    
    case POST_PERIODE : 
      return {
        ...state,
        postPeriode:action.payload.data,
        errPostPeriode: action.payload.errorMessage,
      }

    case PUT_PERIODE : 
      return {
        ...state,
        putPeriode:action.payload.data,
        errPutPeriode: action.payload.errorMessage,
      }

    case GET_LAPORAN_DETAIL_BANYAK:
      return {
        ...state,
        laporanBanyak: action.payload.data,
        
        // getLaporanDetail: action.payload.data,
        // getExpandKey: action.payload.expandKey,
        // errorLaporanDetail: action.payload.errorMessage,
        // getLaporanRekap: action.payload.data.footer,
      };


    case CHECK_BELUM_PULANG_TODAY:
      return {
        ...state,
        checkBelumPulang:action.payload.data
      }
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.data,
      }

    case RESET_LAPORAN:
      return {
        ...state,
        getLaporanHead: false,
        errorLaporanHead: false,
        getResponDataLaporan: false,
        errorResponDataLaporan: false,
        getExpandKey: false,
        getLaporanDetail: false,
        getLaporanRekap: false
      };

    case RESET_LAPORAN_RESPON:
      return {
        ...state,
        getResponDataLaporan: false,
        errorResponDataLaporan: false
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
        getLaporanHead: action.payload.data.header,
        errorLaporanDetail: action.payload.errorMessage,
        getLaporanRekap: action.payload.data.footer,
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
        isLoading: false,
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

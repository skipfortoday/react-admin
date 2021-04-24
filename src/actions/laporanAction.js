import axios from "axios";
import { headers } from "../config";
import { BASEURL } from "./adminAction";

export const GET_LAPORAN_LIST = "GET_LAPORAN_LIST";
export const GET_LAPORAN_DETAIL = "GET_LAPORAN_DETAIL";
export const GET_LAPORAN_REKAP = "GET_LAPORAN_REKAP";
export const GET_LAPORAN_HEAD = "GET_LAPORAN_HEAD";
export const POST_LAPORAN_PROSES = "POST_LAPORAN_PROSES";
export const RESET_LAPORAN = "RESET_LAPORAN";

export const resetLaporan = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_LAPORAN,
    });
  }
}

export const getLaporanList = (UserID) => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/laporandetail2/"+UserID, headers)
      .then(function (response) {
        var res = [];
        var expand = [];
        var expandKey = [];
        var nonExpandKey = [];
        for(var row in response.data){
          res.push(response.data[row]);
          if(response.data[row]['detail'].length>0) expandKey.push(response.data[row].Tanggal);
          else nonExpandKey.push(response.data[row].Tanggal);
        }
        expand = [expandKey, nonExpandKey];
        dispatch({
          type: GET_LAPORAN_LIST,
          payload: {
            data: res,
            expandKey :  expand,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};



export const getLaporanDetail = (UserID,TglAwal,TglAkhir) => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/laporandetail/"+UserID+"&"+TglAwal+"&"+TglAkhir, headers)
      .then(function (response) {
        var res = [];
        var expand = [];
        var expandKey = [];
        var nonExpandKey = [];
        for(var row in response.data){
          res.push(response.data[row]);
          if(response.data[row]['detail'].length>0) expandKey.push(response.data[row].Tanggal);
          else nonExpandKey.push(response.data[row].Tanggal);
        }
        expand = [expandKey, nonExpandKey];
        dispatch({
          type: GET_LAPORAN_DETAIL,
          payload: {
            data: res,
            expandKey :  expand,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getLaporanRekap = (UserID,TglAwal,TglAkhir) => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/laporanrekap/"+UserID+"&"+TglAwal+"&"+TglAkhir, headers)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_REKAP,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_REKAP,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getLaporanHead = (UserID) => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/headerlaporan/"+UserID, headers)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_HEAD,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LAPORAN_HEAD,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postLaporanProses= (data) => {
  data.UserID = data.Nama.value;
  return (dispatch) => {
    axios
      .post(
        BASEURL+"/api/proses/",
        data,
        headers
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_LAPORAN_PROSES,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_LAPORAN_PROSES,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
import axios from "axios";

export const GET_LAPORAN_LIST = "GET_LAPORAN_LIST";
export const GET_LAPORAN_DETAIL = "GET_LAPORAN_DETAIL";




export const getLaporanList = (UserID) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/api/laporan/"+UserID)
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

export const getLaporanDetail = (UserID,TglMasuk,TglSelesai) => {
  return (dispatch) => {
    axios
      .get(
        "http://localhost:3001/api/apprecentscan/"+UserID+"&"+TglMasuk+"&"+TglSelesai)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_DETAIL,
          payload: {
            data: response.data,
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


import axios from "axios";
import { BASEURL } from "./adminAction";

export const POST_MANUAL_MASUK = "POST_MANUAL_MASUK";
export const PUT_MANUAL_PULANG = "PUT_MANUAL_PULANG";

export const POST_MANUAL_KELUAR = "POST_MANUAL_KELUAR";
export const PUT_MANUAL_KEMBALI = "PUT_MANUAL_KEMBALI";

export const PUT_MANUAL_KELISTIRAHAT = "PUT_MANUAL_KELISTIRAHAT";
export const PUT_MANUAL_KEMISTIRAHAT = "PUT_MANUAL_KEMISTIRAHAT";

export const postManualMasuk= (data) => {
  console.log(data);
    data.UserID = data.Nama.value;
    data.NamaUser = data.Nama.label;
    return (dispatch) => {
      axios
        .post(
           "http://"+BASEURL+"/api/attlogmanual/",
          data
        )
        .then(function (response) {
          console.log(response);
          
          dispatch({
            type: POST_MANUAL_MASUK,
            payload: {
              data: response.data,
              errorMessage: false,
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: POST_MANUAL_MASUK,
            payload: {
              data: false,
              errorMessage: error.message,
            },
          });
        });
    };
  };

  export const putManualPulang= (data) => {
    console.log(data);
    data.NamaUser = data.Nama.label;
    data.UserID = data.Nama.value;
    let parameter = data.Nama.datangid;
    return (dispatch) => {
      axios
        .put(
           "http://"+BASEURL+"/api/datangmanual/"+parameter,
          data
        )
        .then(function (response) {
          console.log(response);
          
          dispatch({
            type: PUT_MANUAL_PULANG,
            payload: {
              data: response.data,
              errorMessage: false,
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: PUT_MANUAL_PULANG,
            payload: {
              data: false,
              errorMessage: error.message,
            },
          });
        });
    };
  };

  export const postManualKeluar= (data) => {
    data.UserID = data.Nama.value;
    data.NamaUser = data.Nama.label;
    data.DatangID = data.Nama.DatangID;
    return (dispatch) => {
      axios
        .post(
           "http://"+BASEURL+"/api/keluarkantormanual/",
          data
        )
        .then(function (response) {
          console.log(response);
          
          dispatch({
            type: POST_MANUAL_KELUAR,
            payload: {
              data: response.data,
              errorMessage: false,
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: POST_MANUAL_KELUAR,
            payload: {
              data: false,
              errorMessage: error.message,
            },
          });
        });
    };
  };

  export const putManualKembali= (data) => {
    data.UserID = data.Nama.value;
    data.NamaUser = data.Nama.label;
    let parameter = data.Nama.KeluarID
    return (dispatch) => {
      axios
        .put(
           "http://"+BASEURL+"/api/keluarkantormanual/"+parameter,
          data
        )
        .then(function (response) {
          console.log(response);
          
          dispatch({
            type: PUT_MANUAL_KEMBALI,
            payload: {
              data: response.data,
              errorMessage: false,
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: PUT_MANUAL_KEMBALI,
            payload: {
              data: false,
              errorMessage: error.message,
            },
          });
        });
    };
  };

  export const putManualKelIstirahat= (data) => {
    data.UserID = data.Nama.value;
    data.NamaUser = data.Nama.label;
    let parameter = data.Nama.datangid
    return (dispatch) => {
      axios
        .put(
           "http://"+BASEURL+"/api/istirahatmanual/"+parameter,
          data
        )
        .then(function (response) {
          console.log(response);
          
          dispatch({
            type: PUT_MANUAL_KELISTIRAHAT,
            payload: {
              data: response.data,
              errorMessage: false,
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: PUT_MANUAL_KELISTIRAHAT,
            payload: {
              data: false,
              errorMessage: error.message,
            },
          });
        });
    };
  };

  export const putManualKemIstirahat= (data) => {
    data.UserID = data.Nama.value;
    data.NamaUser = data.Nama.label;
    let parameter = data.Nama.datangid
    return (dispatch) => {
      axios
        .put(
           "http://"+BASEURL+"/api/istirahatkembalimanual/"+parameter,
          data
        )
        .then(function (response) {
          console.log(response);
          
          dispatch({
            type: PUT_MANUAL_KEMISTIRAHAT,
            payload: {
              data: response.data,
              errorMessage: false,
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: PUT_MANUAL_KEMISTIRAHAT,
            payload: {
              data: false,
              errorMessage: error.message,
            },
          });
        });
    };
  };
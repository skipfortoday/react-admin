import axios from "axios";
import { headers } from "../config";
import { BASEURL } from "./adminAction";

export const POST_MANUAL_MASUK = "POST_MANUAL_MASUK";
export const PUT_MANUAL_PULANG = "PUT_MANUAL_PULANG";

export const POST_MANUAL_KELUAR = "POST_MANUAL_KELUAR";
export const PUT_MANUAL_KEMBALI = "PUT_MANUAL_KEMBALI";

export const PUT_MANUAL_KELISTIRAHAT = "PUT_MANUAL_KELISTIRAHAT";
export const PUT_MANUAL_KEMISTIRAHAT = "PUT_MANUAL_KEMISTIRAHAT";
export const RESET_PROPS = "RESET_PROPS";

export const CLEAR_MANUAL = "CLEAR_MANUAL";

export const resetProps = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_PROPS,
    });
  }
}

export const postManualMasuk= (data) => {
  console.log(data);
    data.UserID = data.Nama.value;
    data.NamaUser = data.Nama.label;
    return (dispatch) => {
      axios
        .post(
          BASEURL+"/api/attlogmanual/",
          data,
          headers
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
    let parameter = data.Nama.DatangID;
    return (dispatch) => {
      axios
        .put(
          BASEURL+"/api/datangmanual/"+parameter,
          data,
          headers
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
          BASEURL+"/api/keluarkantormanual/",
          data,
          headers
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
          BASEURL+"/api/keluarkantormanual/"+parameter,
          data,
          headers
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
    let parameter = data.Nama.DatangID
    return (dispatch) => {
      axios
        .put(
          BASEURL+"/api/istirahatmanual/"+parameter,
          data,
          headers
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
    let parameter = data.Nama.DatangID
    return (dispatch) => {
      axios
        .put(
          BASEURL+"/api/istirahatkembalimanual/"+parameter,
          data,
          headers
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

  export const clearManual = () => {
    return {
      type: CLEAR_MANUAL
    };
  };
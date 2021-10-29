import axios from "axios";
import { headers, API_BASEURL } from "../config";
let BASEURL = API_BASEURL;

export const POST_MANUAL_MASUK = "POST_MANUAL_MASUK";
export const PUT_MANUAL_PULANG = "PUT_MANUAL_PULANG";

export const POST_MANUAL_KELUAR = "POST_MANUAL_KELUAR";
export const PUT_MANUAL_KEMBALI = "PUT_MANUAL_KEMBALI";

export const PUT_MANUAL_KELISTIRAHAT = "PUT_MANUAL_KELISTIRAHAT";
export const PUT_MANUAL_KEMISTIRAHAT = "PUT_MANUAL_KEMISTIRAHAT";
export const RESET_PROPS = "RESET_PROPS";

export const CLEAR_MANUAL = "CLEAR_MANUAL";
export const POST_MASUK_OFFLINE = "POST_MASUK_OFFLINE"
export const PUT_PULANG_OFFLINE = "PUT_PULANG_OFFLINE"

export const resetProps = () => {
   return (dispatch) => {
      dispatch({
         type: RESET_PROPS,
      });
   }
}

export const postManualMasukLocal = (data) => {
   return new Promise((resolve, reject) => {
      axios.post("http://localhost:8081/postmasuk/", data, headers)
         .then(function (response) {
            resolve(response.data)
         })
         .catch(function (error) {
            reject(error.message)
         });
   })
}



export const postManualMasuk = (data, online = true) => {
   data.UserID = data.Nama.value;
   data.NamaUser = data.Nama.label;
   data.Shift = data.Shift.value;
   
   let url = BASEURL;
   if(!online) url = "http://localhost:8081";
   return (dispatch) => {
      axios
         .post(
            url + "/api/attlogmanual/",
            data,
            headers
         )
         .then(async function (response) {
            if (response.data.status == 1) {
               // simpan ke local sqlite
               data.DatangID = response.data.DatangID;
               data.Status = 1;
               if(online){
                  await postManualMasukLocal(data);
               }
               dispatch({
                  type: POST_MANUAL_MASUK,
                  payload: {
                     data: response.data,
                     errorMessage: false,
                  },
               });
            } else {
               dispatch({
                  type: POST_MANUAL_MASUK,
                  payload: {
                     data: response.data,
                     errorMessage: response.data.message,
                  },
               });
            }
         })
         .catch(async function (error) {
            if(online){
               data.DatangID = null;
               data.Status = 0;
               let postMasukLocal = await postManualMasukLocal(data);
               console.log(postMasukLocal)
               if (postMasukLocal) {
                  dispatch({
                     type: POST_MANUAL_MASUK,
                     payload: {
                        data: postMasukLocal,
                        errorMessage: false,
                     },
                  });
               } else {
                  dispatch({
                     type: POST_MANUAL_MASUK,
                     payload: {
                        data: false,
                        errorMessage: error.message,
                     },
                  });
               }
            }else{
               dispatch({
                  type: POST_MANUAL_MASUK,
                  payload: {
                     data: false,
                     errorMessage: error.message,
                  },
               });
            }
         });
   };
};

export const putManualPulang = (data, online = true) => {
   data.NamaUser = data.Nama.label;
   data.UserID = data.Nama.value;
   let parameter = data.Nama.DatangID;
   
   let url = BASEURL;
   if(!online) {
      url = "http://localhost:8081";
      parameter = data.Nama.id
   }

   if(parameter == null) parameter = 0

   return (dispatch) => {
      axios
         .put(
            url + "/api/datangmanual/" + parameter,
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

export const postMasukOffline = (data = null) => {
   if(data == null){
      return (dispatch) => {
         dispatch({
            type: POST_MASUK_OFFLINE,
            payload: {
               data: false,
               errorMessage: false,
            },
         })
      }
   }

   return (dispatch) =>{
      axios.post(BASEURL+"/api/masukoffline", data, headers)
      .then((response) => {
         dispatch({
            type: POST_MASUK_OFFLINE,
            payload: {
               data: response.data,
               errorMessage: false,
            },
         });
      })
      .catch((error)=>{
         dispatch({
            type: POST_MASUK_OFFLINE,
            payload: {
               data: false,
               errorMessage: error.message,
            },
         })
      })
   }
}

export const putPulangOffline = (data = null) => {
   if(data == null){
      return (dispatch) => {
         dispatch({
            type: PUT_PULANG_OFFLINE,
            payload: {
               data: false,
               errorMessage: false,
            },
         })
      }
   }

   return (dispatch) =>{
      axios.put(BASEURL+"/api/pulangoffline", data, headers)
      .then((response) => {
         dispatch({
            type: PUT_PULANG_OFFLINE,
            payload: {
               data: response.data,
               errorMessage: false,
            },
         });
      })
      .catch((error)=>{
         dispatch({
            type: PUT_PULANG_OFFLINE,
            payload: {
               data: false,
               errorMessage: error.message,
            },
         })
      })
   }
}

export const postManualKeluar = (data) => {
   data.UserID = data.Nama.value;
   data.NamaUser = data.Nama.label;
   data.DatangID = data.Nama.DatangID;
   return (dispatch) => {
      axios
         .post(
            BASEURL + "/api/keluarkantormanual/",
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

export const putManualKembali = (data) => {
   data.UserID = data.Nama.value;
   data.NamaUser = data.Nama.label;
   let parameter = data.Nama.KeluarID
   return (dispatch) => {
      axios
         .put(
            BASEURL + "/api/keluarkantormanual/" + parameter,
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

export const putManualKelIstirahat = (data) => {
   data.UserID = data.Nama.value;
   data.NamaUser = data.Nama.label;
   let parameter = data.Nama.DatangID
   return (dispatch) => {
      axios
         .put(
            BASEURL + "/api/istirahatmanual/" + parameter,
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

export const putManualKemIstirahat = (data) => {
   data.UserID = data.Nama.value;
   data.NamaUser = data.Nama.label;
   let parameter = data.Nama.DatangID
   return (dispatch) => {
      axios
         .put(
            BASEURL + "/api/istirahatkembalimanual/" + parameter,
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
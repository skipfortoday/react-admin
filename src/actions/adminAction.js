import axios from "axios";
import { API_BASEURL, headers } from '../config'
let BASEURL = API_BASEURL;


// export const GET_ADMIN_TIMENOW = "GET_ADMIN_TIMENOW";
export const GET_ADMIN_LIST = "GET_ADMIN_LIST";
export const GET_ADMIN_ONDUTY = "GET_ADMIN_ONDUTY";
export const GET_ADMIN_DETAIL = "GET_ADMIN_DETAIL";
export const POST_ADMIN_CREATE = "POST_ADMIN_CREATE";
export const PUT_ADMIN_EDIT = "PUT_ADMIN_EDIT";
export const SYNC_TO_LOCAL = "SYNC_TO_LOCAL";
export const SYNC_TO_SERVER = "SYNC_TO_SERVER";


export const getAdminOnDuty = (online = true) => {
   BASEURL = API_BASEURL
   if(!online) BASEURL = "http://localhost:8081"
   return (dispatch) => {
      axios
         .get(BASEURL + "/api/onduty", headers)
         .then(function (response) {
            let ress = response.data;
            ress.online = true;
            dispatch({
               type: GET_ADMIN_ONDUTY,
               payload: {
                  data: ress,
                  errorMessage: false,
               },
            });
         })
         .catch(async function (error) {

            dispatch({
               type: GET_ADMIN_ONDUTY,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const getAdminOnDutyLocal = (data) => {
   return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/onduty", headers)
         .then(function (response) {
            resolve(response.data)
         })
         .catch(function (error) {
            reject(error.message)
         });
   })
}

export const syncToServer = (data) => {
   // ambil data yang perlu disync
   let postData = {attlogs:data}
   return (dispatch) => {
      axios
         .post(API_BASEURL+"/api/synctoserver", postData, headers)
         .then(function (response) {
            dispatch({
               type: SYNC_TO_SERVER,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: SYNC_TO_SERVER,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   }

   // kirim
   // tandai sudah disync di local

}


export const syncToLocal = (data) => {
   let postData = { attlogs: data }
   return (dispatch) => {
      axios
         .post("http://localhost:8081/synctolocal", postData, headers)
         .then(function (response) {
            dispatch({
               type: SYNC_TO_LOCAL,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: SYNC_TO_LOCAL,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   }
}

export const getAdminList = () => {
   return (dispatch) => {
      axios
         .get(BASEURL + "/api/superadmin", headers)
         .then(function (response) {
            dispatch({
               type: GET_ADMIN_LIST,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: GET_ADMIN_LIST,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const getAdminDetail = (AdminID = null) => {
   if (AdminID == null) {
      return (dispatch) => {
         dispatch({
            type: GET_ADMIN_DETAIL,
            payload: {
               data: false,
               errorMessage: false,
            },
         });
      }
   }

   return (dispatch) => {
      axios
         .get(
            BASEURL + "/api/superadmin/" + AdminID, headers
         )
         .then(function (response) {
            dispatch({
               type: GET_ADMIN_DETAIL,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: GET_ADMIN_DETAIL,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const postAdminCreate = (data) => {
   if (data == null) {
      return (dispatch) => {
         dispatch({
            type: POST_ADMIN_CREATE,
            payload: {
               data: false,
               errorMessage: false,
            },
         });
      }
   }

   return (dispatch) => {
      axios
         .post(
            BASEURL + "/api/superadmin",
            data,
            headers
         )
         .then(function (response) {

            dispatch({
               type: POST_ADMIN_CREATE,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: POST_ADMIN_CREATE,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const putAdminUpdate = (data = null, AdminID = null) => {
   if(data === null){
      return (dispatch) =>{
         dispatch({
            type: PUT_ADMIN_EDIT,
            payload: {
               data: false,
               errorMessage: false,
            },
         });
      }
   }
   return (dispatch) => {
      axios
         .put(
            BASEURL + "/api/superadmin/" + AdminID,
            data,
            headers
         )
         .then(function (response) {
            console.log(response);

            dispatch({
               type: PUT_ADMIN_EDIT,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: PUT_ADMIN_EDIT,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};


export const deleteAdmin = (AdminID) => {
   return (dispatch) => {
      axios
         .delete(
            BASEURL + "/api/superadmin/" + AdminID,
            headers
         )
         .then(function (response) {
            console.log(response);

         })
         .catch(function (error) {
            console.log(error);

         });
   };
};



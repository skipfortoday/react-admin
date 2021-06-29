import axios from "axios";
import { headers, siteConfig } from "../config";
import { BASEURL } from "./adminAction";

export const GET_USERS_LIST = "GET_USERS_LIST";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const POST_USER_CREATE = "POST_USER_CREATE";
export const PUT_USER_EDIT = "PUT_USER_EDIT";
export const GET_USER_V = "GET_USER_V";
export const GET_CABANG_LIST = "GET_CABANG_LIST";
export const GET_CABANG_DETAIL = "GET_CABANG_DETAIL";
export const POST_CABANG_CREATE = "POST_CABANG_CREATE";
export const PUT_CABANG_EDIT = "PUT_CABANG_EDIT";
export const LOCAL_FP = "LOCAL_FP";
export const POST_DOWNLOAD_FP = "POST_DOWNLOAD_FP";
export const DELETE_FP = "DELETE_FP";
// export const SET_TGL_CUTI = "SET_TGL_CUTI";

export const GET_USER_LIST_LOCAL = "GET_USER_LIST_LOCAL";

export const getUsersListLocal = () => {
   return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/users", headers)
         .then(function (response) {
            resolve(response.data)
         })
         .catch(function (error) {
            reject(error.message)
         });
   })
}

export const postDownloadFp = (UserIDs) => {
   if(UserIDs == null){
      return (dispatch) => {
         dispatch({
            type: POST_DOWNLOAD_FP,
            payload: {
               data: false,
               errorMessage: false,
            }
         });
      }   
   }

   let data = { UserIDs: UserIDs }
   return (dispatch) => {
      axios
         .post("http://localhost:8081/downloadfp",
            data,
            headers
         ).then((response) => {
            dispatch({
               type: POST_DOWNLOAD_FP,
               payload: {
                  data: response.data,
                  errorMessage: false,
               }
            });
         }).catch((error) => {
            dispatch({
               type: POST_DOWNLOAD_FP,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         })
   }
}

export const getUsersList = (isAll = false, local = false) => {

   if (isAll) headers.headers.KodeCabang = 'all';
   else headers.headers.KodeCabang = siteConfig.kodeCabang
   
   return (dispatch) => {
      axios
         .get(BASEURL + "/api/user", headers)
         .then(async function (response) {
            let localFps = await getLocalFingerPrint();
            let users = [];
            if (response.data) {
               Promise.all(response.data.map((val, key) => {
                  val.FPLocal = localFps.includes(val.UserID);
                  users.push(val)
               }));
               
               if(local){ 
                  //let localUsers = await getUsersListLocal();

                  users.map((item, key)=>{
                     item.userLocal = key
                  })
               }
            }
            

            dispatch({
               type: GET_USERS_LIST,
               payload: {
                  data: users,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: GET_USERS_LIST,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};


export const getUserV = () => {
   return (dispatch) => {
      axios
         .get(BASEURL + "/api/vuser", headers)
         .then(function (response) {
            dispatch({
               type: GET_USER_V,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: GET_USER_V,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};


export const getUserDetail = (UserID = null) => {
   if (UserID == null) {
      return (dispatch) => {
         dispatch({
            type: GET_USER_DETAIL,
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
            BASEURL + "/api/user/" + UserID,
            headers
         )
         .then(function (response) {
            dispatch({
               type: GET_USER_DETAIL,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: GET_USER_DETAIL,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const postUserCreate = (data) => {
   data.GroupID = data.GroupID.value;
   data.RoleID = data.RoleID.value;
   data.TglAwalKontrakPertama = data.TglAwalKontrakPertama == undefined ? null : data.TglAwalKontrakPertama;
   data.Status = data.Status.value
   return (dispatch) => {
      axios
         .post(
            BASEURL + "/api/user/",
            data,
            headers
         )
         .then(function (response) {

            dispatch({
               type: POST_USER_CREATE,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: POST_USER_CREATE,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const putUserUpdate = (data, UserID) => {
   return (dispatch) => {
      data.GroupID = data.GroupID.value;
      data.RoleID = data.RoleID.value;
      data.TglAwalKontrakPertama = data.TglAwalKontrakPertama == undefined ? null : data.TglAwalKontrakPertama;
      data.Status = data.Status.value;
      axios
         .put(
            BASEURL + "/api/user/" + UserID,
            data,
            headers
         )
         .then(function (response) {
            console.log(response);

            dispatch({
               type: PUT_USER_EDIT,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: PUT_USER_EDIT,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};


export const deleteUser = (UserID) => {
   return (dispatch) => {
      axios
         .delete(
            BASEURL + "/api/user/" + UserID,
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


export const resetUser = (UserID) => {
   return (dispatch) => {
      axios
         .put(
            BASEURL + "/api/resetdevice/" + UserID,
            null,
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

export const deleteFingerprint = (UserID = null) => {
   if(UserID == null){
      return (dispatch) =>{
         dispatch({
            type: DELETE_FP,
            payload: {
               data: false,
               errorMessage: false,
            },
         });
      }
   }

   return (dispatch) => {
      axios
      .delete(
         "http://localhost:8081/deletefingerprint/"+UserID,
      ).then((response)=>{
         dispatch({
            type: DELETE_FP,
            payload: {
               data: response.data,
               errorMessage: false,
            },
         });
      }).catch((error) => {
         dispatch({
            type: DELETE_FP,
            payload: {
               data: false,
               errorMessage: error.message,
            },
         });
      });
   }
}

export const registerFingerPrint = (UserID, key) => {
   return (dispatch) => {
      axios
         .get(
            "http://localhost:8081/register/" + UserID + "/" + key,
         )
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            console.log(error);

         });
   };
}

export const verifikasiFingerPrint = (key) => {
   return (dispatch) => {
      axios
         .get(
            "http://localhost:8081/verifikasi?key=" + key,
         )
         .then(function (response) {
            // console.log(response);
         })
         .catch(function (error) {
            // console.log(error);
         });
   };
}

export const getLocalFingerPrint = () => {
   return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/getfplist", headers)
         .then(function (response) {
            resolve(response.data)
         })
         .catch(function (error) {
            reject(error.message)
         });
   })
}

export const resetPasswordUser = (UserID) => {
   return (dispatch) => {
      axios
         .put(
            BASEURL + "/api/resetpassworduser/" + UserID,
            null,
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


export const deleteDataUser = () => {
   return (dispatch) => {
      dispatch({
         type: GET_USER_DETAIL,
         payload: {
            data: false,
            errorMessage: false,
         },
      });
      dispatch({
         type: POST_USER_CREATE,
         payload: {
            data: false,
            errorMessage: false,
         },
      });
   };
};

export const getCabangList = () => {
   return (dispatch) => {
      axios
         .get(BASEURL + "/api/cabang", headers)
         .then(function (response) {
            dispatch({
               type: GET_CABANG_LIST,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: GET_CABANG_LIST,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const getCabangDetail = (KodeCabang) => {
   return (dispatch) => {
      axios
         .get(
            BASEURL + "/api/cabang/" + KodeCabang,
            headers
         )
         .then(function (response) {
            dispatch({
               type: GET_CABANG_DETAIL,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: GET_CABANG_DETAIL,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const postCabangCreate = (data) => {
   return (dispatch) => {
      axios
         .post(
            BASEURL + "/api/cabang/",
            data,
            headers
         )
         .then(function (response) {
            console.log(response);

            dispatch({
               type: POST_CABANG_CREATE,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: POST_CABANG_CREATE,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};

export const putCabangUpdate = (data, KodeCabang) => {
   return (dispatch) => {
      axios
         .put(
            BASEURL + "/api/cabang/" + KodeCabang,
            data,
            headers
         )
         .then(function (response) {
            console.log(response);

            dispatch({
               type: PUT_CABANG_EDIT,
               payload: {
                  data: response.data,
                  errorMessage: false,
               },
            });
         })
         .catch(function (error) {
            dispatch({
               type: PUT_CABANG_EDIT,
               payload: {
                  data: false,
                  errorMessage: error.message,
               },
            });
         });
   };
};


export const deleteCabang = (KodeCabang) => {
   return (dispatch) => {
      axios
         .delete(
            BASEURL + "/api/cabang/" + KodeCabang,
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


export const deleteDataCabang = () => {
   return (dispatch) => {
      dispatch({
         type: GET_CABANG_DETAIL,
         payload: {
            data: false,
            errorMessage: false,
         },
      });


      dispatch({
         type: POST_CABANG_CREATE,
         payload: {
            data: false,
            errorMessage: false,
         },
      });
   };
};


// export const setTglCuti = () => {
//   return (dispatch) =>{
//     dispatch({
//       type: SET_TGL_CUTI,
//       payload: {

//       }
//     })
//   }
// }
import axios from "axios";

export const BASEURL="192.168.11.2:3001";

// export const GET_ADMIN_TIMENOW = "GET_ADMIN_TIMENOW";
export const GET_ADMIN_LIST = "GET_ADMIN_LIST";
export const GET_ADMIN_ONDUTY = "GET_ADMIN_ONDUTY";
export const GET_ADMIN_DETAIL = "GET_ADMIN_DETAIL";
export const POST_ADMIN_CREATE = "POST_ADMIN_CREATE";
export const PUT_ADMIN_EDIT = "PUT_ADMIN_EDIT";




// export const getAdminTimeNow = () => {
//   return (dispatch) => {
//     setInterval (function() {
//     axios.get("http://"+BASEURL+"/api/gettime2")
//       .then(function (response) {
//         dispatch({
//           type: GET_ADMIN_TIMENOW,
//           payload: {
//             data: response.data,
//             errorMessage: false,
//           },
//         });
//       })
//       .catch(function (error) {
//         dispatch({
//           type: GET_ADMIN_TIMENOW,
//           payload: {
//             data: false,
//             errorMessage: error.message,
//           },
//         });
//       });},1000);
//   };
// };

export const getAdminOnDuty = () => {
  return (dispatch) => {
    axios
      .get("http://"+BASEURL+"/api/onduty")
      .then(function (response) {
        dispatch({
          type: GET_ADMIN_ONDUTY,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
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


export const getAdminList = () => {
  return (dispatch) => {
    axios
      .get("http://"+BASEURL+"/api/superadmin")
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

export const getAdminDetail = (AdminID) => {
  return (dispatch) => {
    axios
      .get(
        "http://"+BASEURL+"/api/superadmin/"+ AdminID
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
  return (dispatch) => {
    axios
      .post(
         "http://"+BASEURL+"/api/superadmin/",
        data
      )
      .then(function (response) {
        console.log(response);
        
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

export const putAdminUpdate = (data,AdminID) => {
  return (dispatch) => {
    axios
      .put(
        "http://"+BASEURL+"/api/superadmin/"+AdminID,
        data
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
         "http://"+BASEURL+"/api/superadmin/"+AdminID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};



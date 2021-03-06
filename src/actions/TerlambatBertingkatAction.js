import axios from "axios";
import { headers } from "../config";
import { BASEURL } from "./adminAction";

export const GET_TERLAMBATBERTINGKAT_LIST = "GET_TERLAMBATBERTINGKAT_LIST";
export const GET_TERLAMBATBERTINGKAT_DETAIL = "GET_TERLAMBATBERTINGKAT_DETAIL";
export const GET_TERLAMBATBERTINGKAT_DETAIL2 = "GET_TERLAMBATBERTINGKAT_DETAIL2";
export const POST_TERLAMBATBERTINGKAT_CREATE = "POST_TERLAMBATBERTINGKAT_CREATE";
export const PUT_TERLAMBATBERTINGKAT_EDIT = "PUT_TERLAMBATBERTINGKAT_EDIT";
export const DEL_TERLAMBATBERTINGKAT_DETAIL2 = "DEL_TERLAMBATBERTINGKAT_DETAIL2";
export const POST_TERLAMBATBERTINGKAT_SALIN = "POST_TERLAMBATBERTINGKAT_SALIN";
export const RESET_FORMTT = "RESET_FORMTT";
export const RESET_RESPONTT = "RESET_RESPONTT";

export const resetFormTT = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_FORMTT,
    });
  }
}

export const reseResponTT = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_RESPONTT,
    });
  }
}


export const getTerlambatBertingkatList = () => {
  return (dispatch) => {
    axios
      .get(BASEURL+"/api/TerlambatBertingkat", headers)
      .then(function (response) {
        dispatch({
          type: GET_TERLAMBATBERTINGKAT_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_TERLAMBATBERTINGKAT_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getTerlambatBertingkatDetail = (GroupID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/TerlambatBertingkat/"+GroupID,
        headers
      )
      .then(function (response) {
        var terlambatBertingkat = [];
        response.data.map(function(item){
          item['value']=item.RuleTerlambatBertingkatID;
          item['label']=item.GroupID+', Shift : '+item.Shift+', Jam : '+item.MaxJamDatang+', Potongan : '+item.RpPotonganTerlambat;
          terlambatBertingkat.push(item);
        })
        dispatch({
          type: GET_TERLAMBATBERTINGKAT_DETAIL,
          payload: {            
            data: terlambatBertingkat,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_TERLAMBATBERTINGKAT_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

// export const delTerlambatBertingkatDetail2 = () =>{
//   return (dispatch) => {
//     dispatch({
//       type: GET_TERLAMBATBERTINGKAT_DETAIL2,
//       payload: {
//         data: response.data,
//         errorMessage: false,
//       },
//     })
//   }
// }

export const getTerlambatBertingkatDetail2 = (RuleTerlambatBertingkatID) => {
  return (dispatch) => {
    axios
      .get(
        BASEURL+"/api/TerlambatBertingkat2/"+RuleTerlambatBertingkatID,
        headers
      )
      .then(function (response) {
        dispatch({
          type: GET_TERLAMBATBERTINGKAT_DETAIL2,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_TERLAMBATBERTINGKAT_DETAIL2,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postTerlambatBertingkatCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         BASEURL+"/api/TerlambatBertingkat/",
        data,
        headers
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_TERLAMBATBERTINGKAT_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_TERLAMBATBERTINGKAT_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putTerlambatBertingkatUpdate = (data, RuleTerlambatBertingkatID) => {
  return (dispatch) => {
    axios
      .put(
        BASEURL+"/api/TerlambatBertingkat/"+RuleTerlambatBertingkatID,
        data,
        headers
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_TERLAMBATBERTINGKAT_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_TERLAMBATBERTINGKAT_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteTerlambatBertingkat = (RuleTerlambatBertingkatID) => {
  return (dispatch) => {
    axios
      .delete(
         BASEURL+"/api/TerlambatBertingkat/"+RuleTerlambatBertingkatID, headers
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataTerlambatBertingkat = () => {
  return (dispatch) => {
    dispatch({
      type: GET_TERLAMBATBERTINGKAT_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_TERLAMBATBERTINGKAT_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};


export const postSalinRuleTerlambatBertingkat = (data) => {
  return (dispatch) => {
    axios
      .post(
        BASEURL+"/api/SalinTerlambatBertingkat/",
        data,
        headers
      )
      .then(function (response) {
        dispatch({
          type: POST_TERLAMBATBERTINGKAT_SALIN,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_TERLAMBATBERTINGKAT_SALIN,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
import axios from "axios";

export const GET_TERLAMBATBERTINGKAT_LIST = "GET_TERLAMBATBERTINGKAT_LIST";
export const GET_TERLAMBATBERTINGKAT_DETAIL = "GET_TERLAMBATBERTINGKAT_DETAIL";
export const GET_TERLAMBATBERTINGKAT_DETAIL2 = "GET_TERLAMBATBERTINGKAT_DETAIL2";
export const POST_TERLAMBATBERTINGKAT_CREATE = "POST_TERLAMBATBERTINGKAT_CREATE";
export const PUT_TERLAMBATBERTINGKAT_EDIT = "PUT_TERLAMBATBERTINGKAT_EDIT";



export const getTerlambatBertingkatList = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.0.25:3001/api/TerlambatBertingkat")
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
        "http://192.168.0.25:3001/api/TerlambatBertingkat/"+GroupID
      )
      .then(function (response) {
        dispatch({
          type: GET_TERLAMBATBERTINGKAT_DETAIL,
          payload: {
            data: response.data,
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

export const getTerlambatBertingkatDetail2 = (RuleTerlambatBertingkatID) => {
  return (dispatch) => {
    axios
      .get(
        "http://192.168.0.25:3001/api/TerlambatBertingkat2/"+RuleTerlambatBertingkatID
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
         "http://192.168.0.25:3001/api/TerlambatBertingkat/",
        data
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
        "http://192.168.0.25:3001/api/TerlambatBertingkat/"+RuleTerlambatBertingkatID,
        data
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
         "http://192.168.0.25:3001/api/TerlambatBertingkat/"+RuleTerlambatBertingkatID
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

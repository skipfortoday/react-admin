import axios from "axios";
import { BASEURL } from "./adminAction";

export const POST_MANUAL_MASUK = "POST_MANUAL_MASUK";
export const PUT_MANUAL_PULANG = "PUT_MANUAL_PULANG";

export const postManualMasuk= (data) => {
    data.UserID = data.Nama.value;
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
    data.UserID = data.Nama.value;
    let parameter = data.Nama.datangid
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
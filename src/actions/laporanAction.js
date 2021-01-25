import axios from "axios";

export const GET_LAPORAN_LIST = "GET_LAPORAN_LIST";
export const GET_LAPORAN_DETAIL = "GET_LAPORAN_DETAIL";




export const getLaporanList = (UserID) => {
  return (dispatch) => {
    axios
      .get("http://192.168.0.25:3001/api/laporan/"+UserID)
      .then(function (response) {
        dispatch({
          type: GET_LAPORAN_LIST,
          payload: {
            data: response.data,
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

export const getLaporanDetail = (UserID,TglIn,TglOut) => {
  return (dispatch) => {
    axios
      .get(
        "http://192.168.0.25:3001/api/lapdet/"+UserID+"&"+TglIn+"&"+TglOut)
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


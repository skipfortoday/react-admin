import axios from "axios";
import { BASEURL } from "./adminAction";

export const GET_LIST_HISTORY = 'GET_LIST_HISTORY';
export const SET_FILTER_HISTORY = 'SET_FILTER_HISTORY';
export const DEL_LIST_HISTORY = 'DEL_LIST_HISTORY';

export const setFilterHistory = (data) =>{
    return (dispatch) => {
        dispatch({
            type: SET_FILTER_HISTORY,
            payload: data,
        })
    }
}

export const delListHistory = () =>{
    return (dispatch) => {
        dispatch({
            type: DEL_LIST_HISTORY,
            payload: {
                data: false,
                errorMessage: false,
            },
        })
    }
}

export const getListHistory = (Nama, TglAwal, TglAkhir) => {
    return (dispatch) => {
        axios
            .get("http://" + BASEURL + "/api/history/"+Nama+"&"+TglAwal+"&"+TglAkhir)
            .then(function (response) {
                dispatch({
                    type: GET_LIST_HISTORY,
                    payload: {
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch(function (error) {
                dispatch({
                    type: GET_LIST_HISTORY,
                    payload: {
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
}
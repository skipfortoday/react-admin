import axios from "axios";
import { headers } from "../config";
import { BASEURL } from "./adminAction";

export const GET_LIST_PENGUMUMAN = "GET_LIST_PENGUMUMAN";
export const LIST_CB_CABANG = "LIST_CB_CABANG";
export const LIST_CB_GROUP = "LIST_CB_GROUP";
export const GET_DETAIL_PENGUMUMAN = "GET_DETAIL_PENGUMUMAN"
export const SAVE_PENGUMUMAN = "SAVE_PENGUMUMAN"

export const savePengumuman = (data) => {
    if(data == null){
        return (dispatch) => {
            dispatch({
                type: SAVE_PENGUMUMAN,
                payload: {
                    data: false,
                    errorMessage: false,
                },
            });
        }
    }
    
    headers.headers['content-type'] = 'multipart/form-data';

    var form_data = new FormData();

    for ( var key in data ) {
        form_data.append(key, data[key]);
    }

    return (dispatch) => {
        axios
            .post(BASEURL + "/api/pengumuman/save", form_data, headers)
            .then(function (response) {
                dispatch({
                    type: SAVE_PENGUMUMAN,
                    payload: {
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch(function (error) {
                dispatch({
                    type: SAVE_PENGUMUMAN,
                    payload: {
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    }
}

export const getDetailPengumuman = (id) => {
    if(id == null){
        return (dispatch) => {
            dispatch({
                type: GET_DETAIL_PENGUMUMAN,
                payload: {
                    data: false,
                    errorMessage: false,
                },
            });
        }
    }

    return (dispatch) => {
        axios
            .get(BASEURL + "/api/pengumuman/detail/"+id, headers)
            .then(function (response) {
                dispatch({
                    type: GET_DETAIL_PENGUMUMAN,
                    payload: {
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch(function (error) {
                dispatch({
                    type: GET_DETAIL_PENGUMUMAN,
                    payload: {
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    }
}

export const getListCbGroup = (RoleAdmin, id = null, data = null) => {
    if(data){
        return (dispatch) => {
            dispatch({
                type: LIST_CB_GROUP,
                payload: {
                    data: data,
                    errorMessage: false,
                },
            });
        }
    }
    return (dispatch) => {
        axios
            .get(BASEURL + "/api/pengumuman/lsgroup/"+RoleAdmin+"/"+id, headers)
            .then(function (response) {
                dispatch({
                    type: LIST_CB_GROUP,
                    payload: {
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch(function (error) {
                dispatch({
                    type: LIST_CB_GROUP,
                    payload: {
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    }
}

export const getListCbCabang = (RoleAdmin, id = 0, data = null) => {
    
    if(data){
        return (dispatch) => {
            dispatch({
                type: LIST_CB_CABANG,
                payload: {
                    data: data,
                    errorMessage: false,
                },
            });
        }
    }
    return (dispatch) => {
        
        axios
            .get(BASEURL + "/api/pengumuman/lscabang/"+RoleAdmin+"/"+id, headers)
            .then(function (response) {
                dispatch({
                    type: LIST_CB_CABANG,
                    payload: {
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch(function (error) {
                dispatch({
                    type: LIST_CB_CABANG,
                    payload: {
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    }
}

export const getListPengumuman = (mode) => {
    
    let url = BASEURL + "/api/pengumuman?page=0&perpage=0&mode="+mode;

    return (dispatch) => {
        axios
            .get(url, headers)
            .then(function (response) {
                dispatch({
                    type: GET_LIST_PENGUMUMAN,
                    payload: {
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch(function (error) {
                dispatch({
                    type: GET_LIST_PENGUMUMAN,
                    payload: {
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    }
}
import axios from "axios";
import { headers } from "../config";
import { BASEURL, GET_ADMIN_ONDUTY } from "./adminAction";
export const SET_OFFLINE_MODE = "SET_OFFLINE_MODE";

import createHistory from 'history/createBrowserHistory';
const history = createHistory();


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log(response)
    return response;
}, function (error) {
    if(error.message.includes('403')){
        localStorage.removeItem("user")
        window.location.href = "/login"
    }

    if (error.message == 'Network Error') {
        let checkConn = parseInt(localStorage.getItem('checkConn'))
        if(checkConn === 1){
            localStorage.removeItem('checkConn')
        }else{
            window.location.href="/offlinemasuk"
        }
        // console.log(axios.interceptors.request.headers)
    }
    return Promise.reject(error);
});
export default axios;


export const setOfflineMode = (val) => {
    return (dispatch) => {
        // dispatch({
        //     type: SET_OFFLINE_MODE,
        //     payload: {
        //         data: {
        //             online:false
        //         },
        //         errorMessage: false,
        //     },
        // });
        dispatch({
            type: GET_ADMIN_ONDUTY,
            payload: {
              data: false,
              errorMessage: error.message,
            },
          });
    }
}
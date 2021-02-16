import {
    GET_OPT_USER,
  } from "../actions/optAction"
  
  let initialState = {
    getOptUser: false,
    errorOptUser: false,
  };
  
  const Opt = (state = initialState, action) => {
    switch (action.type) {
      case GET_OPT_USER:
        return {
          ...state,
          getOptUser: action.payload.data,
          errorOptUser: action.payload.errorMessage,
        };
      default:
        return state;
    }
  };
  
  export default Opt ;
  
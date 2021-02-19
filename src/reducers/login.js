import {
    POST_LOGIN_USER,

  } from "../actions/loginAction"
  
  let initialState = {
    getResponLoginUser: false,
    errorResponLoginUser: false,
  };
  
  const Login = (state = initialState, action) => {
    switch (action.type) {
  
      case POST_LOGIN_USER:
        return {
          ...state,
          getResponLoginUser: action.payload.data,
          errorResponLoginUser: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  };
  
  export default Login ;
  
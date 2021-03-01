import {
    POST_LOGIN_USER,

  } from "../actions/loginAction"

  let initialState = {
    getResponLoginUser: false,
    errorResponLoginUser: false,
    isAuthenticated: false,
    user: null,
  };


  
  
  const Login = (state = initialState, action) => {
    switch (action.type) {
  
      case POST_LOGIN_USER:
        localStorage.setItem("user", JSON.stringify(action.payload.data))
        return {
          ...state,
          user: action.payload.data,
          getResponLoginUser: action.payload.data,
          errorResponLoginUser: action.payload.errorMessage,
          isAuthenticated: true,
        };
  
      default:
        return state;
    }
  };
  
  export default Login ;
  
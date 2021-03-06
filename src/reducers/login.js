import {
  POST_LOGIN_USER,
  RESET_STATE

} from "../actions/loginAction"

let initialState = {
  getResponLoginUser: false,
  errorResponLoginUser: false,
  isAuthenticated: false,
  user: null,
  loginStatusMessage: "",
};




const Login = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return {
        getResponLoginUser: false,
        errorResponLoginUser: false,
        isAuthenticated: false,
        loginStatusMessage: ""
      }

    case POST_LOGIN_USER:
      const data = action.payload.data;
      if (data.Login === true) {
        localStorage.setItem("user", JSON.stringify(data));
        return {
          ...state,
          user: data,
          getResponLoginUser: data,
          isAuthenticated: true,
          loginStatusMessage: data.message,
          errorResponLoginUser:false
        };
      } else {
        return {
          getResponLoginUser: false,
          errorResponLoginUser: true,
          isAuthenticated: false,
          loginStatusMessage: data.message
        }
      }

    default:
      return state;
  }
};

export default Login;

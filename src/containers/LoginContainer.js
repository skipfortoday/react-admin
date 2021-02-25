import React, { Component} from "react";
import { connect } from "react-redux";
import { postLoginUser } from "../actions/loginAction";
import swal from "sweetalert";
import { getUsersList } from "../actions/userAction";
import LoginComponent from "../components/LoginComponent";
import ListUserLaporan from "../components/ListUserLaporan";
import { Redirect } from "react-router-dom";


const mapStateToProps = (state) => {
  return {
    getResponLoginUser: state.Login.getResponLoginUser,
    errorResponLoginUser: state.Login.errorResponLoginUser,
    isAuthenticated: state.Login.isAuthenticated,
    user: state.Login.user,
  };
};


class LoginContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postLoginUser(data));
  }
  componentDidMount() {
    this.props.dispatch(getUsersList());
  }


  
  render() {
    if (this.props.getResponLoginUser || this.props.errorResponLoginUser) {
      if (this.props.errorResponLoginUser) {
        window.location.reload();
        swal("Failed!", "LoginGagal", "error");
        
      } else {
        swal(
          "Sucsess!",
          "Login Berhasil",
          "success"

        );return <Redirect to="/" /> 
      }
    }

    return (

   
    <div>
    <LoginComponent onSubmit={(data) => this.handleSubmit(data)}/>
   
     </div>
   
    );
  }
}

export default connect(mapStateToProps, null)(LoginContainer);

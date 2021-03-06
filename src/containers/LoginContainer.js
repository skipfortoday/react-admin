import React, { Component } from "react";
import { connect } from "react-redux";
import { postLoginUser, resetState } from "../actions/loginAction";
import swal from "sweetalert";
import LoginComponent from "../components/LoginComponent";
import {Container } from "reactstrap";
import bgLogin from "../bg_login_page.png"
import userLogin from "../icon_user_login.png"
import './LoginStyle.css';
import { Redirect } from "react-router";

const mapStateToProps = (state) => {
  return {
    getResponLoginUser: state.Login.getResponLoginUser,
    errorResponLoginUser: state.Login.errorResponLoginUser,
    isAuthenticated: state.Login.isAuthenticated,
    user: state.Login.user,
    loginStatusMessage:state.Login.loginStatusMessage
  };
};

class LoginContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postLoginUser(data));
  }
  componentDidMount() {
  }
  
  componentDidUpdate(){
    // this.props.dispatch(getUsersList());
    if (this.props.getResponLoginUser || this.props.errorResponLoginUser) {
      if (
        this.props.errorResponLoginUser ||
        this.props.getResponLoginUser.Login === "false"
      ) {
        swal("Gagal", this.props.loginStatusMessage, "error");
      } else {
        if (this.props.getResponLoginUser.RoleAdmin === 99) {
          swal("Sucsess!", this.props.loginStatusMessage, "success")
          .then((value) => {
            //return <Redirect to="/superadmin" />;
            window.location.href="/superadmin";
          });
        } else {
          swal("Sucsess!", this.props.loginStatusMessage, "success")
          .then((value) => {
            window.location.href="/";
          });
        }
      }

      this.props.dispatch(resetState());
    }
  }

  render() {
    if (localStorage.getItem('user')) {
      return <Redirect to="/" />;
    }

    return (
      <div className="mainWrapper" style={{backgroundImage:`url(${bgLogin})`, marginTop:-55}}>
        <Container>
          <div className="loginWrapper">
            <div className="loginBox">
              <img className="iconUser" src={userLogin} alt="user-login"></img>
              <h1 className="welcome">WELCOME ADMIN</h1>
              <LoginComponent onSubmit={(data) => this.handleSubmit(data)} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(LoginContainer);

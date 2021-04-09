import React, { Component } from "react";
import { connect } from "react-redux";
import { postLoginUser } from "../actions/loginAction";
import swal from "sweetalert";
import { getUsersList } from "../actions/userAction";
import LoginComponent from "../components/LoginComponent";
import BackLogin from "../components/BackLogin";
import { Redirect } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import bgLogin from "../bg_login_page.png"
import userLogin from "../icon_user_login.png"
import './LoginStyle.css';

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
      if (
        this.props.errorResponLoginUser ||
        this.props.getResponLoginUser.Login === "false"
      ) {
        alert("Username & Password Salah");
        window.location.reload();
      } else {
        if (this.props.getResponLoginUser.RoleAdmin === 99) {
          swal("Sucsess!", "Login Berhasil", "success");
          return <Redirect to="/superadmin" />;
        } else {
          swal("Sucsess!", "Login Berhasil", "success");
          return <Redirect to="/" />;
        }
      }
    }


    return (
      <div className="mainWrapper" style={{backgroundImage:`url(${bgLogin})`}}>
        <Container>
          <div className="loginWrapper">
            <div className="loginBox">
              <img className="iconUser" src={userLogin}></img>
              <h1 className="welcome">WELCOME ADMIN</h1>
              <LoginComponent onSubmit={(data) => this.handleSubmit(data)} />
            </div>
          </div>
          {/* <Row>
            <BackLogin />
          </Row> */}
          {/* <Row>
            <Col md={3}></Col>
            <Col md={7}> */}
              {/* <LoginComponent onSubmit={(data) => this.handleSubmit(data)} /> */}
            {/* </Col>
          </Row> */}
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(LoginContainer);

import React, { Component} from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { postLoginUser } from "../actions/loginAction";
import swal from "sweetalert";
import LoginComponent from "../components/LoginComponent";
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
      <Container>
        <Row>
      <Col md={3}></Col>
     <Col md={5}>
     <LoginComponent onSubmit={(data) => this.handleSubmit(data)}/>
     </Col>
     </Row>
        </Container>
    );
  }
}

export default connect(mapStateToProps, null)(LoginContainer);

import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { postLoginUser } from "../actions/loginAction";
import swal from "sweetalert";
import LoginComponent from "../components/LoginComponent";


const mapStateToProps = (state) => {
  return {
    getResponLoginUser: state.Login.getResponLoginUser,
    errorResponLoginUser: state.Login.errorResponLoginUser,
  };
};


class LoginContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postLoginUser(data));
  }

  
  render() {
    if (this.props.getResponLoginUser || this.props.errorResponLoginUser) {
      if (this.props.errorResponLoginUser) {
        swal("Failed!", "LoginGagal", "error");
      } else {
        swal(
          "Sucsess!",
          "ok",
          "success"
        );
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

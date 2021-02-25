import React, { Component } from "react";
import { Container, Col, Row, Alert } from "reactstrap";
import BackComponent from "../components/BackComponent";
import FormComponent from "../components/FormComponent";
import { connect } from "react-redux";
import { postUserCreate } from "../actions/userAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { getOptCabang, getOptGroup } from "../actions/optAction";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class CreateUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptGroup());
    this.props.dispatch(getOptCabang());
  }

  handleSubmit(data) {
    this.props.dispatch(postUserCreate(data));
  }

  render() {
    if (!localStorage.getItem("user")) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" />;
    }
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        swal("Failed!", this.props.errorResponDataUser, "error");
      } else {
        swal(
          "User Berhasil Dibuat!",
          "Nama : " +
            this.props.getResponDataUser.Nama +
            " | ID : " +
            this.props.getResponDataUser.UserID,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
        <BackComponent />
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateUserContainer);

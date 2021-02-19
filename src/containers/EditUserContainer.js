import React, { Component } from "react";
import { Container, Alert, Row, Col } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import FormComponent from "../components/FormComponent";
import InfoMenuPegawai from "../components/InfoMenuPegawai";
import { getUserDetail, putUserUpdate } from "../actions/userAction";
import { getOptCabang, getOptGroup } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class EditUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptGroup())
    this.props.dispatch(getOptCabang())
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  handleSubmit(data) {
    this.props.dispatch(putUserUpdate(data, this.props.match.params.UserID));
  }

  render() {
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        swal("Failed!", this.props.errorResponDataUser, "error");
      } else {
        swal(
          "User " + this.props.getResponDataUser.Nama + " Updated!",
          " UserID : " + this.props.getResponDataUser.UserID,
          "success"
        );
      }
    }
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackComponent />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Detail Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuPegawai />
        <Alert color="warning"></Alert>
        <h4>Form Edit Pegawai</h4>
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(EditUserContainer);

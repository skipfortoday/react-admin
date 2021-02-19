import React, { Component } from "react";
import { Container, Col, Row, Alert } from "reactstrap";
import BackComponent from "../components/BackComponent";
import FormComponent from "../components/FormComponent";
import { connect } from "react-redux";
import { postUserCreate } from "../actions/userAction";
import swal from "sweetalert";
import InfoMenuPegawai from "../components/InfoMenuPegawai";
import NavbarComponent from "../components/NavbarComponent";
import { getOptCabang, getOptGroup } from "../actions/optAction";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class CreateUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptGroup())
    this.props.dispatch(getOptCabang())
  }

  handleSubmit(data) {
    this.props.dispatch(postUserCreate(data));
  }

  render() {
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
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackComponent />
          </Col>
          <Col md={11}>
            <Alert color="info">
              <h4>Menu Tambah Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateUserContainer);

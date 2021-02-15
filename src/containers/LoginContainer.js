import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import LoginComponent from "../components/LoginComponent";
import { connect } from "react-redux";
import { postCabangCreate } from "../actions/cabangAction";
import swal from "sweetalert";

const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
  };
};

class LoginContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postCabangCreate(data));
  }

  render() {
    if (this.props.getResponDataCabang || this.props.errorResponDataCabang) {
      if (this.props.errorResponDataCabang) {
        swal("Failed!", this.props.errorResponDataCabang, "error");
      } else {
        swal(
          "Cabang Created!",
          "Kode : " +
            this.props.getResponDataCabang.KodeCabang +
            " , Nama : " +
            this.props.getResponDataCabang.NamaCabang,
          "success"
        );
      }
    }
    return (
      <Container>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Alert color=""></Alert>
          </Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Alert color=""></Alert>
          </Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Alert color=""></Alert>
          </Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Alert color="info"></Alert>
            <LoginComponent onSubmit={(data) => this.handleSubmit(data)} />
            <Alert color="warning"></Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(LoginContainer);

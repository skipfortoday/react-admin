import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackCabang from "../components/BackCabang";
import InfoMenuCabang from "../components/InfoMenuCabang";
import FormCabangComponent from "../components/FormCabangComponent";
import { connect } from "react-redux";
import { postCabangCreate } from "../actions/cabangAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
  };
};


class CreateCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    this.props.dispatch(postCabangCreate(data));
  }

  
  render() {
    if (!localStorage.getItem('user')) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
    } 
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
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackCabang />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Tambah Cabang</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuCabang />
        <Alert color="warning"></Alert>
        <h2>Form Tambah Cabang</h2>
        <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning"></Alert>
        </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateCabangContainer);

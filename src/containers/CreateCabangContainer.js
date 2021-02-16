import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackCabang from "../components/BackCabang";
import InfoMenuCabang from "../components/InfoMenuCabang";
import FormCabangComponent from "../components/FormCabangComponent";
import { connect } from "react-redux";
import { postCabangCreate } from "../actions/cabangAction";
import { getOptUser } from "../actions/optAction";
import { getUsersList } from "../actions/userAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import Select from 'react-select';
import ReactSelectComponent from "../components/ReactSelectComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
    getOptUser: state.Opt.getOptUser,
    errorOptUser: state.Opt.errorOptUser,
    getUserList: state.users.getUserList,
  };
};


class CreateCabangContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
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
        <ReactSelectComponent/>
        <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning"></Alert>
        </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateCabangContainer);

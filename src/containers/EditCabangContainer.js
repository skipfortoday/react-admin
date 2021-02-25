import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackCabang from "../components/BackCabang";
import { connect } from "react-redux";
import FormCabangComponent from "../components/FormCabangComponent";
import { getCabangDetail, putCabangUpdate } from "../actions/cabangAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
    getOptUser: state.Opt.getOptUser,
  };
};

class EditCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
  }

  handleSubmit(data) {
    this.props.dispatch(
      putCabangUpdate(data, this.props.match.params.KodeCabang)
    );
  }

  render() {
    if (!localStorage.getItem("user")) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" />;
    }
    if (this.props.getResponDataCabang || this.props.errorResponDataCabang) {
      if (this.props.errorResponDataCabang) {
        swal("Failed!", this.props.errorResponDataCabang, "error");
      } else {
        swal(
          "Cabang Updated!",
          "Kode : " +
            this.props.getResponDataCabang.KodeCabang +
            " , Nama Cabang: " +
            this.props.getResponDataCabang.NamaCabang,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#17a2b7" }}>
          <BackCabang />
          <Container>
          <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditCabangContainer);

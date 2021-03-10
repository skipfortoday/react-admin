import React, { Component } from "react";
import { connect } from "react-redux";
import {  getOptUserManualKeluarIst } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManualIstKeluar from "../components/FormAbsensiManualIstKeluar";
import { putManualKelIstirahat } from "../actions/manualAction";
import swal from "sweetalert";

const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainerIstLuar extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUserManualKeluarIst());
  }

  handleSubmit(data) {
    this.props.dispatch(putManualKelIstirahat(data));
  }

  render() {
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen!",
          "istirahat Keluar",
          "success"
        );
      }
    }
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManualIstKeluar onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
        <h1>Menu Istirahat Keluar</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerIstLuar);
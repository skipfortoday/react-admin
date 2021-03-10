import React, { Component } from "react";
import { connect } from "react-redux";
import { getOptUserManualKembaliIst } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManualIstKembali from "../components/FormAbsensiManualIstKembali";
import swal from "sweetalert";
import { putManualKemIstirahat } from "../actions/manualAction";

const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};
class AbsensiManualContainerIstKembali extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUserManualKembaliIst());
  }
  handleSubmit(data) {
    this.props.dispatch(putManualKemIstirahat(data));
  }

  render() {
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen!",
          "Kembali Istirahat",
          "success"
        );
      }
    }
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManualIstKembali onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
        <h1>Menu Istrahat Kembali</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerIstKembali);
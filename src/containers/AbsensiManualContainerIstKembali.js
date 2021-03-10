import React, { Component } from "react";
import { connect } from "react-redux";
import { getOptUserManualKembaliIst } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManualIstKembali from "../components/FormAbsensiManualIstKembali";
import swal from "sweetalert";
import { putManualKemIstirahat } from "../actions/manualAction";
import RecentScanComponent from "../components/RecentScanComponent";
import OnDutyRoster from "../components/OnDutyRoster";
import Ambilwaktu from "../components/Ambilwaktu";

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
        <div class="header-1">
          <div class="row p-1">
            <div class="col-md-8">
              <div style={{ backgroundColor: "#fec107" }} class="p-2 mb-2">
                <h4 class="text-center mt-2 mb-2">
                  <Ambilwaktu />
                </h4>
          <Container>
        <FormAbsensiManualIstKembali onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
              <RecentScanComponent />
            </div>
            <div class="col-md-4">
              <OnDutyRoster />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerIstKembali);
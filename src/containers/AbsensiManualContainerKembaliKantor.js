import React, { Component } from "react";
import { connect } from "react-redux";
import { getOptUserManualKembali } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManualKembali from "../components/FormAbsensiManualKembali";
import { putManualKembali } from "../actions/manualAction";
import swal from "sweetalert";
import RecentScanComponent from "../components/RecentScanComponent";
import OnDutyRoster from "../components/OnDutyRoster";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminOnDuty } from "../actions/adminAction";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainerKembaliKantor extends Component {
  componentDidMount() {
    this.props.dispatch(getAdminOnDuty());
    this.props.dispatch(getOptUserManualKembali());
  }
  handleSubmit(data) {
    this.props.dispatch(putManualKembali(data));
  }

  render() {
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal("Berhasil Absen!", "Kembali Kantor", "success");
      }
      return (
        <Redirect
          to={
            "/absensimanualkembalikantor/" +
            this.props.getResponDataManual.UserID  + "/" + this.props.getResponDataManual.Nama
          }
        />
      );
    }

    return (
      <div>
        <GuestNavbarComponentManual />
        <div class="header-1">
          <div class="row p-1">
            <div class="col-md-8">
              <div style={{ backgroundColor: "#fec107" }} class="p-2 mb-2">
                <h3 class="text-center mt-2 mb-2">
                  Absen Kembali Kantor Manual
                </h3>
                <h4 class="text-center mt-2 mb-2">
                  <Ambilwaktu />
                </h4>
                <Container>
                  <FormAbsensiManualKembali
                    onSubmit={(data) => this.handleSubmit(data)}
                  />
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

export default connect(
  mapStateToProps,
  null
)(AbsensiManualContainerKembaliKantor);

import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import { getOptUserManualPulang } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManual2 from "../components/FormAbsensiManual2";
import { getAdminOnDuty, getAdminTimeNow } from "../actions/adminAction";
import { putManualPulang } from "../actions/manualAction";
import swal from "sweetalert";
import RecentScanComponent from "../components/RecentScanComponent";
import OnDutyRoster from "../components/OnDutyRoster";
import Ambilwaktu from "../components/Ambilwaktu";

const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainerPulang extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(getAdminOnDuty());
    this.props.dispatch(getOptUserManualPulang());
    // this.props.dispatch(getAdminTimeNow()); 
  }

  handleSubmit(data) {
    this.props.dispatch(putManualPulang(data));
  }

  render() {
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen Pulang!",
          "~",
          "success"
        ); setTimeout(function() {
          window.location.reload()
     }, 1000);
      }
    }
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1">
          <div class="row p-1">
            <div class="col-md-8">
              <div style={{ backgroundColor: "#fec107" }} class="p-2 mb-2">
                <h4 class="text-center mt-2 mb-2"><Ambilwaktu/></h4>
          <Container>
        <FormAbsensiManual2  onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
              <RecentScanComponent/>
            </div>
            <div class="col-md-4">
              <OnDutyRoster/>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerPulang);
import React, { Component } from "react";
import {reset} from 'redux-form';
import { connect } from "react-redux";
import { getOptUserManualPulang } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManual2 from "../components/FormAbsensiManual2";
import { getAdminOnDuty } from "../actions/adminAction";
import { putManualPulang, resetProps } from "../actions/manualAction";
import swal from "sweetalert";
import OnDutyRoster from "../components/OnDutyRoster";
import Ambilwaktu from "../components/Ambilwaktu";
import LaporanDetail2 from "../components/LaporanDetail2";
import { getLaporanList, resetLaporan } from "../actions/laporanAction";


const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainerPulang extends Component {

  constructor(props) {
    super(props);
    this.state = {disableButton : false};
  }

  componentDidMount() {
    this.props.dispatch(getAdminOnDuty());
    this.props.dispatch(getOptUserManualPulang());
    this.props.dispatch(resetLaporan())
  }

  componentDidUpdate() {
    
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal("Berhasil Absen Pulang!", "~", "success");
        this.props.dispatch(getAdminOnDuty());
        this.props.dispatch(getOptUserManualPulang());
        this.props.dispatch(getLaporanList(this.props.getResponDataManual.UserID));
        this.props.dispatch(reset('FormAbsensiManual2'));
      }
      this.setState({
        disableButton:false
      })
      this.props.dispatch(resetProps())
    }
  }

  handleSubmit(data) {
    if(!this.state.disableButton){
      this.props.dispatch(putManualPulang(data));
      this.setState({
        disableButton:true
      })
    }
  }

  render() {
    return (
      <div>
        <GuestNavbarComponentManual />
        <div class="header-1">
          <div class="row p-1">
            <div class="col-md-8">
              <div style={{ backgroundColor: "#f9a826" }} class="p-2 mb-2">
                <h3 class="text-center mt-2 mb-2">Absen Pulang Manual</h3>
                <h4 class="text-center mt-2 mb-2">
                  <Ambilwaktu />
                </h4>
                <Container>
                  <FormAbsensiManual2
                    onSubmit={(data) => this.handleSubmit(data)}
                  />
                </Container>
              </div>
              <LaporanDetail2 />
              {/* <RecentScanComponent/> */}
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

export default connect(mapStateToProps, null)(AbsensiManualContainerPulang);

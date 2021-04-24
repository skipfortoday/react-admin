import React, { Component } from "react";
import {reset} from 'redux-form';
import { connect } from "react-redux";
import { getOptUserManual } from "../actions/optAction";
import FormAbsensiManual from "../components/FormAbsensiManual";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminOnDuty } from "../actions/adminAction";
import { postManualMasuk, resetProps} from "../actions/manualAction";
import swal from "sweetalert";
import LaporanDetail2 from "../components/LaporanDetail2";
import OnDutyRoster from "../components/OnDutyRoster";
import { getLaporanHead, getLaporanList, resetLaporan } from "../actions/laporanAction";
import { getUserDetail } from "../actions/userAction";


const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {disableButton : false};
  }

  componentDidMount() {
    this.props.dispatch(getOptUserManual());
    this.props.dispatch(getAdminOnDuty());
    this.props.dispatch(resetLaporan())
  }

  componentDidUpdate() {

    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal("Berhasil Absen!", "~", "success");
        this.props.dispatch(getOptUserManual());
        this.props.dispatch(getAdminOnDuty());
        this.props.dispatch(getLaporanList(this.props.getResponDataManual.UserID));
        this.props.dispatch(getLaporanHead(this.props.getResponDataManual.UserID));
        this.props.dispatch(reset('FormAbsensiManual'));  // requires form name
      }
      this.setState({
        disableButton:false
      })
      // 
      this.props.dispatch(resetProps())
    }
    // this.props.dispatch(getAdminTimeNow());
  }

  handleSubmit(data) {
    if(!this.state.disableButton){
      this.props.dispatch(postManualMasuk(data));
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
              <h3 class="text-center mt-2 mb-2">Absen Masuk Manual</h3>
                <h4 class="text-center mt-2 mb-2">
                  <Ambilwaktu />
                </h4>
                <Container>
                  <FormAbsensiManual
                    disableButton={this.state.disableButton}
                    onSubmit={(data) => this.handleSubmit(data)}
                  />
                </Container>
              </div>
               <LaporanDetail2 /> 
              {/* <RecentScanComponent /> */}
              {/* <LaporanDetail/> */}
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

export default connect(mapStateToProps, null)(AbsensiManualContainer);

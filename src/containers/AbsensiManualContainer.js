import React, { Component } from "react";
import { connect } from "react-redux";
import { getOptUserManual } from "../actions/optAction";
import FormAbsensiManual from "../components/FormAbsensiManual";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminOnDuty, getAdminTimeNow } from "../actions/adminAction";
import { postManualMasuk } from "../actions/manualAction";
import swal from "sweetalert";
import RecentScanComponent from "../components/RecentScanComponent";
import OnDutyRoster from "../components/OnDutyRoster";
import { getLaporanList } from "../actions/laporanAction";
import { Redirect } from "react-router-dom";
import LaporanDetail2 from "../components/LaporanDetail2";


const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUserManual());
    this.props.dispatch(getAdminOnDuty());
    // this.props.dispatch(getLaporanList(this.props.match.params.id));
    // this.props.dispatch(getAdminTimeNow());
  }
  handleSubmit(data) {
    this.props.dispatch(postManualMasuk(data));
  }

  render() {

    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen!",
          "~",
          "success"
        ); return <Redirect to={"/absensimanual/"+ this.props.getResponDataManual.UserID + "/" + this.props.getResponDataManual.Nama }  />

        // setTimeout(function() {
        //     return <Redirect to="/" />
        // }, 1000);

      }
    }
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1">
          <div class="row p-1">
            <div class="col-md-8">
              <div style={{ backgroundColor: "#fec107" }} class="p-2 mb-2">
              <h3 class="text-center mt-2 mb-2">Absen Masuk Manual</h3>
                <h4 class="text-center mt-2 mb-2"><Ambilwaktu/></h4>
                
                <Container>
                  <FormAbsensiManual onSubmit={(data) => this.handleSubmit(data)}/>
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

export default connect(mapStateToProps, null)(AbsensiManualContainer);
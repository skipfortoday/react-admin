import React, { Component } from "react";
import { connect } from "react-redux";
import { getOptUserManual } from "../actions/optAction";
import FormAbsensiManual from "../components/FormAbsensiManual";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminOnDuty} from "../actions/adminAction";
import { postManualMasuk } from "../actions/manualAction";
import swal from "sweetalert";
import OnDutyRoster from "../components/OnDutyRoster";
import { getLaporanList } from "../actions/laporanAction";
import LaporanDetail2 from "../components/LaporanDetail2";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainer2 extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUserManual());
    this.props.dispatch(getAdminOnDuty());
    this.props.dispatch(getLaporanList(this.props.match.params.id));
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
        swal("Berhasil Absen!", "~", "success");

        setTimeout(function () {
          window.location.reload();
        }, 200);
        return (
          <Redirect
            to={"/absensimanual/" + this.props.getResponDataManual.UserID + "/" + this.props.getResponDataManual.Nama}
          />
        );
      }
    }
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
                    onSubmit={(data) => this.handleSubmit(data)}
                  />
                </Container>
              </div>
              <div class="card">
                <div class="card-header">
                  <h6>Daftar Absensi Pegawai | {this.props.match.params.id} ~ {this.props.match.params.nama} </h6>
                </div>
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

export default connect(mapStateToProps, null)(AbsensiManualContainer2);

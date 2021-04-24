import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserDetail, getUsersList } from "../actions/userAction";
import GuestNavbarComponent from "../components/GuestNavbarComponent";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import { getOptUser } from "../actions/optAction";
import {
  getLaporanDetail,
  getLaporanHead,
  getLaporanRekap,
} from "../actions/laporanAction";
import { Container, Row } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan from "../components/RekapLaporan";
import LaporanDetail from "../components/LaporanDetail";
import RekapLeft2 from "../components/RekapLeft2";

const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    getLaporanHead: state.Laporan.getLaporanHead,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
  };
};

class LaporanGuestContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
  }

  handleSubmit(data) {
    if (data.type == "printview") {
      this.props.dispatch(
        getLaporanDetail(data.Nama.value, data.TglAwal, data.TglAkhir)
      );
      this.props.dispatch(getLaporanHead(data.Nama.value));
      this.props.dispatch(getUserDetail(data.Nama.value));
      this.props.dispatch(
        getLaporanRekap(data.Nama.value, data.TglAwal, data.TglAkhir)
      );

      setTimeout(function () {
        window.print();
      }, 1000);
      // setTimeout
      // window.print();
    } else {
      this.props.dispatch(
        getLaporanDetail(data.Nama.value, data.TglAwal, data.TglAkhir)
      );
      this.props.dispatch(getLaporanHead(data.Nama.value));
      this.props.dispatch(getUserDetail(data.Nama.value));
      this.props.dispatch(
        getLaporanRekap(data.Nama.value, data.TglAwal, data.TglAkhir)
      );
    }
  }
  render() {
    return (
      <div>
        <GuestNavbarComponent />
        <div style={{ backgroundColor: "#f9a826" }}>
          <tr>
            <td width="150"></td>
            <td>
              <LengkapiAbsenGuestComponent
                onSubmit={(data) => this.handleSubmit(data)}
              />
            </td>
          </tr>
        </div>
        {this.props.getLaporanHead ? (
          <Container>
            <Row className="page-header">
              <NamaCabangLaporan />
              <RekapLaporan />
            </Row>
            <Row>
              <LaporanDetail />
              <RekapLeft2 />
            </Row>
          </Container>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(LaporanGuestContainer);

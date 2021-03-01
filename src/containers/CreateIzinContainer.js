import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackIzin from "../components/BackIzin";
import FormIzinComponent from "../components/FormIzinComponent";
import { connect } from "react-redux";
import {
  getIzinDetail,
  getIzinListSolo,
  postIzinCreate,
  deleteDataIzin,
} from "../actions/izinAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton from "../components/LengkapiAbsenButton";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import LaporanDetail from "../components/LaporanDetail";
import RekapLaporan from "../components/RekapLaporan";
import {
  getLaporanDetail,
  getLaporanRekap,
  getLaporanHead,
} from "../actions/laporanAction";
import { getUserDetail } from "../actions/userAction";
import IzinComponentSolo from "../components/IzinComponentSolo";
import RekapLeft from "../components/RekapLeft";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import PrintButton from "../components/PrintButton";
import { postLaporanProses } from "../actions/laporanAction";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorLaporanDetail : state.Laporan.errorLaporanDetail,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    errorResponDataLaporan: state.Laporan.errorResponDataLaporan,
    getLaporanList: state.Laporan.getLaporanList,
    getExpandKey: state.Laporan.getExpandKey,
    errorLaporanList: state.Laporan.errorLaporanList,
  };
};

class CreateIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getIzinDetail(this.props.match.params.UserID));
    this.props.dispatch(
      getLaporanDetail(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );
    this.props.dispatch(
      getLaporanRekap(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );

    this.props.dispatch(getLaporanHead(this.props.match.params.UserID));
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
    this.props.dispatch(
      getIzinListSolo(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );
    this.props.dispatch(deleteDataIzin());
  }

  handleSubmit(data) {
    this.props.dispatch(postIzinCreate(data));
  }
  handleSubmit2(data) {
    this.props.dispatch(postLaporanProses(data));
  }

  render() {
    if (this.props.errorLaporanDetail) {
      swal("Failed!", "Gaada Data Bosq / Silahkan Coba lagi", "error");
      return <Redirect to="/izin" /> ;
    } 

    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')|| ambil.Login == "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
      if (this.props.errorResponDataIzin) {
        swal("Failed!", this.props.errorResponDataIzin, "error");
      } else {
        window.location.reload();
        swal(
          "Izin Created!",
          " | ID : " +
            this.props.getResponDataIzin.UserID +
            "  |  Tanggal :  " +
            this.props.getResponDataIzin.TanggalScan +
            "  |   Status :  " +
            this.props.getResponDataIzin.Status +
            "  |  Keterangan :       " +
            this.props.getResponDataIzin.Keterangan,
          "success"
        );
      }
    }
    if (this.props.getResponDataLaporan || this.props.errorResponDataLaporan) {
      if (this.props.errorResponDataLaporan) {
        swal("Failed!", this.props.errorResponDataLaporan, "error");
      } else {
        swal(
          "Proses Berhasil!",
          "Nama : " +
            this.props.getResponDataLaporan.Nama +
            " | ID : " +
            this.props.getResponDataLaporan.UserID,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <BackIzin />

          <tr>
            <td width="60"></td>
            <td>
              <LengkapiAbsen onSubmit={(data) => this.handleSubmit2(data)} />
            </td>
            <td width="10"></td>
            <td>
              <tr>
                <td width="100">.</td>
              </tr>
              <tr>
                <LengkapiAbsenButton />
              </tr>
            </td>
          </tr>
        </div>
        <div  class="header-1"style={{ backgroundColor: "#17a2b7" }}>
          <Container>
            <FormIzinComponent onSubmit={(data) => this.handleSubmit(data)} />
          </Container>
        </div>
        <div class="header-1">
        <IzinComponentSolo /></div>
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
          <Row>
         <h3>Print Preview</h3> <PrintButton />
        </Row>
        </Container>
        </div>
        <Container>
        <Row className="page-header">
          <NamaCabangLaporan />
          <RekapLaporan />
          </Row>
          <Row>
          <LaporanDetail />
          <RekapLeft />
        </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinContainer);

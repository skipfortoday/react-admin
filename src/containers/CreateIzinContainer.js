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
    errorResponDataIzin: state.Izin.errorResponDataIzin,
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    errorResponDataLaporan: state.Laporan.errorResponDataLaporan,
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
    if (!localStorage.getItem("user")) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" />;
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
        <Row>
          <Col md={1}>
            <BackIzin />
          </Col>
          <Col md={11}>
            <Alert color="info">
              <h4>Menu Lengkapi Absen</h4>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={9}>
            <Alert color="info">
              <LengkapiAbsen onSubmit={(data) => this.handleSubmit2(data)} />
            </Alert>
          </Col>
          <Col md={1}>
            <LengkapiAbsenButton />
          </Col>
        </Row>
        <Alert color="info">
          <FormIzinComponent onSubmit={(data) => this.handleSubmit(data)} />
          <IzinComponentSolo />
        </Alert>
        <PrintButton />
        <Row className="page-header">
          <NamaCabangLaporan />
          <RekapLaporan />
        </Row>
        <Row>
          <LaporanDetail />
          <RekapLeft />
        </Row>
        <Alert color="info"></Alert>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinContainer);

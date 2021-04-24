import React, { Component } from "react";
import IzinComponent from "../components/IzinComponent";
import swal from "sweetalert";
import { connect } from "react-redux";
import {
  getIzinList,
  deleteDataIzin,
  getIzinListSolo,
  getIzinDetail,
  putIzinUpdate,
  postIzinCreate,
  resetResponseDataIzin,
} from "../actions/izinAction";
import NavbarComponent from "../components/NavbarComponent";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import {
  getLaporanDetail,
  getLaporanHead,
  getLaporanRekap,
  postLaporanProses,
  resetLaporanRespon,
  resetLaporan,
} from "../actions/laporanAction";
import { Redirect } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import { getUserDetail } from "../actions/userAction";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan from "../components/RekapLaporan";
import LaporanDetail from "../components/LaporanDetail";
import RekapLeft from "../components/RekapLeft";
import IzinComponentSolo from "../components/IzinComponentSolo";
import FormIzinComponent from "../components/FormIzinComponent";
import PrintButton from "../components/PrintButton";
import { reset } from "redux-form";

const mapStateToProps = (state) => {
  return {
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    errorResponDataLaporan: state.Laporan.errorResponDataLaporan,
    getLaporanDetail: state.Laporan.getLaporanDetail,
    getLaporanHead: state.Laporan.getLaporanHead,
    getResponDataIzin: state.Izin.getResponDataIzin,
    tglAwal: state.form.formLengkapiAbsen
      ? state.form.formLengkapiAbsen.values.TglAwal
      : "",
    tglAkhir: state.form.formLengkapiAbsen
      ? state.form.formLengkapiAbsen.values.TglAkhir
      : "",
    userID: state.form.formLengkapiAbsen
      ? state.form.formLengkapiAbsen.values.Nama.value
      : "",
  };
};

class IzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
    this.props.dispatch(getOptUser());
    this.props.dispatch(resetLaporan());
  }

  handleSubmit2(data) {
    // console.log(data);
    const ambil = JSON.parse(localStorage.getItem("user"));

    data.ADMIN = ambil.AdminID;
    if (!data.DatangID) {
      // create
      // console.log(data);
      this.props.dispatch(postIzinCreate(data));
    } else {
      //put
      //console.log(data);
      this.props.dispatch(putIzinUpdate(data, data.DatangID));
    }
    this.props.dispatch(reset("formCreateizin")); // requires form name
  }

  componentDidUpdate() {
    if (this.props.getResponDataIzin) {
      // dispatch
      this.props.dispatch(
        getIzinListSolo(
          this.props.userID,
          this.props.tglAwal,
          this.props.tglAkhir
        )
      );
      // delete
      this.props.dispatch(resetResponseDataIzin());
    }

    if (this.props.getResponDataLaporan || this.props.errorResponDataLaporan) {
      if (this.props.errorResponDataLaporan) {
        swal("Failed!", this.props.errorResponDataLaporan, "error");
      } else {
        swal(
          "Proses Berhasil!",
          "",
          "success"
        );
      } 
      this.props.dispatch(
        getIzinListSolo(
          this.props.userID,
          this.props.tglAwal,
          this.props.tglAkhir
        )
      );
      this.props.dispatch(resetLaporanRespon());
    }
  }

  handleSubmit(data) {
    if (data.type == "proses") {
      swal({
        title: "Otomatis lengkapi absen?",
        text:
          "Periksa dulu tanggal awal : " +
          data.TglAwal +
          " dan tanggal akhir : " +
          data.TglAkhir +
          ". Anda setuju?",
        icon: "warning",
        buttons: {
          defeat: {
            text: "Ya",
            value: "ok",
          },
          cancel: "Tidak",
        },
      }).then((willDelete) => {
        if (willDelete) {
          this.props.dispatch(postLaporanProses(data));
        } else {
          //swal("Your imaginary file is safe!");
        }
      });
    } else {
      this.props.dispatch(
        getLaporanDetail(data.Nama.value, data.TglAwal, data.TglAkhir)
      );
      this.props.dispatch(getLaporanHead(data.Nama.value));
      this.props.dispatch(getUserDetail(data.Nama.value));
      this.props.dispatch(
        getLaporanRekap(data.Nama.value, data.TglAwal, data.TglAkhir)
      );
      this.props.dispatch(
        getIzinListSolo(data.Nama.value, data.TglAwal, data.TglAkhir)
      );
      this.props.dispatch(
        getIzinDetail(data.Nama.value, data.TglAwal, data.TglAkhir)
      );
    }
  }

  render() {
    if (
      !localStorage.getItem("user") ||
      localStorage.getItem("user") === "false"
    ) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
    }

    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#f9a826" }}>
          <Container>
            <Row>
              <Col md="12">
                <LengkapiAbsen onSubmit={(data) => this.handleSubmit(data)} />
              </Col>
              {/* <Col md="2">
                <LengkapiAbsenButton />
              </Col> */}
            </Row>
          </Container>
        </div>
        {this.props.getLaporanHead ? (
          <div>
            <div class="header-1" style={{ padding: "10px 20px" }}>
              <div className="row">
                <div className="col-lg-8">
                  <IzinComponentSolo />
                </div>
                <div className="col-lg-4">
                  <div style={{ background: "#17a2b7", padding: "0px 10px" }}>
                    <FormIzinComponent
                      onSubmit={(data) => this.handleSubmit2(data)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="header-1" style={{ backgroundColor: "#f9a826" }}>
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
        ) : (
          <IzinComponent />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(IzinContainer);

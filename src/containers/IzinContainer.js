import React, { Component } from "react";
import swal from "sweetalert";
import { connect } from "react-redux";
import {
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
  postLaporanProses,
  resetLaporanRespon,
  resetLaporan,
  setLoading,
  checkBelumPulangToday,
} from "../actions/laporanAction";
import { Redirect } from "react-router-dom";
import { Row, Col, Container, Modal } from "reactstrap";
import { getUserDetail } from "../actions/userAction";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan from "../components/RekapLaporan";
import LaporanDetail from "../components/LaporanDetail";
import SummaryLaporan from "../components/SummaryLaporan";
import IzinComponentSolo from "../components/IzinComponentSolo";
import FormIzinComponent from "../components/FormIzinComponent";
import PrintButton from "../components/PrintButton";
import { reset } from "redux-form";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapStateToProps = (state) => {
  return {
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    errorResponDataLaporan: state.Laporan.errorResponDataLaporan,
    getLaporanDetail: state.Laporan.getLaporanDetail,
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

    isLoading: state.Laporan.isLoading,
    checkBelumPulang: state.Laporan.checkBelumPulang
  };
};

class IzinContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      progress:false,
    }
  }

  componentDidMount() {
    this.props.dispatch(resetLaporan());
    this.props.dispatch(getOptUser());
  }

  componentWillUnmount() {
    this.props.dispatch(getIzinListSolo());
    this.props.dispatch(resetLaporan());
    this.props.dispatch(getUserDetail());
    this.props.dispatch(getIzinDetail());
    this.props.dispatch(reset("formCreateizin"));
    this.props.dispatch(reset("formLengkapiAbsen"));
    this.props.dispatch(getOptUser(true));
  }

  handleSubmit2(data) {
    const ambil = JSON.parse(localStorage.getItem("user"));

    data.ADMIN = ambil.AdminID;
    this.props.dispatch(setLoading(true));
    this.props.dispatch(resetLaporan());

    if (!data.DatangID) {
      // create
      this.props.dispatch(postIzinCreate(data));
    } else {
      //put
      this.props.dispatch(putIzinUpdate(data, data.DatangID));
    }
    this.props.dispatch(reset("formCreateizin")); // requires form name
  }

  handleSubmit(data) {
    this.setState({
      ...this.state,
      data: data
    })

    let d = new Date();
    let d1 = new Date(data.TglAkhir);
    let xday = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
    let now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    if (data.type == "proses") {
      if (now == xday) {
        this.props.dispatch(checkBelumPulangToday([{UserID:data.Nama.value}]))
      } else {
        this.processAbsensi()
      }

    } else {
      this.props.dispatch(resetLaporan());
      this.props.dispatch(getUserDetail(data.Nama.value));
      this.props.dispatch(getLaporanDetail(data.Nama.value, data.TglAwal, data.TglAkhir));
      this.props.dispatch(getIzinListSolo(data.Nama.value, data.TglAwal, data.TglAkhir));
      this.props.dispatch(getIzinDetail(data.Nama.value, data.TglAwal, data.TglAkhir));
      this.props.dispatch(setLoading(true));
    }

  }

  processAbsensi() {
    if(this.state.data == null) return;
    if(this.state.progress) return;
    swal({
      title: "Otomatis lengkapi absen?",
      text:
        "Periksa dulu tanggal awal : " + this.state.data.TglAwal +
        " dan tanggal akhir : " + this.state.data.TglAkhir + ". Anda setuju?",
      icon: "warning",
      buttons: {
        defeat: {
          text: "Ya",
          value: "ok",
        },
        cancel: "Tidak",
      },
    }).then((ok) => {
      if (ok) {
        this.setState({
          ...this.state,
          progress:true
        }, ()=>{
          this.props.dispatch(resetLaporan());
          this.props.dispatch(getUserDetail(this.state.data.Nama.value));
          this.props.dispatch(postLaporanProses(this.state.data));
          this.props.dispatch(setLoading(true));
        })
        // setTimeout(() => {
          
        // }, 10);

      }else{
        this.setState({
          ...this.state,
          data:null,
          progress:false
        })
      }
    });

  }

  componentDidUpdate() {
    if (this.props.getResponDataIzin) {

      //this.props.dispatch(setLoading(false))
      this.props.dispatch(resetResponseDataIzin());
      this.refreshUi();
    }
    // console.log(this.state.data)
    if(this.state.data && this.state.data.type == 'proses' && this.state.progress == false){

      if (this.props.checkBelumPulang.status == true) {
        swal({
          title: "Data hari ini belum lengkap",
          text: this.props.checkBelumPulang.message,
          icon: "warning",
          buttons: {
            defeat: {
              text: "Ya",
              value: "ok",
            },
            cancel: "Tidak",
          },
        }).then((yes) => {
          if (yes) this.processAbsensi()
          else {
            this.setState({
              ...this.state,
              data:null,
              progress:false
            })
            this.props.dispatch(checkBelumPulangToday())
          }
        });
        
      }else{
        
        this.processAbsensi()
      }
    }

    if (this.props.errorResponDataLaporan) {
      swal("Failed!", this.props.errorResponDataLaporan, "error");
      this.props.dispatch(resetLaporanRespon());
      this.props.dispatch(setLoading(false))
    }

    if (this.props.getResponDataLaporan) {
      swal(
        "Proses Berhasil!",
        "",
        "success"
      );
      this.props.dispatch(setLoading(false))
      this.props.dispatch(resetLaporanRespon());
      this.refreshUi();
      this.props.dispatch(checkBelumPulangToday());
      this.setState({
        ...this.state,
        data:null,
        progress:false
      })
    }
  }

  refreshUi = () => {

    this.props.dispatch(
      getIzinListSolo(
        this.props.userID,
        this.props.tglAwal,
        this.props.tglAkhir
      )
    );
    this.props.dispatch(getLaporanDetail(
      this.props.userID,
      this.props.tglAwal,
      this.props.tglAkhir));
  }

  render() {
    if (
      !localStorage.getItem("user") ||
      localStorage.getItem("user") === "false"
    ) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
    }

    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    if (this.props.getLaporanDetail && this.props.isLoading) {
      this.props.dispatch(setLoading(false))
    }

    return (
      <div style={{ minHeight: 900 }}>
        <Modal
          isOpen={this.props.isLoading}
          backdropTransition={{ timeout: 0 }}
          modalTransition={{ timeout: 0 }}
          fade={false}
          className="modal-lg custom-modal"
          centered={true} style={{ textAlign: "center" }}>
          {/* #00BFFF */}
          <Loader
            type="Oval"
            color="#FFF"
            height={60}
            width={60}
          />
        </Modal>
        <NavbarComponent />
        <div style={{ backgroundColor: "#f9a826" }}>
          <Container>
            <Row>
              <Col md="12">
                <LengkapiAbsen onSubmit={(data) => this.handleSubmit(data)} />
              </Col>
            </Row>
          </Container>
        </div>
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
          {this.props.getLaporanDetail ? (
            this.props.getLaporanDetail.body ? (
              <div>
                <div class="header-1" style={{ backgroundColor: "#f9a826", paddingTop: 5 }}>
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
                    <SummaryLaporan />
                  </Row>
                </Container>
              </div>
            ) : ("")
          ) : ("")}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(IzinContainer);
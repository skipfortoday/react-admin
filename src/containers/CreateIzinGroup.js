import React, { Component } from "react";
import { Container, Modal } from "reactstrap";
import BackIzin from "../components/BackIzin";
import { connect } from "react-redux";
import { deleteDataIzin, getIzinList, postIzinGroup, resetResponseDataIzin, setOnSubmitting } from "../actions/izinAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import FormIzinGroup from "../components/FormIzinGroup";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import swal2 from "@sweetalert/with-react"
import { checkBelumPulangToday, postLaporanProses, resetLaporan, resetLaporanRespon } from "../actions/laporanAction";
import IzinComponent from "../components/IzinComponent";
import { reset } from "redux-form";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    isOnSubmitting: state.Izin.isOnSubmitting,
    checkBelumPulang: state.Laporan.checkBelumPulang
  };
};

class CreateIzinGroup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      progress:false
    }
  }

  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
  }

  handleSubmit(data) {

    if (this.props.isOnSubmitting) return;
    if (data.Status.value === 'LENGKAPI') {
      this.setState({
        ...this.state,
        data: data
      }, () => {

        let d = new Date();
        let d1 = new Date(data.TanggalScanSampai);
        let xday = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
        let now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

        let UserIDs = [];
        data.Nama.map((item) => {
          UserIDs.push({ UserID: item.value });
        })

        if (now == xday) {
          this.props.dispatch(checkBelumPulangToday(UserIDs))
        } else {
          this.processAbsensi()
        }

      })


    } else {
      // console.log(data);
      this.props.dispatch(setOnSubmitting(true));
      this.props.dispatch(postIzinGroup(data));
    }
  }

  processAbsensi() {
    if (this.state.data == null) return;
    if (this.state.progress) return;
    swal({
      // closeOnClickOutside: false,
      title: "Otomatis lengkapi absen?",
      text:
        "Periksa dulu tanggal awal : " +
        this.state.data.TanggalScan +
        " dan tanggal akhir : " +
        this.state.data.TanggalScanSampai +
        ". Anda setuju?",
      icon: "warning",
      buttons: {
        defeat: {
          text: "Ya",
          value: "ok",
        },
        cancel: "Tidak",
      },
    }).then((yes) => {
      if (yes) {
        this.setState({
          ...this.state,
          progress: true
        }, () => {
          this.props.dispatch(setOnSubmitting(true));
          this.props.dispatch(postLaporanProses(this.state.data));
        })
      } else {
        this.setState({
          ...this.state,
          data: null,
        })
      }
    });
  }

  componentDidUpdate() {
    if (this.state.data && this.state.data.Status.value === 'LENGKAPI') {
      
      if (this.props.checkBelumPulang.status == true && this.state.progress == false) {
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
              data: null,
              progress: false
            })
            this.props.dispatch(checkBelumPulangToday())
          }
        });

      } else {

        this.processAbsensi()
      }
    }


    // handle alert response izin
    if (this.props.getResponDataIzin) {
      var title = this.props.getResponDataIzin.successCount + " berhasil. ";
      var msg = "";
      if (this.props.getResponDataIzin.failCount > 0) {
        title += this.props.getResponDataIzin.failCount + " gagal";
        msg = this.props.getResponDataIzin.failCount + " sudah ada : " + this.props.getResponDataIzin.failMessage
      }
      this.props.dispatch(setOnSubmitting(false));
      swal(title, msg, "success");
      this.props.dispatch(reset("formCreateizin"));
      //console.log(this.props.getResponDataLaporan)
      this.props.dispatch(resetResponseDataIzin());
      //console.log(this.props.getResponDataLaporan)
    }

    //handle alert response lengkapi absen
    if (this.props.getResponDataLaporan) {
      var title = this.props.getResponDataLaporan.successCount + " proses berhasil. ";
      var msg = JSON.stringify(this.props.getResponDataLaporan);
      if (this.props.getResponDataLaporan.failCount > 0) {
        title += this.props.getResponDataLaporan.failCount + " proses gagal";
      }
      this.props.dispatch(setOnSubmitting(false));
      swal(title, msg, "success");
      this.props.dispatch(reset("formCreateizin"));
      //console.log(this.props.getResponDataLaporan)
      this.props.dispatch(resetLaporanRespon());
      //console.log(this.props.getResponDataLaporan)
      this.props.dispatch(checkBelumPulangToday());
      this.setState({
        ...this.state,
        data: null,
        progress: false
      })
    }
  }


  render() {
    if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
    }


    return (
      <div>
        <Modal
          isOpen={this.props.isOnSubmitting}
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
        <div style={{ backgroundColor: '#f9a826' }}>
          {/* <BackIzin></BackIzin> */}
          <Container>
            <FormIzinGroup onSubmit={(data) => this.handleSubmit(data)} />
          </Container>
        </div>
        <IzinComponent />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinGroup);
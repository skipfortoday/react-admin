import React, { Component } from "react";
import { Container } from "reactstrap";
import BackIzin from "../components/BackIzin";
import { connect } from "react-redux";
import { deleteDataIzin, getIzinList, postIzinGroup, resetResponseDataIzin, setOnSubmitting } from "../actions/izinAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import FormIzinGroup from "../components/FormIzinGroup";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import swal2 from "@sweetalert/with-react"
import { postLaporanProses, resetLaporan, resetLaporanRespon } from "../actions/laporanAction";
import IzinComponent from "../components/IzinComponent";
import { reset } from "redux-form";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    isOnSubmitting:state.Izin.isOnSubmitting
  };
};

class CreateIzinGroup extends Component {

  constructor(props){
    super(props);
    this.state = {
      submitting:false
    }
  }

  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
  }

  handleSubmit(data) {
    if(this.props.isOnSubmitting) return;
    if (data.Status.value === 'LENGKAPI') {
      swal({
        // closeOnClickOutside: false,
        title: "Otomatis lengkapi absen?",
        text:
          "Periksa dulu tanggal awal : " +
          data.TanggalScan +
          " dan tanggal akhir : " +
          data.TanggalScanSampai +
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
          this.props.dispatch(setOnSubmitting(true));
          this.props.dispatch(postLaporanProses(data));
        }
      });
    } else {
      // console.log(data);
      this.props.dispatch(setOnSubmitting(true));
      this.props.dispatch(postIzinGroup(data));
    }
  }

  componentDidUpdate() {
    // handle alert response izin
    if (this.props.getResponDataIzin) {
      var title = this.props.getResponDataIzin.successCount + " berhasil. ";
      var msg = "";
      if (this.props.getResponDataIzin.failCount > 0){
        title += this.props.getResponDataIzin.failCount + " gagal";
        msg = this.props.getResponDataIzin.failCount+" sudah ada : "+ this.props.getResponDataIzin.failMessage
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
      if (this.props.getResponDataLaporan.failCount > 0){
        title += this.props.getResponDataLaporan.failCount + " proses gagal";
      }
      this.props.dispatch(setOnSubmitting(false));
      swal(title, msg, "success");
      this.props.dispatch(reset("formCreateizin"));
      //console.log(this.props.getResponDataLaporan)
      this.props.dispatch(resetLaporanRespon());
      //console.log(this.props.getResponDataLaporan)
    }
  }
  
  
  render() {
    
    if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
    }
    // if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
    //   if (this.props.errorResponDataIzin) {
    //     swal("Failed!", this.props.errorResponDataIzin, "error");
    //   } else {
    //     swal2(
    //       <div>
    //         {
    //           this.props.getResponDataIzin.responeSudahAda &&
    //             this.props.getResponDataIzin.responeSudahAda.length > 0 ? (
    //             <div>
    //               <h4>Sukses...</h4>
    //               <h6 style={{ textAlign: "left" }}>Data yang gagal : </h6>
    //               <ul style={{ padding: "0", margin: "0 0 0 10px", textAlign: "left" }}>
    //                 {
    //                   this.props.getResponDataIzin.responeSudahAda.map(function (item) {
    //                     return (
    //                       <li>{item}</li>
    //                     )
    //                   })
    //                 }
    //               </ul>
    //             </div>
    //           ) : ("Sukses")
    //         }
    //       </div>
    //       //JSON.stringify(this.props.getResponDataIzin.responeSudahAda) ,

    //     ).then(() => {
    //       this.props.dispatch(getIzinList());
    //       this.props.dispatch(reset("formCreateizin"));
    //     });
    //     this.setState({
    //       ...this.state,
    //       submitting:false
    //     })
    //   }
    // }

    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#f9a826' }}>
          <BackIzin></BackIzin>
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

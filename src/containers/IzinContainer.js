import React, { Component } from "react";
import IzinComponent from "../components/IzinComponent";
import swal from "sweetalert";
import { connect } from "react-redux";
import { getIzinList, deleteDataIzin } from "../actions/izinAction";
import NavbarComponent from "../components/NavbarComponent";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import { postLaporanProses } from "../actions/laporanAction";
import { Redirect } from "react-router-dom";
import { Row, Col, Container } from "reactstrap"

const mapStateToProps = (state) => {
  return {
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    errorResponDataLaporan: state.Laporan.errorResponDataLaporan,
  };
};

class IzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    swal({
      title:"Otomatis lengkapi absen?",
      text: "Periksa dulu tanggal awal : "+ data.TglAwal + " dan tanggal akhir : "+ data.TglAkhir +". Anda setuju?" ,
      icon: "warning",
      buttons: {
        defeat: {
          text:"Ya",
          value:"ok"
        },
        cancel: "Tidak"
      },
    })
    .then((value) => {
      switch (value) {
     
        case "ok":
          // swal("Prosess");
          this.props.dispatch(postLaporanProses(data));
          break;
     
        case "catch":
          break;
     
        default:
          //swal("Got away safely!");
      }
    });
    //this.props.dispatch(postLaporanProses(data));
  }

  render() {
    if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
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
        <div style={{ backgroundColor: '#f9a826' }} >
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

        <IzinComponent />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(IzinContainer);

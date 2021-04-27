import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import FormCekKelengkapanAbsensi from "../components/FormCekKelengkapanAbsensi";
import KelengkapanAbsenComponent from "../components/KelengkapanAbsenComponent";
import { Col, Container, Row, Spinner } from "reactstrap";
import { getKelengkapanAbsen, setLoading } from "../actions/laporanAction";
import { siteConfig } from "../config";


const mapStateToProps = (state) => {
  return {
    getLaporanKelengkapan: state.Laporan.getLaporanKelengkapan,
    errorLaporanKelengkapan: state.Laporan.errorLaporanKelengkapan,
    isLoading:state.Laporan.isLoading
  };
};

class KelengkapanAbsenContainer extends Component {

  handleSubmit(data) {
    this.props.dispatch(getKelengkapanAbsen(siteConfig.kodeCabang, data.TanggalScan, data.TanggalScanSampai));
    this.props.dispatch(setLoading(true));
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user') || ambil.Login === "false") {
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
                <FormCekKelengkapanAbsensi onSubmit={(data) => this.handleSubmit(data)} />
              </Col>
            </Row>
          </Container>
        </div>
        {this.props.isLoading ? (
          <div style={{textAlign:"center", padding:"50px 0px"}}>
            <Spinner />
          </div>
        ) : (<KelengkapanAbsenComponent />) }
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(KelengkapanAbsenContainer);

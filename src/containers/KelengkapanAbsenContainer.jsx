import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import FormCekKelengkapanAbsensi from "../components/FormCekKelengkapanAbsensi";
import KelengkapanAbsenComponent from "../components/KelengkapanAbsenComponent";
import { Col, Container, Row, Modal } from "reactstrap";
import { getKelengkapanAbsen, setLoading } from "../actions/laporanAction";
import { siteConfig } from "../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { getOptUser } from "../actions/optAction";

const mapStateToProps = (state) => {
  return {
    getLaporanKelengkapan: state.Laporan.getLaporanKelengkapan,
    errorLaporanKelengkapan: state.Laporan.errorLaporanKelengkapan,
    isLoading:state.Laporan.isLoading
  };
};

class KelengkapanAbsenContainer extends Component {

  handleSubmit(data) {
    data.Nama = data.Nama.value;
    this.props.dispatch(getKelengkapanAbsen(siteConfig.kodeCabang, data.TanggalScan, data.TanggalScanSampai, data.Nama));
    this.props.dispatch(setLoading(true));
  }

  componentDidMount(){
    this.props.dispatch(getOptUser());
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
        {this.props.isLoading ? (
          ''
        ) : (<KelengkapanAbsenComponent />) }
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(KelengkapanAbsenContainer);

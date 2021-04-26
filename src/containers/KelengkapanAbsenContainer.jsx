import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";
import FormCekKelengkapanAbsensi from "../components/FormCekKelengkapanAbsensi";
import KelengkapanAbsenComponent from "../components/KelengkapanAbsenComponent";
import { Col, Container, Row } from "reactstrap";
import { getKelengkapanAbsen } from "../actions/laporanAction";


class KelengkapanAbsenContainer extends Component {
handleSubmit(data){
    this.props.dispatch(getKelengkapanAbsen(data.TanggalScan,data.TangggalScanSampai));
}
  

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
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
              {/* <Col md="2">
                <LengkapiAbsenButton />
              </Col> */}
            </Row>
          </Container>
        </div>
        <KelengkapanAbsenComponent/>
      </div>
    );
  }
}

export default connect()(KelengkapanAbsenContainer);
import React, { Component } from "react";
import LaporanComponent from "../components/LaporanComponent";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getLaporanList } from "../actions/laporanAction";
import InfoHomePegawai from "../components/InfoHomePegawai";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";
import BackLaporan from "../components/BackLaporan";

class LaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanList(this.props.match.params.UserID));
  }

  render() {
    return (
      <Container>
        <NavbarComponent/>
        <Row>
         <Col md={1}>
          <BackLaporan/>
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Detail Laporan</h4>
          </Alert>
          </Col>
        </Row>
        <LaporanComponent />
        <RekapLaporan/>
      </Container>
    );
  }
}

export default connect()(LaporanContainer);

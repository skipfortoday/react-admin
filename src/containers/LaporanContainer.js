import React, { Component } from "react";
import LaporanComponent from "../components/LaporanComponent";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { getLaporanList } from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";
import BackLaporan from "../components/BackLaporan";
import FormLaporan from "../components/FormLaporan";

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
          <FormLaporan/>
        </Row>
        <LaporanComponent />
        <RekapLaporan/>
      </Container>
    );
  }
}

export default connect()(LaporanContainer);

import React, { Component } from "react";
import LaporanComponent from "../components/LaporanComponent";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { getLaporanDetail, getLaporanList} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";
import BackLaporan from "../components/BackLaporan";
import FormLaporan from "../components/FormLaporan";
import { getUserDetail } from "../actions/userAction";
import CetakComponent from "../components/CetakComponent";

class LaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanList(this.props.match.params.UserID));
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  handleSubmit(data) {
    this.props.dispatch(getLaporanDetail(data, this.props.match.params.UserID));
    this.props.dispatch(getLaporanDetail(data, this.props.match.params.TglAwal));
    this.props.dispatch(getLaporanDetail(data, this.props.match.params.TglAkhir));
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
           <h4 >Detail Scan</h4>
          </Alert>
          </Col>
          <FormLaporan/>
        </Row>
        <CetakComponent/>
        <RekapLaporan/>
        <LaporanComponent />

      </Container>
    );
  }
}

export default connect()(LaporanContainer);

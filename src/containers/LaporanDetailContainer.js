import React, { Component } from "react";
import LaporanDetail from "../components/LaporanDetail";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { getLaporanDetail} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";
import BackLaporan from "../components/BackLaporan";
import { getUserDetail } from "../actions/userAction";

class LaporanDetailContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanDetail(this.props.match.params.UserID, this.props.match.params.TglAwal,this.props.match.params.TglAkhir));
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
    
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
           <h4 >Laporan Pertanggal</h4>
          </Alert>
          </Col>
        </Row>
        <RekapLaporan/>
        <LaporanDetail/>

      </Container>
    );
  }
}

export default connect()(LaporanDetailContainer);

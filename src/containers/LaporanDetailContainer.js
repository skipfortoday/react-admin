import React, { Component } from "react";
import LaporanDetail from "../components/LaporanDetail";
import { Container, Alert, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { getLaporanDetail, getLaporanHead, getLaporanRekap} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";
import BackLaporan from "../components/BackLaporan";
import { getUserDetail } from "../actions/userAction";
import PrintButton from "../components/PrintButton";
import RekapLeft from "../components/RekapLeft";
import NamaCabangLaporan from "../components/NamaCabangLaporan";

class LaporanDetailContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanDetail(this.props.match.params.UserID, this.props.match.params.TglAwal,this.props.match.params.TglAkhir));
    this.props.dispatch(getLaporanRekap(this.props.match.params.UserID, this.props.match.params.TglAwal,this.props.match.params.TglAkhir));
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
    this.props.dispatch(getLaporanHead(this.props.match.params.UserID));
    
  }

  render() {
    return (
      <Container>
        <NavbarComponent/>
        <Row>
         <Col md={1}>
          <BackLaporan/>
          
         </Col>
         <Col md={10}>
          <Alert color="warning" >
           <h4 >Rincian Laporan</h4>
          </Alert>
          </Col>
          <Col md={1}>
            <PrintButton/>
          </Col>
        </Row>
        <NamaCabangLaporan />
        <RekapLaporan/>
        <LaporanDetail/>
        <RekapLeft/>
      </Container>
    );
  }
}

export default connect()(LaporanDetailContainer);

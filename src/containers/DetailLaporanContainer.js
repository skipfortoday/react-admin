import React, { Component } from "react";
import { Container,Row,Alert,Col } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import InfoMenuPegawai from "../components/InfoMenuPegawai";
import { getLaporanDetail } from "../actions/laporanAction";
import DetailLaporanComponent from "../components/DetailLaporanComponent";

class DetailLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanDetail(this.props.match.params.UserID));
    this.props.dispatch(getLaporanDetail(this.props.match.params.TglIn));
    this.props.dispatch(getLaporanDetail(this.props.match.params.TglOut));
  }

  render() {
    return (
      <Container>
        <Row>
         <Col md={1}>
          <BackComponent/>
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Detail Laporan</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuPegawai/>
        <Alert color="warning" ></Alert>        
        <h4>Table Laporan Pegawai</h4>
        <DetailLaporanComponent />
        <Alert color="warning" ></Alert> 
  
      </Container>
    );
  }
}

export default connect()(DetailLaporanContainer);

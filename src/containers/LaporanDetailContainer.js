import React, { Component } from "react";
import LaporanDetail from "../components/LaporanDetail";
import { Container, Alert, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import {
  getLaporanDetail,
  getLaporanHead,
  getLaporanRekap,
} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";
import BackLaporan from "../components/BackLaporan";
import { getUserDetail } from "../actions/userAction";
import PrintButton from "../components/PrintButton";
import RekapLeft from "../components/RekapLeft";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import LengkapiAbsenButton2 from "../components/LengkapiAbsenButton2";
import { getOptUser } from "../actions/optAction";

class LaporanDetailContainer extends Component {
  componentDidMount() {
    this.props.dispatch(
      getLaporanDetail(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );
    this.props.dispatch(
      getLaporanRekap(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
    this.props.dispatch(getLaporanHead(this.props.match.params.UserID));
    this.props.dispatch(getOptUser());
  }

  render() {
    return (
     <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#fec107" }}>
          <tr>
            <td width="150"></td>
            <td>
              <LengkapiAbsenGuestComponent onSubmit={(data) => this.handleSubmit2(data)} />
            </td>
            <td>
              <tr>
                <td width="20">.</td>
              </tr>
              <tr>
                <LengkapiAbsenButton2 />
                <PrintButton /> 
              </tr>
            </td>
          </tr>
        </div>
          
          <Container>
        <Row className="page-header">
          <NamaCabangLaporan />
          <RekapLaporan />
        </Row>
        <Row>
          <LaporanDetail />
          <RekapLeft />
        </Row>
        </Container>
      </div>
    );
  }
}

export default connect()(LaporanDetailContainer);

import React, { Component } from "react";
import LaporanDetail from "../components/LaporanDetail";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import {
  getLaporanDetail,
  getLaporanHead,
  getLaporanRekap,
} from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";
import { getUserDetail } from "../actions/userAction";
import PrintButton from "../components/PrintButton";
import RekapLeft from "../components/RekapLeft";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import LengkapiAbsenButton2 from "../components/LengkapiAbsenButton2";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
  };
};

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
    if (this.props.errorLaporanDetail) {
      swal("Failed!", "Tidak Ada Data / Silahkan Coba lagi", "error");
      return <Redirect to="/laporan" /> ;
    } 
    return (
        
     <div>
        <NavbarComponent />
        <div class="header-1" style={{ backgroundColor: "#f9a826" }}>
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
          <Laporan  Detail />
          <RekapLeft />
        </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps,null)(LaporanDetailContainer);

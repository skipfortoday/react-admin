import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import {
  getLaporanDetail,
  resetLaporan,
  setLoading
} from "../actions/laporanAction";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import { getOptUser } from "../actions/optAction";
import { Container, Row, Spinner } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan from "../components/RekapLaporan";
import LaporanDetail from "../components/LaporanDetail";
import RekapLeft from "../components/RekapLeft";

const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    getLaporanHead: state.Laporan.getLaporanHead,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
    isLoading:state.Laporan.isLoading
  };
};



class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
  }

  handleSubmit(data) {
    this.props.dispatch(resetLaporan());
    this.props.dispatch(
      getLaporanDetail(data.Nama.value, data.TglAwal, data.TglAkhir)
    );
    // this.props.dispatch(getLaporanHead(data.Nama.value));
    // this.props.dispatch(getUserDetail(data.Nama.value));
    // this.props.dispatch(
    //   getLaporanRekap(data.Nama.value, data.TglAwal, data.TglAkhir)
    // );
    this.props.dispatch(setLoading(true));
    if (data.type == "printview") {

      setTimeout(function () {
        window.print();
      }, 1000);
    }
    
  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#f9a826" }}>
          <tr>
            <td width="150"></td>
            <td>
              <LengkapiAbsenGuestComponent
                onSubmit={(data) => this.handleSubmit(data)}
              />
            </td>
          </tr>
        </div>
        {this.props.isLoading ? (
          <div style={{textAlign:"center", padding:"50px 0px"}}>
            <Spinner />
          </div>
        ) : ("") }
        {this.props.getLaporanDetail ? (
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
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ListLaporanContainer);

import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserDetail, getUsersList } from "../actions/userAction";
import GuestNavbarComponent from "../components/GuestNavbarComponent";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import { getOptUser } from "../actions/optAction";
import {
  getLaporanDetail,
  resetLaporan,
  setLoading,
} from "../actions/laporanAction";
import { Container, Row, Modal } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan from "../components/RekapLaporan";
import LaporanDetail from "../components/LaporanDetail";
import RekapLeft2 from "../components/RekapLeft2";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    getLaporanHead: state.Laporan.getLaporanHead,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
    isLoading:state.Laporan.isLoading,
  };
};

class LaporanGuestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willPrinting:false
    }
  }

  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
  }

  handleSubmit(data) {
    this.props.dispatch(resetLaporan());
    this.props.dispatch(getLaporanDetail(data.Nama.value, data.TglAwal, data.TglAkhir));
    this.props.dispatch(setLoading(true));
    if(data.type == 'printview'){
      this.setState({
        ...this,
        willPrinting:true,
      })
    }
  }

  componentDidUpdate(){
    if(this.state.willPrinting && !this.props.isLoading){
      setTimeout(() => {
        window.print();
      }, 100);
      this.setState({
        ...this,
        willPrinting:false,
      })
    }
  }

  componentWillUnmount(){
    this.props.dispatch(resetLaporan())
  }

  render() {
    if(this.props.getLaporanDetail){
      this.props.dispatch(setLoading(false))
    }
    return (
      <div style={{minHeight:900}}>
        <Modal 
          isOpen={this.props.isLoading} 
          backdropTransition={{timeout:0}}
          modalTransition={{timeout:0}}
          fade={false}
          className="modal-lg custom-modal" 
          centered={true} style={{textAlign:"center"}}>
            {/* #00BFFF */}
          <Loader
            type="Oval"
            color="#FFF"
            height={60}
            width={60}
          />
        </Modal>
        <GuestNavbarComponent />
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
        
        {this.props.getLaporanDetail ? (
          <Container>
            <Row className="page-header">
              <NamaCabangLaporan />
              <RekapLaporan />
            </Row>
            <Row>
              <LaporanDetail />
              <RekapLeft2 />
            </Row>
          </Container>
        ) : (
          ""
        )}
        
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(LaporanGuestContainer);

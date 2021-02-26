import React, { Component } from "react";
import LaporanComponent from "../components/LaporanComponent";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { getLaporanDetail, getLaporanList } from "../actions/laporanAction";
import NavbarComponent from "../components/NavbarComponent";
import BackLaporan from "../components/BackLaporan";
import FormLaporan from "../components/FormLaporan";
import { getUserDetail } from "../actions/userAction";
import CetakComponent from "../components/CetakComponent";
import swal from "sweetalert";



const mapStateToProps = (state) => {
  return {
    getLaporanList: state.Laporan.getLaporanList,
    getExpandKey: state.Laporan.getExpandKey,
    errorLaporanList: state.Laporan.errorLaporanList,
  };
};


class LaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanList(this.props.match.params.UserID));
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  handleSubmit(data) {
    this.props.dispatch(getLaporanDetail(data, this.props.match.params.UserID));
    this.props.dispatch(
      getLaporanDetail(data, this.props.match.params.TglAwal)
    );
    this.props.dispatch(
      getLaporanDetail(data, this.props.match.params.TglAkhir)
    );
  }

  

  render( ) {
      if (this.props.errorLaporanList) {
        swal("Failed!", "Gaada Data Bosq / Silahkan Coba lagi", "error");
        return <Redirect to="/laporan" /> ;
      } 
    

    return (
      <div>
        <NavbarComponent />
       
            <BackLaporan />
      
            <FormLaporan />
      
            <CetakComponent />
  
        <LaporanComponent />
    </div>
    );
  }
}

export default connect(mapStateToProps,null)(LaporanContainer);

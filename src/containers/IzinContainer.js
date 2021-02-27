import React, { Component } from "react";
import IzinComponent from "../components/IzinComponent";
import swal from "sweetalert";
import { connect } from "react-redux";
import { getIzinList, deleteDataIzin } from "../actions/izinAction";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton from "../components/LengkapiAbsenButton";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import { postLaporanProses } from "../actions/laporanAction";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    errorResponDataLaporan: state.Laporan.errorResponDataLaporan,
  };
};

class IzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    this.props.dispatch(postLaporanProses(data));
  }

  render() {
    var loginid = localStorage.getItem('user');
    if (!localStorage.getItem('user')|| loginid == "undefined") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataLaporan || this.props.errorResponDataLaporan) {
      if (this.props.errorResponDataLaporan) {
        swal("Failed!", this.props.errorResponDataLaporan, "error");
      } else {
        swal(
          "Proses Berhasil!",
          "Nama : " +
            this.props.getResponDataLaporan.Nama +
            " | ID : " +
            this.props.getResponDataLaporan.UserID,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
          <tr> 
            <td width="60"></td> 
            <td>
               <LengkapiAbsen onSubmit={(data) => this.handleSubmit(data)} />
            </td>
            <td width="10"></td> 
          <td>
            <tr>
            <td width="100">.</td> 
            </tr>
            <tr>
         
             <LengkapiAbsenButton />

            </tr>
          </td>
          </tr>
        </div>

        <IzinComponent />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(IzinContainer);

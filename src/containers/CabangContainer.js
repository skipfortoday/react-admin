import React, { Component } from "react";
import CabangComponent from "../components/CabangComponent";
import { connect } from "react-redux";
import { getCabangList, deleteDataCabang } from "../actions/cabangAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";


class CabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getCabangList());
    this.props.dispatch(deleteDataCabang());
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    return (
      <div>
        <NavbarComponent />
        <CabangComponent />
      </div>
    );
  }
}

export default connect()(CabangContainer);

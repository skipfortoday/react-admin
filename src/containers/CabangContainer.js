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
    var loginid = localStorage.getItem('user');
    if (!localStorage.getItem('user')|| loginid == "undefined"){
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
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

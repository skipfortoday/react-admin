import React, { Component } from "react";
import AdminComponent from "../components/AdminComponent";
import { connect } from "react-redux";
import { getAdminList} from "../actions/adminAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";


class AdminContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getAdminList());
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
        <AdminComponent />
      </div>
    );
  }
}

export default connect()(AdminContainer);

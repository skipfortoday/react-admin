import React, { Component } from "react";
import GroupComponent from "../components/GroupComponent";
import { connect } from "react-redux";
import { getGroupList, deleteDataGroup } from "../actions/groupAction";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class GroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupList());
    this.props.dispatch(deleteDataGroup());
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    let Login = ambil.Login
    if (!localStorage.getItem('user')|| Login == "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    return (
      <div>
      <NavbarComponent /> 
      <GroupComponent />
      </div>
    );
  }
}

export default connect()(GroupContainer);

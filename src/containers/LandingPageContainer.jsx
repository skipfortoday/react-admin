import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import TableComponent from "../components/TableComponent";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";

class HomeContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    if (!localStorage.getItem('user')) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
    } 
    return (
      <div>
        <NavbarComponent />
        <TableComponent />
        </div>
    );
  }
}

export default connect()(HomeContainer);

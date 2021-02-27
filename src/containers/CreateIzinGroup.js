import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackIzin from "../components/BackIzin";
import InfoMenuIzin from "../components/InfoMenuIzin";
import { connect } from "react-redux";
import { postIzinGroup } from "../actions/izinAction";
import swal from "sweetalert";
import FormIzinGroup from "../components/FormIzinGroup";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
  };
};

class CreateIzinGroup extends Component {
  handleSubmit(data) {
    this.props.dispatch(postIzinGroup(data));
  }

  render() {
    var loginid = localStorage.getItem('user');
    if (!localStorage.getItem('user')|| loginid == "undefined") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
      if (this.props.errorResponDataIzin) {
        swal("Failed!", this.props.errorResponDataIzin, "error");
      } else {
        swal(
          "Izin Created!",
          "Nama : " +
            this.props.getResponDataIzin.DatangID +
            " , Umur : " +
            this.props.getResponDataIzin.Jabatan,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
    
        <FormIzinGroup onSubmit={(data) => this.handleSubmit(data)} />
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinGroup);

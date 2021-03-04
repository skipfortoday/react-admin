import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import TerlambatBertingkatComponent from "../components/TerlambatBertingkatComponent";
import { getGroupDetail, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import FormTerlambat from "../components/FormTerlambat";
import { getOptGroup, getOptTerlambat } from "../actions/optAction";
import { getTerlambatBertingkatDetail } from "../actions/TerlambatBertingkatAction";


const mapStateToProps = (state) => {
  return {
    getTerlambatBertingkatDetail: state.TerlambatBertingkat.getTerlambatBertingkatDetail,
    errorTerlambatBertingkatList: state.TerlambatBertingkat.errorTerlambatBertingkatList,
  };
};

class TerlambatBertingkatContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
    this.props.dispatch(getTerlambatBertingkatDetail(this.props.match.params.GroupID));
    this.props.dispatch(getOptTerlambat(this.props.match.params.GroupID));
  }

  handleSubmit(data) {
    this.props.dispatch(putGroupUpdate(data, this.props.match.params.GroupID));
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataGroup || this.props.errorResponDataGroup) {
      if (this.props.errorResponDataGroup) {
        swal("Failed!", this.props.errorResponDataGroup, "error");
      } else {
        swal(
          "Group Updated!",
          "Nama : " +
            this.props.getResponDataGroup.GroupID +
            " , GroupID : " +
            this.props.getResponDataGroup.Jabatan,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
            <BackGroup />
           
            <FormTerlambat/>
        <TerlambatBertingkatComponent/> 
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(TerlambatBertingkatContainer);

import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import TerlambatBertingkatComponent from "../components/TerlambatBertingkatComponent";
import { getGroupDetail, getGroupTerLambat1, getGroupTerLambat2, getGroupTerLambat3, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
    getResponDataGroup: state.Group.getResponDataGroup,
    errorResponDataGroup: state.Group.errorResponDataGroup,
  };
};

class TerlambatBertingkatContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
    this.props.dispatch(getGroupTerLambat1(this.props.match.params.GroupID));
    this.props.dispatch(getGroupTerLambat2(this.props.match.params.GroupID));
    this.props.dispatch(getGroupTerLambat3(this.props.match.params.GroupID));
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
            <Container>
        <TerlambatBertingkatComponent/>
        </Container>
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(TerlambatBertingkatContainer);

import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import TerlambatBertingkatComponent from "../components/TerlambatBertingkatComponent";
import { getGroupDetail, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
import InfoMenuGroup from "../components/InfoMenuGroup";
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
  }

  handleSubmit(data) {
    this.props.dispatch(putGroupUpdate(data, this.props.match.params.GroupID));
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    let Login = ambil.Login
    if (!localStorage.getItem('user')|| Login == "false") {
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
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackGroup />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Terlambat Bertingkat</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuGroup />
        <Alert color="warning"></Alert>
        <h2>Form Terlambat Bertingkat</h2>
        <TerlambatBertingkatComponent
          onSubmit={(data) => this.handleSubmit(data)}
        />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(TerlambatBertingkatContainer);

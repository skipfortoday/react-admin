import React, { Component } from "react";
import { Container, Row, Alert, Col } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import InfoMenuPegawai from "../components/InfoMenuPegawai";
import { getUserDetail } from "../actions/userAction";
import DetailUserComponent from "../components/DetailUserComponent";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class DetailUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  render() {
    var loginid = localStorage.getItem('user');
    if (!localStorage.getItem('user')|| loginid == "undefined") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
    } 
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackComponent />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Detail Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuPegawai />
        <Alert color="warning"></Alert>
        <h4>Table Detail Pegawai</h4>
        <DetailUserComponent />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(DetailUserContainer);

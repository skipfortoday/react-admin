import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackIzin from "../components/BackIzin";
import { connect } from "react-redux";
import { getIzinDetail } from "../actions/izinAction";
import DetailIzinComponent from "../components/DetailIzinComponent";
import InfoMenuIzin from "../components/InfoMenuIzin";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class DetailIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinDetail(this.props.match.params.DatangID));
  }

  render() {
    var loginid = localStorage.getItem('user');
    if (!localStorage.getItem('user')|| loginid == "undefined"){
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackIzin />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Detail Izin Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuIzin />
        <Alert color="warning">
          <Container></Container>
        </Alert>
        <DetailIzinComponent />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(DetailIzinContainer);

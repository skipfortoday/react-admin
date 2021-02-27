import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackCabang from "../components/BackCabang";
import { connect } from "react-redux";
import { getCabangDetail } from "../actions/cabangAction";
import DetailCabangComponent from "../components/DetailCabangComponent";
import InfoMenuCabang from "../components/InfoMenuCabang";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";

class DetailCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
  }

  render() {
    var loginid = localStorage.getItem('user');
    if (!localStorage.getItem('user')|| loginid == "undefined") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackCabang />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Detail Cabang</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuCabang />
        <Alert color="warning">
          <Container></Container>
        </Alert>
        <DetailCabangComponent />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(DetailCabangContainer);

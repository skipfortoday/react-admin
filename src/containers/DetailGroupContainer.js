import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import { getGroupDetail } from "../actions/groupAction";
import DetailGroupComponent from "../components/DetailGroupComponent";
import InfoMenuGroup from "../components/InfoMenuGroup";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class DetailGroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
  }

  render() {
    if (!localStorage.getItem('user')|| localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
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
              <h4>Menu Detail Group Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuGroup />
        <Alert color="warning">
          <Container></Container>
        </Alert>
        <DetailGroupComponent />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(DetailGroupContainer);

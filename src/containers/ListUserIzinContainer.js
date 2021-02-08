import React, { Component } from "react";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import InfoHomePegawai from "../components/InfoHomePegawai";
import BackIzin from "../components/BackIzin";
import ListUserIzin from "../components/ListUserIzin";
import NavbarComponent from "../components/NavbarComponent";

class ListUserIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackIzin/>
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu List User Izin</h4>
            </Alert>
          </Col>
        </Row>
        <InfoHomePegawai />
        <Alert color="warning"></Alert>
        <ListUserIzin />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(ListUserIzinContainer);

import React, { Component } from "react";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import BackIzin from "../components/BackIzin";
import ListUserIzin from "../components/ListUserIzin";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton from "../components/LengkapiAbsenButton";

class ListUserIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackIzin />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Lengkapi Absen</h4>
            </Alert>
          </Col>
        </Row>
        <Row>
        <Col md={10}>
            <LengkapiAbsen />
          </Col>
          <Col md={1}>
            <LengkapiAbsenButton />
          </Col>
          </Row>
        <Alert color="warning"></Alert>
        <ListUserIzin />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(ListUserIzinContainer);

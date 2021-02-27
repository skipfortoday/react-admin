import React, { Component } from "react";
import { Container, Alert, Col, Row, Button} from "reactstrap";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import BackIzin from "../components/BackIzin";
import ListUserIzin from "../components/ListUserIzin";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton from "../components/LengkapiAbsenButton";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class ListUserIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
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
            <BackIzin />
          </Col>
          <Col md={11}>
            <Alert color="info">
              <h4>Menu Lengkapi Absen</h4>
            </Alert>
          </Col>
        </Row>
        <Row>
        <Col md={1}>
          </Col>
        <Col md={9}>
        <Alert color="info">
            <LengkapiAbsen />
            </Alert>
          </Col>
          <Col md={1}>
            <LengkapiAbsenButton />
          </Col>
        </Row>
        <ListUserIzin />
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect()(ListUserIzinContainer);

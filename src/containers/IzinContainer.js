import React, { Component } from "react";
import { Container, Col, Alert, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import IzinComponent from "../components/IzinComponent";
import { connect } from "react-redux";
import { getIzinList, deleteDataIzin } from "../actions/izinAction";
import InfoHomeIzin from "../components/InfoHomeIzin";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton from "../components/LengkapiAbsenButton";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";

class IzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
    this.props.dispatch(getOptUser());
  }

  render() {
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <Button color="info">
              <FontAwesomeIcon icon={faListAlt} /> List
            </Button>
          </Col>
          <Col md={11}>
            <Alert color="info">
              <h4>Menu List Izin Pegawai</h4>
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
        <IzinComponent />
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect()(IzinContainer);

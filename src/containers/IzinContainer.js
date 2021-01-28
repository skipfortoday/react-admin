import React, { Component } from "react";
import { Container, Col, Alert, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import IzinComponent from "../components/IzinComponent";
import { connect } from "react-redux";
import { getIzinList, deleteDataIzin } from "../actions/izinAction";
import InfoHomeIzin from "../components/InfoHomeIzin";
import NavbarComponent from "../components/NavbarComponent";

class IzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
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
            <Alert color="warning">
              <h4>Menu List Izin Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoHomeIzin />
        <Alert color="warning"></Alert>
        <IzinComponent />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(IzinContainer);

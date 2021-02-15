import React, { Component } from "react";
import { Container, Col, Alert, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import CabangComponent from "../components/CabangComponent";
import { connect } from "react-redux";
import { getCabangList, deleteDataCabang } from "../actions/cabangAction";
import InfoHomeCabang from "../components/InfoHomeCabang";
import NavbarComponent from "../components/NavbarComponent";

class CabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getCabangList());
    this.props.dispatch(deleteDataCabang());
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
              <h4>Menu List Cabang</h4>
            </Alert>
          </Col>
        </Row>
        <InfoHomeCabang />
        <Alert color="warning"></Alert>
        <CabangComponent />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(CabangContainer);

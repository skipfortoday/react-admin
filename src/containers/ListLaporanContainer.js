import React, { Component } from "react";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import ListUserLaporan from "../components/ListUserLaporan";


class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
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
              <h4>Menu List Laporan</h4>
            </Alert>
          </Col>
        </Row>
        <ListUserLaporan />
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect()(ListLaporanContainer);

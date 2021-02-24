import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import TableComponent from "../components/TableComponent";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import LogoutComponent from "../components/LogoutComponent";


class HomeContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    if (!localStorage.getItem('user')) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
    } 
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
              <h4>Menu List Pegawai</h4>
            </Alert>
          </Col>
        </Row>

        <TableComponent />
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect()(HomeContainer);

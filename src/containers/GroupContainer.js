import React, { Component } from "react";
import { Container, Col, Alert, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import GroupComponent from "../components/GroupComponent";
import { connect } from "react-redux";
import { getGroupList, deleteDataGroup } from "../actions/groupAction";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class GroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupList());
    this.props.dispatch(deleteDataGroup());
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
              <h4>Menu List Group Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <GroupComponent />
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect()(GroupContainer);

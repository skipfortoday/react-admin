import React, { Component } from "react";
import { Container, Col, Alert, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import GroupComponent from "../components/GroupComponent";
import { connect } from "react-redux";
import { getGroupList, deleteDataGroup } from "../actions/groupAction";
import { getOptUser } from "../actions/optAction";
import InfoHomeGroup from "../components/InfoHomeGroup";
import NavbarComponent from "../components/NavbarComponent";
import ReactSelectComponent from "../components/ReactSelectComponent";

class GroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupList());
    this.props.dispatch(getOptUser());
    this.props.dispatch(deleteDataGroup());
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
              <h4>Menu List Group Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoHomeGroup />
        <Alert color="warning"></Alert>
        <ReactSelectComponent/>
        <GroupComponent />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect()(GroupContainer);

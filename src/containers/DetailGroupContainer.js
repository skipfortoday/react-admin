import React, { Component } from "react";
import { Container,Alert,Col, Row } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import { getGroupDetail } from "../actions/groupAction";
import DetailGroupComponent from "../components/DetailGroupComponent";
import InfoMenuGroup from "../components/InfoMenuGroup";

class DetailGroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
  }

  render() {
    return (
      <Container>
        <Row>
         <Col md={1}>
          <BackGroup />
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Detail Group Pegawai</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuGroup/>        
        <Alert color="warning" >
          <Container >
          </Container>
        </Alert>
        <DetailGroupComponent />
        <Alert color="warning" ></Alert>
      </Container>
    );
  }
}

export default connect()(DetailGroupContainer);

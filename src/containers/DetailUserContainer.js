import React, { Component } from "react";
import { Container,Row,Alert,Col } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import InfoMenuPegawai from "../components/InfoMenuPegawai";
import { getUserDetail } from "../actions/userAction";
import DetailUserComponent from "../components/DetailUserComponent";

class DetailUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  render() {
    return (
      <Container>
          <Row>
         <Col md={1}>
          <BackComponent/>
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Detail Pegawai</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuPegawai/>
        <Alert color="warning" ></Alert>        
        <h4>Table Detail Pegawai</h4>
        <DetailUserComponent />
        <Alert color="warning" ></Alert> 
  
      </Container>
    );
  }
}

export default connect()(DetailUserContainer);

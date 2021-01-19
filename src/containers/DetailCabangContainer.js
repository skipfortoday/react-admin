import React, { Component } from "react";
import { Container,Alert,Col, Row } from "reactstrap";
import BackCabang from "../components/BackCabang";
import { connect } from "react-redux";
import { getCabangDetail } from "../actions/cabangAction";
import DetailCabangComponent from "../components/DetailCabangComponent";
import InfoMenuCabang from "../components/InfoMenuCabang";

class DetailCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
  }

  render() {
    return (
      <Container>
        <Row>
         <Col md={1}>
          <BackCabang />
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Detail Cabang</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuCabang/>        
        <Alert color="warning" >
          <Container >
          </Container>
        </Alert>
        <DetailCabangComponent />
        <Alert color="warning" ></Alert>
      </Container>
    );
  }
}

export default connect()(DetailCabangContainer);

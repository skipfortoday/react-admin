import React, { Component } from "react";
import LaporanComponent from "../components/LaporanComponent";
import { Container,Alert,Col,Row,Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getLaporanList} from '../actions/laporanAction'
import InfoHomePegawai from "../components/InfoHomePegawai";

class LaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanList(this.props.match.params.UserID));

  }

  render() {
    
    return (
      <Container>
        <Row>
         <Col md={1}>
          <Button color="info">
            <FontAwesomeIcon icon={faListAlt} /> List
          </Button>
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Laporan</h4>
          </Alert>
          </Col>
        </Row>
        <InfoHomePegawai/>
        <Alert color="warning" ></Alert>
        <LaporanComponent />
        <Alert color="warning" ></Alert>
      </Container>
    );
  }
}

export default connect()(LaporanContainer);

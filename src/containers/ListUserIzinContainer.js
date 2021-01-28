import React, { Component } from "react";
import TableComponent from "../components/TableComponent";
import { Container,Alert,Col,Row,Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from '../actions/userAction'
import InfoHomePegawai from "../components/InfoHomePegawai";
import ListUserIzin from "../components/ListUserIzin";

class ListUserIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
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
           <h4 >Menu List User Izin</h4>
          </Alert>
          </Col>
        </Row>
        <InfoHomePegawai/>
        <Alert color="warning" ></Alert>
        <ListUserIzin />
        <Alert color="warning" ></Alert>
      </Container>
    );
  }
}

export default connect()(ListUserIzinContainer);
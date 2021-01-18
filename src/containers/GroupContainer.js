import React, { Component } from "react";
import { Container,Col,Alert,Row,Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import GroupComponent from "../components/GroupComponent";
import { connect } from "react-redux";
import { getGroupList, deleteDataGroup } from "../actions/groupAction";
import InfoHomeGroup from "../components/InfoHomeGroup";

class GroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupList());
    this.props.dispatch(deleteDataGroup());
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
           <h4 >Menu List Group Pegawai</h4>
          </Alert>
          </Col>
        </Row>
        <InfoHomeGroup/>
        <Alert color="warning" ></Alert>
        <GroupComponent />
      </Container>
    );
  }
}

export default connect()(GroupContainer);

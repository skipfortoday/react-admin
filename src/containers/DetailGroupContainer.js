import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import { getGroupDetail } from "../actions/groupAction";
import DetailGroupComponent from "../components/DetailGroupComponent";

class DetailGroupContainer extends Component {
  componentDidMountGroup() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
  }

  render() {
    return (
      <Container>
        <BackGroup />
        <h1>Detail Group</h1>
        <DetailGroupComponent />
      </Container>
    );
  }
}

export default connect()(DetailGroupContainer);

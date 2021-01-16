import React, { Component } from "react";
import GroupComponent from "../components/GroupComponent";
import { connect } from "react-redux";
import { getGroupList, deleteDataGroup } from "../actions/groupAction";
import TableComponent from "../components/TableComponent";

class GroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupList());
    this.props.dispatch(deleteDataGroup());
  }

  render() {
    
    return (
      <div>
        <GroupComponent />
      </div>
    );
  }
}

export default connect()(GroupContainer);

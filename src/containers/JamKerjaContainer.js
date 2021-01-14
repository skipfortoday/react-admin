import React, { Component } from "react";
import TableJamKerja from "../components/TableJamKerja";
import { connect } from "react-redux";
import { getJamKerjaList, deleteJamKerja } from '../actions/JamKerjaAction'

class JamKerjaContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getJamKerjaList());
    this.props.dispatch(deleteJamKerja());
  }

  render() {
    
    return (
      <div>
        <TableJamKerja />
      </div>
    );
  }
}

export default connect()(JamKerjaContainer);
import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import ListUserLaporan from "../components/ListUserLaporan";


class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <ListUserLaporan />
        </div>
    );
  }
}

export default connect()(ListLaporanContainer);

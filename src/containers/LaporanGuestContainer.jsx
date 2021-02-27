import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import GuestNavbarComponent from "../components/GuestNavbarComponent";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import LengkapiAbsenButton3 from "../components/LengkapiAbsenButton2";
import { getOptUser } from "../actions/optAction";


class LaporanGuestContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
  }

  render() {
    return (
      <div>
        <GuestNavbarComponent/>
        <div style={{ backgroundColor: "#fec107" }}>
          <tr>
            <td width="150"></td>
            <td>
              <LengkapiAbsenGuestComponent onSubmit={(data) => this.handleSubmit2(data)} />
            </td>
            <td>
              <tr>
                <td width="20">.</td>
              </tr>
              <tr>
                <LengkapiAbsenButton3 />
              </tr>
            </td>
          </tr>
        </div>
        </div>
    );
  }
}

export default connect()(LaporanGuestContainer);

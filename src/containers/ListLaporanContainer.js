import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenGuestComponent from "../components/LengkapiAbsenGuestComponent";
import LengkapiAbsenButton2 from "../components/LengkapiAbsenButton2";
import { getOptUser } from "../actions/optAction";


class ListLaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#fec107" }}>
          <tr>
            <td width="150"></td>
            <td>
              <LengkapiAbsenGuestComponent onSubmit={(data) => this.handleSubmit2(data)} tglAwal="2021-03-01" />
            </td>
            <td>
              <tr>
                <td width="20">.</td>
              </tr>
              <tr>
                <LengkapiAbsenButton2 />
              </tr>
            </td>
          </tr>
        </div>
        </div>
    );
  }
}

export default connect()(ListLaporanContainer);

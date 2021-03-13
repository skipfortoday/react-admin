import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import GuestNavbarComponent from "../components/GuestNavbarComponent";

class LandingPageContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    return (
      <div> 
        <GuestNavbarComponent />
        <video  autoPlay loop src="/images/opening.mp4" type="video/mp4" id="myVideo"></video>
      </div>
    );
  }
}

export default connect()(LandingPageContainer);

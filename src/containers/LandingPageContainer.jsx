import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import GuestNavbarComponent from "../components/GuestNavbarComponent";
import swal from "sweetalert";
import SweeperComponent from "../components/SweeperComponent";
import { Container } from "reactstrap";

class LandingPageContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    return (
      <div> 
        
        <GuestNavbarComponent />
        <div class="bgimg">
        </div>
      </div>
    );
  }
}

export default connect()(LandingPageContainer);

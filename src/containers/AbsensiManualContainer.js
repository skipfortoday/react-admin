import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import { getOptUserManual } from "../actions/optAction";
import FormAbsensiManual from "../components/FormAbsensiManual";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import Ambilwaktu from "../components/Ambilwaktu";


class AbsensiManualContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(getOptUserManual());
  }

  render() {
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManual/>
        </Container>
        </div>
        <h1>Menu Masuk<Ambilwaktu/></h1>
      </div>
    );
  }
}

export default connect()(AbsensiManualContainer);
import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import { getOptUserManual } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManual2 from "../components/FormAbsensiManual2";

class AbsensiManualContainerIstLuar extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(getOptUserManual());
    this.props.dispatch(deleteDataUser());
  }

  render() {
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManual2/>
        </Container>
        </div>
        <h1>Menu Istirahat Keluar</h1>
      </div>
    );
  }
}

export default connect()(AbsensiManualContainerIstLuar);
import React, { Component } from "react";
import LaporanComponent from "../components/LaporanComponent";
import { Container, Alert, Col, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getLaporanList } from "../actions/laporanAction";
import InfoHomePegawai from "../components/InfoHomePegawai";
import NavbarComponent from "../components/NavbarComponent";
import RekapLaporan from "../components/RekapLaporan";

class LaporanContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporanList(this.props.match.params.UserID));
  }

  render() {
    return (
      <Container>
        <NavbarComponent/>
        <LaporanComponent />
        <RekapLaporan/>
      </Container>
    );
  }
}

export default connect()(LaporanContainer);

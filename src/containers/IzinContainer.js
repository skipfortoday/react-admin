import React, { Component } from "react";
import { Container, Col, Alert, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import IzinComponent from "../components/IzinComponent";
import swal from "sweetalert";
import { connect } from "react-redux";
import { getIzinList, deleteDataIzin } from "../actions/izinAction";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton from "../components/LengkapiAbsenButton";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import { postLaporanProses } from "../actions/laporanAction";
import {Redirect} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
    getResponDataLaporan: state.Laporan.getResponDataLaporan,
    errorResponDataLaporan: state.Laporan.errorResponDataLaporan,
  };
};


class IzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    this.props.dispatch(postLaporanProses(data));
  }

  

  render() {
    if (!localStorage.getItem('user')) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
    } 
    if (this.props.getResponDataLaporan || this.props.errorResponDataLaporan) {
      if (this.props.errorResponDataLaporan) {
        swal("Failed!", this.props.errorResponDataLaporan, "error");
      } else {
        swal(
          "Proses Berhasil!",
          "Nama : " +
            this.props.getResponDataLaporan.Nama +
            " | ID : " +
            this.props.getResponDataLaporan.UserID,
          "success"
        );
      }
    }
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <Button color="info">
              <FontAwesomeIcon icon={faListAlt} /> List
            </Button>
          </Col>
          <Col md={11}>
            <Alert color="info">
              <h4>Menu List Izin Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <Row>
        <Col md={1}>
          </Col>
        <Col md={9}>
        <Alert color="info">
            <LengkapiAbsen onSubmit={(data) => this.handleSubmit(data)} />
            </Alert>
          </Col>
          <Col md={1}>
            <LengkapiAbsenButton  />
          </Col>
        </Row>
        <IzinComponent />
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(IzinContainer);

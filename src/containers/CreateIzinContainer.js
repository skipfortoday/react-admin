import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackIzin from "../components/BackIzin";
import InfoMenuIzin from "../components/InfoMenuIzin";
import FormIzinComponent from "../components/FormIzinComponent";
import { connect } from "react-redux";
import { getIzinDetail, postIzinCreate } from "../actions/izinAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
  };
};

class CreateIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinDetail(this.props.match.params.DatangID));
  }

  handleSubmit(data) {
    this.props.dispatch(postIzinCreate(data));
  }

  render() {
    if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
      if (this.props.errorResponDataIzin) {
        swal("Failed!", this.props.errorResponDataIzin, "error");
      } else {
        swal(
          "Izin Created!",
          " | ID : " +
            this.props.getResponDataIzin.UserID +
            "  |  Tanggal :  " +
            this.props.getResponDataIzin.TanggalScan +
            "  |   Status :  " +
            this.props.getResponDataIzin.Status +
            "  |  Keterangan :       " +
            this.props.getResponDataIzin.Keterangan,
          "success"
        );
      }
    }
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackIzin />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Tambah Izin Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuIzin />
        <Alert color="warning"></Alert>
        <h2>Form Tambah Izin Pegawai</h2>
        <FormIzinComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinContainer);

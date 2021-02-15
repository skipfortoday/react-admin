import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackCabang from "../components/BackCabang";
import { connect } from "react-redux";
import FormCabangComponent from "../components/FormCabangComponent";
import { getCabangDetail, putCabangUpdate } from "../actions/cabangAction";
import swal from "sweetalert";
import InfoMenuCabang from "../components/InfoMenuCabang";
import NavbarComponent from "../components/NavbarComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
  };
};

class EditCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
  }

  handleSubmit(data) {
    this.props.dispatch(
      putCabangUpdate(data, this.props.match.params.KodeCabang)
    );
  }

  render() {
    if (this.props.getResponDataCabang || this.props.errorResponDataCabang) {
      if (this.props.errorResponDataCabang) {
        swal("Failed!", this.props.errorResponDataCabang, "error");
      } else {
        swal(
          "Cabang Updated!",
          "Kode : " +
            this.props.getResponDataCabang.KodeCabang +
            " , Nama Cabang: " +
            this.props.getResponDataCabang.NamaCabang,
          "success"
        );
      }
    }
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackCabang />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Edit Cabang</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuCabang />
        <Alert color="warning"></Alert>
        <h4>Form Edit Cabang</h4>
        <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(EditCabangContainer);

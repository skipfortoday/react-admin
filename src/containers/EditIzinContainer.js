import React, { Component } from "react";
import { Container,Alert,Col,Row } from "reactstrap";
import BackIzin from "../components/BackIzin";
import { connect } from "react-redux";
import FormIzinComponent from "../components/FormIzinComponent";
import { getIzinDetail, putIzinUpdate } from "../actions/izinAction";
import swal from "sweetalert";
import InfoMenuIzin from "../components/InfoMenuIzin";
import NavbarComponent from "../components/NavbarComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
  };
};

class EditIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getIzinDetail(this.props.match.params.DatangID));
  }

  handleSubmit(data) {
    this.props.dispatch(putIzinUpdate(data, this.props.match.params.DatangID));
  }

  render() {
    if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
      if (this.props.errorResponDataIzin) {
        swal("Failed!", this.props.errorResponDataIzin, "error");
      } else {
        swal(
          "Izin Updated!",
          "Nama : " +
            this.props.getResponDataIzin.DatangID +
            " , DatangID : " +
            this.props.getResponDataIzin.Jabatan,
          "success"
        );
      }
    }
    return (
      <Container>
        <NavbarComponent/>
        <Row>
         <Col md={1}>
          <BackIzin />
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Edit Izin Pegawai</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuIzin/>
        <Alert color="warning" ></Alert>
        <h2>Form Edit Izin Pegawai</h2>    
       <FormIzinComponent onSubmit={(data) => this.handleSubmit(data)} />
       <Alert color="warning" ></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(EditIzinContainer);

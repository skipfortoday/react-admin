import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackCabang from "../components/BackCabang";
import FormCabangComponent from "../components/FormCabangComponent";
import { connect } from "react-redux";
import { postCabangCreate } from "../actions/cabangAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
  };
};


class CreateCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    this.props.dispatch(postCabangCreate(data));
  }

  
  render() {
    if (!localStorage.getItem('user')) {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
    } 
    if (this.props.getResponDataCabang || this.props.errorResponDataCabang) {
      if (this.props.errorResponDataCabang) {
        swal("Failed!", this.props.errorResponDataCabang, "error");
      } else {
        swal(
          "Cabang Created!",
          "Kode : " +
            this.props.getResponDataCabang.KodeCabang +
            " , Nama : " +
            this.props.getResponDataCabang.NamaCabang,
          "success"
        );
      }
    }
    return (
     <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#17a2b7'}}>
        <BackCabang />
        <Container>
        <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateCabangContainer);

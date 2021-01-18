import React, { Component } from "react";
import { Container,Col,Row,Alert } from "reactstrap";
import BackComponent from "../components/BackComponent";
import FormComponent from "../components/FormComponent";
import { connect } from "react-redux";
import { postUserCreate } from "../actions/userAction";
import swal from "sweetalert";
import InfoMenuPegawai from "../components/InfoMenuPegawai";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class CreateUserContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postUserCreate(data));
  }

  render() {
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if(this.props.errorResponDataUser)
      {
        swal(
            "Failed!",
            this.props.errorResponDataUser,
            "error"
          );
      }else {
        swal(
            "User Created!",
            "Nama : " +
              this.props.getResponDataUser.Nama +
              " , Umur : " +
              this.props.getResponDataUser.Nama,
            "success"
          );
      }
    }
    return (
      <Container>
           <Row>
         <Col md={1}>
          <BackComponent/>
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Tambah Pegawai</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuPegawai/>
        <Alert color="warning" ></Alert>        
        <h4>Form Tambah Pegawai</h4>
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning" ></Alert> 
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateUserContainer);

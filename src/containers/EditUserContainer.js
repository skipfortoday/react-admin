import React, { Component } from "react";
import { Container,Alert,Row,Col } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import FormComponent from "../components/FormComponent";
import InfoMenuPegawai from "../components/InfoMenuPegawai";
import { getUserDetail, putUserUpdate } from "../actions/userAction";
import swal from "sweetalert";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class EditUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  handleSubmit(data) {
    this.props.dispatch(putUserUpdate(data, this.props.match.params.UserID));
  }

  render() {
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        swal("Failed!", this.props.errorResponDataUser, "error");
      } else {
        swal(
          "User Updated!",
          "Nama : " +
            this.props.getResponDataUser.Nama +
            " , UserID : " +
            this.props.getResponDataUser.Pass,
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
           <h4 >Menu Detail Pegawai</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuPegawai/>
        <Alert color="warning" ></Alert>        
        <h4>Form Edit Pegawai</h4>
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning" ></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(EditUserContainer);

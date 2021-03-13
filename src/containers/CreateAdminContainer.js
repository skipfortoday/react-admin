import React, { Component } from "react";
import { Container } from "reactstrap";
import FormAdminComponent from "../components/FormAdminComponent";
import { connect } from "react-redux";
import { postAdminCreate } from "../actions/adminAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import BackAdminComponent from "../components/BackAdminComponent";


const mapStateToProps = (state) => {
  return {
    getResponDataAdmin: state.Admin.getResponDataAdmin,
    errorResponDataAdmin: state.Admin.errorResponDataAdmin,
  };
};


class CreateAdminContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    this.props.dispatch(postAdminCreate(data));
  }

  
  render() {
    if (!localStorage.getItem('user')||  localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataAdmin || this.props.errorResponDataAdmin) {
      if (this.props.errorResponDataAdmin) {
        swal("Failed!", this.props.errorResponDataAdmin, "error");
      } else {
        swal(
          "Cabang Created!",
          "Kode : " +
            this.props.getResponDataAdmin.AdminID +
            " , Nama : " +
            this.props.getResponDataAdmin.TanggalCreate,
          "success"
        );
      }
    }
    return (
     <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
        <BackAdminComponent />
        <Container>
        <FormAdminComponent onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateAdminContainer);

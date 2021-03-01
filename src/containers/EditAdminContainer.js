import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import FormAdminComponent from "../components/FormAdminComponent";
import { getAdminDetail, putAdminUpdate } from "../actions/adminAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import BackAdminComponent from "../components/BackAdminComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataAdmin: state.Admin.getResponDataAdmin,
    errorResponDataAdmin: state.Admin.errorResponDataAdmin,
  };
};

class EditAdminContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getAdminDetail(this.props.match.params.AdminID));
  }

  handleSubmit(data) {
    this.props.dispatch(
      putAdminUpdate(data, this.props.match.params.AdminID)
    );
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')|| ambil.Login == "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataAdmin || this.props.errorResponDataAdmin) {
      if (this.props.errorResponDataAdmin) {
        swal("Failed!", this.props.errorResponDataAdmin, "error");
      } else {
        swal(
          "Admin Updated!",
          "Kode : " +
            this.props.getResponDataAdmin.KodeAdmin +
            " , Nama Admin: " +
            this.props.getResponDataAdmin.NamaAdmin,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#fec107" }}>
          <BackAdminComponent/>
          <Container>
          <FormAdminComponent onSubmit={(data) => this.handleSubmit(data)} />
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditAdminContainer);

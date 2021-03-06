import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import FormComponent from "../components/FormComponent";
import { getUserDetail, putUserUpdate } from "../actions/userAction";
import { getOptCabang, getOptGroup } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class EditUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptGroup());
    this.props.dispatch(getOptCabang());
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  handleSubmit(data) {
    this.props.dispatch(putUserUpdate(data, this.props.match.params.UserID));
  }

  render() {
    if (!localStorage.getItem('user')||  localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        swal("Failed!", this.props.errorResponDataUser, "error");
      } else {
        swal(
          "User " + this.props.getResponDataUser.Nama + " Updated!",
          " UserID : " + this.props.getResponDataUser.UserID,
          "success"
        ).then(() => {
          this.props.dispatch(getUserDetail(this.props.match.params.UserID))
        })
      }
    }
    return (
      <div style={{minHeight:"700px"}}>
        <NavbarComponent />
        <div style={{ backgroundColor: "#f9a826" }}>
          <BackComponent />
          <Container>
            <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditUserContainer);

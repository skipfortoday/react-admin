import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import FormGroupComponent from "../components/FormGroupComponent";
import { getGroupDetail, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
import InfoMenuGroup from "../components/InfoMenuGroup";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataGroup: state.Group.getResponDataGroup,
    errorResponDataGroup: state.Group.errorResponDataGroup,
  };
};

class EditGroupContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
  }

  handleSubmit(data) {
    this.props.dispatch(putGroupUpdate(data, this.props.match.params.GroupID));
  }

  render() {
    var loginid = localStorage.getItem('user');
    if (loginid == 'undefined') {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/login" /> ;
    } 
    if (this.props.getResponDataGroup || this.props.errorResponDataGroup) {
      if (this.props.errorResponDataGroup) {
        swal("Failed!", this.props.errorResponDataGroup, "error");
      } else {
        swal(
          "Group Updated!",
          "Nama : " +
            this.props.getResponDataGroup.GroupID +
            " , GroupID : " +
            this.props.getResponDataGroup.Jabatan,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#17a2b7'}}>
        <BackGroup />
        <Container>
        <FormGroupComponent onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditGroupContainer);

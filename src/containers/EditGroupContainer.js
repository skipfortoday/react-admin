import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import FormGroupComponent from "../components/FormGroupComponent";
import { getGroupDetail, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
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
    if (!localStorage.getItem('user')||  localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataGroup || this.props.errorResponDataGroup) {
      if (this.props.errorResponDataGroup) {
        swal("Failed!", this.props.errorResponDataGroup, "error");
      } else {
        swal(
          "Group Created!",
          "ID : " +
          this.props.getResponDataGroup.data.GroupID +
          " , Jabatan : " +
          this.props.getResponDataGroup.data.Jabatan,
          "success"
        ).then((value) => {
          window.location.reload();
        });
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#f9a826'}}>
        <BackGroup />
        <Container>
        <FormGroupComponent onSubmit={(data) => this.handleSubmit(data)} dis={true} />
        </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditGroupContainer);

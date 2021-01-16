import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import FormGroupComponent from "../components/FormGroupComponent";
import { connect } from "react-redux";
import { postGroupCreate } from "../actions/groupAction";
import swal from "sweetalert";

const mapStateToProps = (state) => {
  return {
    getResponDataGroup: state.Group.getResponDataGroup,
    errorResponDataGroup: state.Group.errorResponDataGroup,
  };
};

class CreateGroupContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postGroupCreate(data));
  }

  render() {
    if (this.props.getResponDataGroup || this.props.errorResponDataGroup) {
      if(this.props.errorResponDataGroup)
      {
        swal(
            "Failed!",
            this.props.errorResponDataGroup,
            "error"
          );
      }else {
        swal(
            "Group Created!",
            "Nama : " +
              this.props.getResponDataGroup.GroupID +
              " , Umur : " +
              this.props.getResponDataGroup.Jabatan,
            "success"
          );
      }
    }
    return (
      <Container>
        <BackGroup />
        <h1>Tambah User Group</h1>
        <FormGroupComponent onSubmit={(data) => this.handleSubmit(data)} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateGroupContainer);

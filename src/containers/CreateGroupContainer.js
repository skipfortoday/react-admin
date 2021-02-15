import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackGroup from "../components/BackGroup";
import InfoMenuGroup from "../components/InfoMenuGroup";
import FormGroupComponent from "../components/FormGroupComponent";
import { connect } from "react-redux";
import { postGroupCreate } from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";

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
      if (this.props.errorResponDataGroup) {
        swal("Failed!", this.props.errorResponDataGroup, "error");
      } else {
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
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackGroup />
          </Col>
          <Col md={11}>
            <Alert color="warning">
              <h4>Menu Tambah Group Pegawai</h4>
            </Alert>
          </Col>
        </Row>
        <InfoMenuGroup />
        <Alert color="warning"></Alert>
        <h4>Form Tambah Group Pegawai</h4>
        <FormGroupComponent onSubmit={(data) => this.handleSubmit(data)} />
        <Alert color="warning"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateGroupContainer);

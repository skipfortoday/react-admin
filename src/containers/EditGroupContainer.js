import React, { Component } from "react";
import { Container,Alert,Col,Row } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import FormGroupComponent from "../components/FormGroupComponent";
import { getGroupDetail, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
import InfoMenuGroup from "../components/InfoMenuGroup";

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
      <Container>
        <Row>
         <Col md={1}>
          <BackGroup />
         </Col>
         <Col md={11}>
          <Alert color="warning" >
           <h4 >Menu Edit Group Pegawai</h4>
          </Alert>
          </Col>
        </Row>
        <InfoMenuGroup/>
        <Alert color="warning" ></Alert>
        <h2>Form Edit Group Pegawai</h2>    
       <FormGroupComponent onSubmit={(data) => this.handleSubmit(data)} />
       <Alert color="warning" ></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(EditGroupContainer);

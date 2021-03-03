import React, { Component } from "react";
import { Container} from "reactstrap";
import BackIzin from "../components/BackIzin";
import { connect } from "react-redux";
import { postIzinGroup } from "../actions/izinAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import FormIzinGroup from "../components/FormIzinGroup";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
  };
};

class CreateIzinGroup extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    this.props.dispatch(postIzinGroup(data));
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
      if (this.props.errorResponDataIzin) {
        swal("Failed!", this.props.errorResponDataIzin, "error");
      } else {
        swal(
          "Izin Created!",
          "~" ,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#fec107'}}>
          <BackIzin></BackIzin>
        <Container>
        <FormIzinGroup onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinGroup);

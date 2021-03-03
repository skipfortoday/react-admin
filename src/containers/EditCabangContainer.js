import React, { Component } from "react";
import { Container} from "reactstrap";
import BackCabang from "../components/BackCabang";
import { connect } from "react-redux";
import FormCabangComponent from "../components/FormCabangComponent";
import { getCabangDetail, putCabangUpdate } from "../actions/cabangAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataCabang: state.Cabang.getResponDataCabang,
    errorResponDataCabang: state.Cabang.errorResponDataCabang,
    getOptUser: state.Opt.getOptUser,
  };
};

class EditCabangContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getCabangDetail(this.props.match.params.KodeCabang));
  }

  handleSubmit(data) {
    this.props.dispatch(
      putCabangUpdate(data, this.props.match.params.KodeCabang)
    );
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataCabang || this.props.errorResponDataCabang) {
      if (this.props.errorResponDataCabang) {
        swal("Failed!", this.props.errorResponDataCabang, "error");
      } else {
        swal(
          "Cabang Updated!",
          "Kode : " +
            this.props.getResponDataCabang.KodeCabang +
            " , Nama Cabang: " +
            this.props.getResponDataCabang.NamaCabang,
          "success"
        );
      }
    }
    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#fec107" }}>
          <BackCabang />
          <Container>
          <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditCabangContainer);

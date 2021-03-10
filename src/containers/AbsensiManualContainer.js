import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import { getOptUserManual } from "../actions/optAction";
import FormAbsensiManual from "../components/FormAbsensiManual";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminTimeNow } from "../actions/adminAction";
import { postManualMasuk } from "../actions/manualAction";
import swal from "sweetalert";


const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(getOptUserManual());
    this.props.dispatch(getAdminTimeNow());
  }
  handleSubmit(data) {
    this.props.dispatch(postManualMasuk(data));
  }

  render() {

    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen!",
          "~",
          "success"
        );
      }
    }
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManual  onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
        <h1>Menu Masuk<Ambilwaktu/></h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainer);
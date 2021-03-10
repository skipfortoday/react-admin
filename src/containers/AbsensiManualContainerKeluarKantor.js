import React, { Component } from "react";
import { connect } from "react-redux";
import { getOptUserManualKeluar } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManualKeluar from "../components/FormAbsensiManualKeluar";
import { postManualKeluar } from "../actions/manualAction";
import swal from "sweetalert";


const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainerKeluarKantor extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUserManualKeluar());
  }
  handleSubmit(data) {
    this.props.dispatch(postManualKeluar(data));
  }


  render() {
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen!",
          "Keluar Kantor",
          "success"
        );
      }
    }
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManualKeluar onSubmit={(data) => this.handleSubmit(data)}/>
        </Container>
        </div>
        <h1>Menu Keluar Kantor</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerKeluarKantor);
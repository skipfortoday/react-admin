import React, { Component } from "react";
import { connect } from "react-redux";
import { getOptUserManualKembali } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManualKembali from "../components/FormAbsensiManualKembali";
import { putManualKembali } from "../actions/manualAction";
import swal from "sweetalert";

const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainerKembaliKantor extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUserManualKembali());
  }
  handleSubmit(data) {
    this.props.dispatch(putManualKembali(data));
  }

  render() {
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen!",
          "Kembali Kantor",
          "success"
        );
      }
    }
    
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManualKembali onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
        <h1>Menu Kembali Kantor</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerKembaliKantor);
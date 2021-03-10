import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import { getOptUserManualPulang } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManual2 from "../components/FormAbsensiManual2";
import { getAdminTimeNow } from "../actions/adminAction";
import { putManualPulang } from "../actions/manualAction";
import swal from "sweetalert";

const mapStateToProps = (state) => {
  return {
    getResponDataManual: state.Manual.getResponDataManual,
    errorResponDataManual: state.Manual.errorResponDataManual,
  };
};

class AbsensiManualContainerPulang extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(getOptUserManualPulang());
    this.props.dispatch(getAdminTimeNow()); 
  }

  handleSubmit(data) {
    this.props.dispatch(putManualPulang(data));
  }

  render() {
    if (this.props.getResponDataManual || this.props.errorResponDataManual) {
      if (this.props.errorResponDataManual) {
        swal("Failed!", this.props.errorResponDataManual, "error");
      } else {
        swal(
          "Berhasil Absen Pulang!",
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
        <FormAbsensiManual2  onSubmit={(data) => this.handleSubmit(data)} />
        </Container>
        </div>
        <h1>Menu Pulang</h1>

      </div>
    );
  }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerPulang);
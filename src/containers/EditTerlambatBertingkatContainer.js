import React, { Component } from "react";

import { connect } from "react-redux";
import TerlambatBertingkatComponent from "../components/TerlambatBertingkatComponent";
import { getGroupDetail} from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import FormTerlambat from "../components/FormTerlambat";
import { getOptTerlambat } from "../actions/optAction";
import { getTerlambatBertingkatDetail, getTerlambatBertingkatDetail2, putTerlambatBertingkatUpdate } from "../actions/TerlambatBertingkatAction";
import CariTerlambat from "../components/CariTerlambat";
import FormTTComponent from "../components/FormTTComponent";


const mapStateToProps = (state) => {
  return {
    getTerlambatBertingkatDetail: state.TerlambatBertingkat.getTerlambatBertingkatDetail,
    errorTerlambatBertingkatList: state.TerlambatBertingkat.errorTerlambatBertingkatList,
    getTerlambatBertingkatDetail2: state.TerlambatBertingkat.getTerlambatBertingkatDetail2,
    errorTerlambatBertingkatDetail2: state.TerlambatBertingkat.errorTerlambatBertingkatDetail2,
    getResponDataTerlambatBertingkat: state.TerlambatBertingkat.getResponDataTerlambatBertingkat,
    errorResponDataTerlambatBertingkat: state.TerlambatBertingkat.errorResponDataTerlambatBertingkat
  };
};

class EditTerlambatBertingkatContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
    this.props.dispatch(getTerlambatBertingkatDetail(this.props.match.params.GroupID));
    this.props.dispatch(getTerlambatBertingkatDetail2(this.props.match.params.RuleTerlambatBertingkatID));
    this.props.dispatch(getOptTerlambat(this.props.match.params.GroupID));
  }

  handleSubmit(data) {
    this.props.dispatch(putTerlambatBertingkatUpdate(data, this.props.match.params.RuleTerlambatBertingkatID));
  }

  render() {
    if (!localStorage.getItem('user')||  localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataTerlambatBertingkat || this.props.errorResponDataTerlambatBertingkat) {
      if (this.props.errorResponDataTerlambatBertingkat) {
        swal("Failed!", this.props.errorResponDataTerlambatBertingkat, "error");
      } else {
        swal(
          "Group Updated!",
          "Nama : " +
            this.props.getResponDataTerlambatBertingkat.GroupID +
            " , GroupID : " +
            this.props.getResponDataTerlambatBertingkat.Jabatan,
          "success"
        );
      }
    }
    return (
      // <div>
      //   <NavbarComponent />
           
      //       
      //       
      //   <TerlambatBertingkatComponent/> 
      //   </div>

<div>
<NavbarComponent />
<div style={{ backgroundColor: "#fec107" }}>
  
  <tr>
  
    <td width="100"></td>
    <td>

      <FormTerlambat/>
      <CariTerlambat/>
    </td>
    <td> </td>
  </tr>
  <tr>
    <td width="100"></td>
    <td>
      <FormTTComponent onSubmit={(data) => this.handleSubmit(data)}/>
    </td>
  </tr>
 
</div>
<TerlambatBertingkatComponent/>
</div>
    );
  }
}

export default connect(mapStateToProps, null)(EditTerlambatBertingkatContainer);

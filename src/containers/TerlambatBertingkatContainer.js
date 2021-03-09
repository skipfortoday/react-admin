import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import TerlambatBertingkatComponent from "../components/TerlambatBertingkatComponent";
import { getGroupDetail} from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import FormTerlambat from "../components/FormTerlambat";
import { getOptTerlambat } from "../actions/optAction";
import { getTerlambatBertingkatDetail, postTerlambatBertingkatCreate } from "../actions/TerlambatBertingkatAction";
import CariTerlambat from "../components/CariTerlambat";
import FormTTComponent from "../components/FormTTComponent";


const mapStateToProps = (state) => {
  return {
    getTerlambatBertingkatDetail: state.TerlambatBertingkat.getTerlambatBertingkatDetail,
    errorTerlambatBertingkatList: state.TerlambatBertingkat.errorTerlambatBertingkatList,
    getResponDataTerlambatBertingkat: state.TerlambatBertingkat.getResponDataTerlambatBertingkat,
    errorResponDataTerlambatBertingkat: state.TerlambatBertingkat.errorResponDataTerlambatBertingkat
  };
};

class TerlambatBertingkatContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
    this.props.dispatch(getTerlambatBertingkatDetail(this.props.match.params.GroupID));
    this.props.dispatch(getOptTerlambat(this.props.match.params.GroupID));
  }

  handleSubmit(data) {
    this.props.dispatch(postTerlambatBertingkatCreate(data, this.props.match.params.GroupID));
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')||  ambil.Login === "false") {
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
        );window.location.reload();
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

export default connect(mapStateToProps, null)(TerlambatBertingkatContainer);

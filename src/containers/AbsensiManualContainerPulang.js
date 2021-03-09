import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";
import { getOptUserManual } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Container } from "reactstrap";
import FormAbsensiManual2 from "../components/FormAbsensiManual2";
import { getAdminTimeNow } from "../actions/adminAction";

export const AmbilWaktu = () => {
  var now = new Date();
  var s = now.getSeconds();
  var i = now.getMinutes();
  var H = now.getHours();

  var d = now.getDate();
  var m = now.getMonth();
  var Y = now.getFullYear();
  
  var sekarang = Y + '/'+m+'/'+d+' '+ H+':'+i+':'+s;
  // setInterval(() => {
  //   AmbilWaktu();
  // }, 999);
  
  return (
    <div>
      {sekarang}
    </div>
  )
}

export const startFlashMessageTimer = () => (dispatch, getAdminTimeNow) => {

  let timer = null;
  clearInterval(timer);
  timer = setInterval(() => {
      dispatch(getAdminTimeNow());
      const { count } = getAdminTimeNow();
      if (count >= 5) { clearInterval(timer) }
  }, 1000);
  return (
    <div>
      {timer}
    </div>
  )
}


class AbsensiManualContainerPulang extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(getOptUserManual());
    this.props.dispatch(getAdminTimeNow()); 

  }

  render() {
    return (
      <div> 
        
        <GuestNavbarComponentManual />
        <div class="header-1" style={{ backgroundColor: "#fec107" }}>
          <Container>
        <FormAbsensiManual2/>
        </Container>
        </div>
        <h1>Jam Sekarang </h1>
        <AmbilWaktu/>
        <startFlashMessageTimer/>
        <h1>Menu Pulang</h1>

      </div>
    );
  }
}

export default connect()(AbsensiManualContainerPulang);
import React, { Component } from "react";
import { reset } from 'redux-form';
import { connect } from "react-redux";
import { getOptUserManual } from "../actions/optAction";
import FormAbsensiManual from "../components/FormAbsensiManual";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { List, Card, CardBody, CardHeader, CardTitle, Col, Container, Row } from "reactstrap";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminOnDuty } from "../actions/adminAction";
import { postManualMasuk, resetProps } from "../actions/manualAction";
import swal from "sweetalert";
import LaporanDetail2 from "../components/LaporanDetail2";
import OnDutyRoster from "../components/OnDutyRoster";
import { getLaporanHead, getLaporanList, resetLaporan } from "../actions/laporanAction";
import { getUserDetail } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import { getListPengumuman } from "../actions/pengumumanAction";
import RecentPengumumanComponent from "../components/RecentPengumumanComponent";
import RecentPengumumanTableComponent from "../components/RecentPengumumanTableComponent";
import fs from 'browserify-fs'

const mapStateToProps = (state) => {
   return {
      getResponDataManual: state.Manual.getResponDataManual,
      errorResponDataManual: state.Manual.errorResponDataManual,
   };
};

class FaceScanManual extends Component {

   constructor(props) {
      super(props);
      this.state = { disableButton: false };
      localStorage.removeItem('user')
   }

   componentDidMount() {
    
      
   }
   
   componentDidUpdate() {

   }

   handleSubmit(data) {
      
   }

   render() {
      return (
         <div style={{ minHeight: "900px" }}>
            <GuestNavbarComponentManual />
            <Container>
                <canvas id="capture" width="320" height="240"></canvas>
            </Container>
        </div>


      );
   }
}

export default connect(mapStateToProps, null)(FaceScanManual);
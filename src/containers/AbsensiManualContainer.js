import React, { Component } from "react";
import { reset } from 'redux-form';
import { connect } from "react-redux";
import { cekUserAfterFinger, getOptUserManual, setOnline, takeScreenShoot } from "../actions/optAction";
import FormAbsensiManual from "../components/FormAbsensiManual";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Modal, Col, Container, Row, Alert, Button } from "reactstrap";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminOnDuty, syncToLocal, syncToServer } from "../actions/adminAction";
import { postManualMasuk, resetProps } from "../actions/manualAction";
import swal from "sweetalert";
import LaporanDetail2 from "../components/LaporanDetail2";
import OnDutyRoster from "../components/OnDutyRoster";
import { getLaporanHead, getLaporanList, resetLaporan } from "../actions/laporanAction";
import { getUserDetail, verifikasiFingerPrint } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import { getListPengumuman } from "../actions/pengumumanAction";
import RecentPengumumanComponent from "../components/RecentPengumumanComponent";
import RecentPengumumanTableComponent from "../components/RecentPengumumanTableComponent";

import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8081');
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapStateToProps = (state) => {
   return {
      getResponDataManual: state.Manual.getResponDataManual,
      errorResponDataManual: state.Manual.errorResponDataManual,
      getAfterFinger:state.Opt.getAfterFinger,
      errorgetAfterFinger:state.Opt.errorgetAfterFinger,
      getAdminOnDuty: state.Admin.getAdminOnDuty,
      getOptUserManual: state.Admin.getOptUserManual,
      errorAdminOnDuty:state.Admin.errorAdminOnDuty,
      isOnline:state.Opt.isOnline,
   };
};

class AbsensiManualContainer extends Component {

   constructor(props) {
      super(props);
      this.state = { 
         disableButton: false, 
         modal: false,
         borderColor:"#fff",
         key: null,
         base64:null,
         UserID:null,
         isChecking:false,
      };
   }

   componentDidMount() {
      this.props.dispatch(cekUserAfterFinger(null));
      this.props.dispatch(getOptUserManual());
      this.props.dispatch(getAdminOnDuty());
      this.props.dispatch(resetLaporan())
      this.props.dispatch(getListPengumuman('all'));
      this.props.dispatch(syncToServer())

      client.onopen = () => {
         // console.log('WebSocket Client Connected');
         // console.log(client)
      };

      client.onmessage = (message) => {
         let result = JSON.parse(message.data).data;
         
         if(result.Key == this.state.key){
            if(result.Status == "cancel"){
               this.setState({
                  ...this.state,
                  modal:false,
                  key:null
                  // color:"#02a200"
               })
   
            }
            if(result.Status == "done"){
               this.setState({
                  ...this.state,
                  key:null,
                  base64:result.FP,
                  borderColor:"green",
                  UserID:result.UserID,
                  modal:false
               })
               this.props.dispatch(cekUserAfterFinger(result.UserID, "masuk", this.props.isOnline))
               takeScreenShoot(this.state.UserID+"_MASUK_FP")
            }
         }

      };


   }

   openFingerForm() {
      let key = new Date().getTime()
      this.props.dispatch(verifikasiFingerPrint(key))
      this.props.dispatch(cekUserAfterFinger(null))
      this.props.dispatch(getOptUserManual());
      this.setState({
         ...this.state,
         modal: true,
         borderColor:"#fff",
         key:key,
         base64:null,
         UserID:null,
      })
   }

   componentDidUpdate() {
      if(this.props.errorAdminOnDuty == 'Network Error'){
         this.props.dispatch(setOnline(false))
      }else{
         this.props.dispatch(setOnline(true))
      }

      // singkron ke local db data absen masuk
      if(this.props.getAdminOnDuty && !this.props.errorAdminOnDuty){
         this.props.dispatch(syncToLocal(this.props.getAdminOnDuty))
      }

      if(this.props.getAfterFinger){
         if(this.props.getAfterFinger.status == 0){
            swal("Failed!", this.props.getAfterFinger.message, "error")
            this.props.dispatch(cekUserAfterFinger(null))
            this.setState({
               ...this.state,
               borderColor:"#fff",
               base64:null,
               // UserID:this.props.getAfterFinger.UserID
            })
         }
         
         takeScreenShoot(this.state.UserID+"_MASUK_OK")
         // this.props.dispatch(cekUserAfterFinger(null))
      }

      if(this.props.errorgetAfterFinger){
         takeScreenShoot(this.state.UserID+"_MASUK_ERR")
         swal("Failed!", this.props.errorgetAfterFinger, "error")
         this.props.dispatch(cekUserAfterFinger(null))
      }

      if (this.props.getResponDataManual || this.props.errorResponDataManual) {
         if (this.props.errorResponDataManual) {
            swal("Failed!", this.props.errorResponDataManual, "error");
            window.location.reload();
         } else {
            swal("Berhasil Absen!", "~", "success")
            .then(()=>{
               this.setState({
                  ...this.state,
                  disableButton: false,
                  modal:false
               })
            });
            this.props.dispatch(getOptUserManual());
            this.props.dispatch(getAdminOnDuty());
            this.props.dispatch(reset('FormAbsensiManual'));  // requires form name
            if(this.props.getResponDataManual.DatangID){
               this.props.dispatch(getLaporanList(this.props.getResponDataManual.UserID));
               this.props.dispatch(getLaporanHead(this.props.getResponDataManual.UserID));
            }
         }

         this.props.dispatch(resetProps())
         this.props.dispatch(cekUserAfterFinger(null))
         this.setState({
            ...this.state,
            base64:null,
            borderColor:"#fff"
         })
      }
   }

   handleSubmit(data) {
      if (!this.state.disableButton) {
         this.setState({
            ...this.state,
            modal: true,
            disableButton: true
         },()=>{
            this.props.dispatch(postManualMasuk(data, this.props.isOnline));
         })
      }
   }

   cekKoneksi(){
      this.props.dispatch(getAdminOnDuty());
   }

   render() {
      return (
         <div style={{ minHeight: "900px" }}>
            <Modal
               isOpen={this.state.modal}
               backdropTransition={{ timeout: 0 }}
               modalTransition={{ timeout: 0 }}
               fade={false}
               className="modal-lg custom-modal"
               centered={true} style={{ textAlign: "center" }}>
               {/* #00BFFF */}
               <Loader
                  type="Oval"
                  color="#FFF"
                  height={60}
                  width={60}
               />
            </Modal>

            <GuestNavbarComponentManual />
            <Container
               style={{
                  maxWidth: "100%",
                  marginTop: "6px"
               }}>
               {!this.props.isOnline ? 
                  (
                     <Alert color="danger">
                        Koneksi ke server / Internet terputus. Anda masih bisa absensi. <Button size="sm" color="success">Cek Ulang Koneksi</Button>
                     </Alert>
                  ) : ("")
               }
               <Row>
                  <Col md={7} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                     <div style={{ backgroundColor: "#f9a826" }} class="p-2 mb-2">
                        <Container>
                           <Row>
                              <Col md={6}>
                                 <h3 class="text-left mt-2 mb-2">Absen Masuk</h3>
                              </Col>
                              <Col md={6}>
                                 <h4 class="text-right mt-2 mb-2">
                                    <Ambilwaktu 
                                       isOnline={this.props.isOnline} 
                                       cek={()=>{this.cekKoneksi()}}
                                       />
                                 </h4>
                              </Col>
                           </Row>

                           <FormAbsensiManual
                              base64={this.state.base64}
                              borderColor={this.state.borderColor}
                              onclick={() => { this.openFingerForm() }}
                              disableButton={this.state.disableButton}
                              onSubmit={(data) => this.handleSubmit(data)}
                           />
                        </Container>
                     </div>
                     <LaporanDetail2 />
                  </Col>
                  <Col md={3} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                     <OnDutyRoster />
                  </Col>
                  <Col md={2} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                     <RecentPengumumanComponent />
                  </Col>
               </Row>
            </Container>

         </div>

      );
   }
}

export default connect(mapStateToProps, null)(AbsensiManualContainer);
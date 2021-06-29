import React, { Component } from "react";
import { reset } from 'redux-form';
import { connect } from "react-redux";
import { cekUserAfterFinger, getOptUserManualKembaliIst , takeScreenShoot} from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import {Row, Col, Container, Modal } from "reactstrap";
import FormAbsensiManualIstKembali from "../components/FormAbsensiManualIstKembali";
import swal from "sweetalert";
import { putManualKemIstirahat, resetProps } from "../actions/manualAction";
import OnDutyRoster from "../components/OnDutyRoster";
import Ambilwaktu from "../components/Ambilwaktu";
import { getAdminOnDuty } from "../actions/adminAction";
import { getLaporanList, resetLaporan } from "../actions/laporanAction";
import LaporanDetail2 from "../components/LaporanDetail2";
import RecentPengumumanComponent from "../components/RecentPengumumanComponent";
import { getListPengumuman } from "../actions/pengumumanAction";

import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8081');
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { verifikasiFingerPrint } from "../actions/userAction";

const mapStateToProps = (state) => {
   return {
      getResponDataManual: state.Manual.getResponDataManual,
      errorResponDataManual: state.Manual.errorResponDataManual,
      getAfterFinger:state.Opt.getAfterFinger,
      errorAfterFinger:state.Opt.errorAfterFinger
   };
};
class AbsensiManualContainerIstKembali extends Component {

   constructor(props) {
      super(props);
      this.state = { 
         disableButton: false, 
         modal: false,
         borderColor:"#fff",
         key: null,
         base64:null
      };
   }

   componentDidMount() {
      this.props.dispatch(cekUserAfterFinger(null));
      this.props.dispatch(getAdminOnDuty());
      this.props.dispatch(getOptUserManualKembaliIst());
      this.props.dispatch(resetLaporan())
      this.props.dispatch(getListPengumuman(0,20))

      client.onopen = () => {
         // console.log('WebSocket Client Connected');
         // console.log(client)
      };

      client.onmessage = (message) => {
         let result = JSON.parse(message.data).data;
         console.log(result)
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
                  modal:false,
                  key:null,
                  base64:result.FP,
                  borderColor:"green",
                  UserID:result.UserID
               })
               this.props.dispatch(cekUserAfterFinger(this.state.UserID, "istkembali"))
               takeScreenShoot(this.state.UserID+"_ISTKEMBALI")
            }
         }

      };

   }

   openFingerForm() {
      let key = new Date().getTime()
      this.props.dispatch(verifikasiFingerPrint(key))
      this.props.dispatch(cekUserAfterFinger(null))
      this.props.dispatch(getOptUserManualKembaliIst());
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
      if(this.props.getAfterFinger){
         if(this.props.getAfterFinger.status == 0){
            swal("Failed!", this.props.getAfterFinger.message, "error")
            this.props.dispatch(cekUserAfterFinger(null))
            this.setState({
               ...this.state,
               borderColor:"#fff",
            })
         }
         setTimeout(() => {
            takeScreenShoot(this.state.UserID+"_ISTKEMBALI_OK")
         }, 300);
      }

      if(this.props.errorgetAfterFinger){
         takeScreenShoot(this.state.UserID+"_ISTKEMBALI_ERR")
         swal("Failed!", this.props.errorgetAfterFinger, "error")
         this.props.dispatch(cekUserAfterFinger(null))
      }

      if (this.props.getResponDataManual || this.props.errorResponDataManual) {
         if (this.props.errorResponDataManual) {
            swal("Failed!", this.props.errorResponDataManual, "error");
            window.location.reload();
         } else {
            swal("Berhasil Absen!", "Kembali Istirahat", "success");
            this.props.dispatch(getAdminOnDuty());
            this.props.dispatch(getOptUserManualKembaliIst());
            this.props.dispatch(getLaporanList(this.props.getResponDataManual.UserID));
            this.props.dispatch(reset('FormAbsensiManualIstKembali'));
         }
         this.setState({
            disableButton: false
         })
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
         this.props.dispatch(putManualKemIstirahat(data));
         this.setState({
            disableButton: true
         })
      }
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
               <Row>
                  <Col md={7} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                     <div style={{ backgroundColor: "#f9a826" }} class="p-2 mb-2">
                        <Container>
                           <Row>
                              <Col md={6}>
                                 <h3 class="text-left mt-2 mb-2">Istirahat Kembali</h3>
                              </Col>
                              <Col md={6}>
                                 <h4 class="text-right mt-2 mb-2">
                                    <Ambilwaktu />
                                 </h4>
                              </Col>
                           </Row>

                           <FormAbsensiManualIstKembali
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
            {/* <Container
               style={{
                  maxWidth: "100%",
                  marginTop: "16px"
               }}>
               <Row>
                  <Col md={7} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                     <div style={{ backgroundColor: "#f9a826" }} class="p-2 mb-2">
                        <h3 class="text-center mt-2 mb-2">Absen Istirahat Kembali</h3>
                        <h4 class="text-center mt-2 mb-2">
                           <Ambilwaktu />
                        </h4>
                        <Container>
                           <FormAbsensiManualIstKembali
                              onSubmit={(data) => this.handleSubmit(data)}
                           />
                        </Container>
                     </div>
                     <LaporanDetail2 />
                  </Col>
                  <Col md={3} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                     <OnDutyRoster />
                  </Col>
                  <Col md={2} style={{paddingLeft:"5px",paddingRight:"5px"}}>
                     <RecentPengumumanComponent />
                  </Col>
               </Row>
            </Container> */}
         </div>
      );
   }
}

export default connect(mapStateToProps, null)(AbsensiManualContainerIstKembali);
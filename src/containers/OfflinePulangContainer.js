import React, { Component } from "react";
import { reset } from 'redux-form';
import { connect } from "react-redux";
import { cekUserAfterFinger, checkConn, getOptUserManualPulang, setOnline, takeScreenShoot } from "../actions/optAction";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import { Col, Container, Row, Modal } from "reactstrap";
import FormAbsensiManual2 from "../components/FormAbsensiManual2";
import { getAdminOnDuty } from "../actions/adminAction";
import { putManualPulang, resetProps } from "../actions/manualAction";
import swal from "sweetalert";
import OnDutyRoster from "../components/OnDutyRoster";
import Ambilwaktu from "../components/Ambilwaktu";
import LaporanDetail2 from "../components/LaporanDetail2";
import { getLaporanList, resetLaporan } from "../actions/laporanAction";
import RecentPengumumanComponent from "../components/RecentPengumumanComponent";
import { getListPengumuman } from "../actions/pengumumanAction";

import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8081');

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { verifikasiFingerPrint } from "../actions/userAction";
import OfflineNavbar from "../components/OfflineNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain, faPowerOff, faServer } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => {
   return {
      getResponDataManual: state.Manual.getResponDataManual,
      errorResponDataManual: state.Manual.errorResponDataManual,
      getAfterFinger:state.Opt.getAfterFinger,
      errorAfterFinger:state.Opt.errorAfterFinger,
      isOnline: state.Opt.isOnline,
   };
};

class OfflinePulangContainer extends Component {

   constructor(props) {
      super(props);
      this.state = {
         disableButton: false,
         modal: false,
         borderColor: "#fff",
         key:null,
         base64:null
      };
   }

   componentDidMount() {
      this.props.dispatch(setOnline(false))
      localStorage.setItem('checkConn',1)
      this.cekKoneksi()
      
      this.props.dispatch(cekUserAfterFinger(null))
      this.props.dispatch(getAdminOnDuty(false));
      this.props.dispatch(getOptUserManualPulang(false));
      // this.props.dispatch(resetLaporan())
      

      client.onopen = () => {
         // console.log('WebSocket Client Connected');
         // console.log(client)
      };

      client.onmessage = (message) => {
         let result = JSON.parse(message.data).data;
         if(result.Key == this.state.key){
            // console.log(message.data)

            if (result.Status == "cancel") {
               this.setState({
                  ...this.state,
                  modal: false,
                  key:null
                  // color:"#02a200"
               })

            }
            if (result.Status == "done") {
               this.setState({
                  ...this.state,
                  modal: false,
                  key:null,
                  base64:result.FP,
                  borderColor:"green",
                  UserID:result.UserID
               })
               this.props.dispatch(cekUserAfterFinger(this.state.UserID,"pulang", false))
               takeScreenShoot(this.state.UserID+"_PULANG")
            }
         }
      };
   }

   openFingerForm() {
      let key = new Date().getTime()
      this.props.dispatch(verifikasiFingerPrint(key))
      this.props.dispatch(cekUserAfterFinger())
      this.props.dispatch(getOptUserManualPulang(false));
      this.setState({
         ...this.state,
         modal: true,
         borderColor: "#fff",
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
               base64:null
            })
         }
         setTimeout(() => {
            takeScreenShoot(this.state.UserID+"_PULANG_OK")
         }, 0);
      }

      if(this.props.errorgetAfterFinger){
         takeScreenShoot(this.state.UserID+"_PULANG_OK")
         swal("Failed!", this.props.errorgetAfterFinger, "error")
         this.props.dispatch(cekUserAfterFinger(null))
      }

      if (this.props.getResponDataManual || this.props.errorResponDataManual) {
         if (this.props.errorResponDataManual) {
            swal("Failed!", this.props.errorResponDataManual, "error");
            // window.location.reload();
         } else {
            swal("Berhasil Absen Pulang!", "~", "success");
            this.props.dispatch(getAdminOnDuty(false));
            this.props.dispatch(getOptUserManualPulang(false));
            //this.props.dispatch(getLaporanList(this.props.getResponDataManual.UserID));
            this.props.dispatch(reset('FormAbsensiManual2'));
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
         this.props.dispatch(putManualPulang(data, false));
         this.setState({
            disableButton: true,
            base64:null,
         })
      }
   }

   cekKoneksi(){
      
      this.props.dispatch(checkConn());
      setTimeout(() => {
         localStorage.removeItem('checkConn')
         
      }, 500);
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
            <OfflineNavbar />
            <Container
               style={{
                  maxWidth: "100%",
                  marginTop: "6px"
               }}>
                <Row>
                  {this.props.isOnline ? 
                     <Col md="12"  style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                        <div className="alert alert-success" style={{overflow:"hidden"}}> 
                           <FontAwesomeIcon icon={faServer} />    &nbsp;
                           Interent atau Server Absensi sedang Up 
                           {/* <Button style={{marginLeft:"5px", float:"right"}} color="primary" onClick={()=>this.syncToServer()}>
                              <FontAwesomeIcon icon={faSync} size="xs" /> Singkron & Kembali Ke Absenis Online
                           </Button> */}
                        </div>
                     </Col>
                        :
                     <Col md="12"  style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                           <div className="alert alert-danger"><FontAwesomeIcon icon={faServer} /> Interent atau Server Absensi sedang Down </div>
                     </Col>
                  }
                </Row>
               <Row>
                  <Col md={8} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                     <div style={{ backgroundColor: "#f9a826" }} class="p-2 mb-2">
                        <Container>
                           <Row>
                              <Col md={6}>
                                 <h3 class="text-left mt-2 mb-2">Absen Pulang Offline</h3>
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
                           <FormAbsensiManual2
                              base64={this.state.base64}
                              borderColor={this.state.borderColor}
                              onclick={() => { this.openFingerForm() }}
                              onSubmit={(data) => this.handleSubmit(data)}
                              online={false}
                           />
                        </Container>
                     </div>
                     
                  </Col>
                  <Col md={4} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                     <OnDutyRoster online={false} />
                  </Col>
               </Row>
            </Container>
         </div>
      );
   }
}

export default connect(mapStateToProps, null)(OfflinePulangContainer);
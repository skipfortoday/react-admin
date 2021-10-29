import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import {
  getLaporanDetail,
  getLaporanDetail2,
  postPrint,
  resetLaporan,
  setLoading,
  startPrintServer,
  stopPrintServer
} from "../actions/laporanAction";
import { getOptUser } from "../actions/optAction";
import { Container, Row, Spinner, Modal, Button } from "reactstrap";
import NamaCabangLaporan from "../components/NamaCabangLaporan";
import RekapLaporan from "../components/RekapLaporan";
import LaporanDetail from "../components/LaporanDetail";
import SummaryLaporan from "../components/SummaryLaporan";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import FormLaporan2 from "../components/FormLaporan2";
import NamaCabangLaporan2 from "../components/NamaCabangLaporan2";
import RekapLaporan2 from "../components/RekapLaporan2";
import LaporanDetailBanyak from "../components/LaporanDetailBanyak";
import SummaryLaporan2 from "../components/SummaryLaporan2";
import { right } from "@popperjs/core";
import PrintContainer from "./PrintContainer";

const mapStateToProps = (state) => {
  return {
    allLaporan:state.Laporan.laporanBanyak,
    waitPrinting: state.Laporan.waitPrinting
  };
};

class ListLaporanContainer2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willPrinting:false,
      loading:false,
    }
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
    this.props.dispatch(startPrintServer())
  }

  handleSubmit(data) {
    let Nama = [];
    data.Nama.map((item)=>{
      Nama.push(item.value)
    })
    
    this.props.dispatch(resetLaporan());
    this.props.dispatch(getLaporanDetail2())
    this.props.dispatch(getLaporanDetail2(Nama, data.TglAwal, data.TglAkhir))
    if(data.type == 'printview'){
      this.setState({
        ...this,
        willPrinting:true
      })
    }

    this.setState({
      ...this,
      loading:true,
    })
    this.props.dispatch(postPrint(null))
  }
  

  componentDidUpdate(prevProps, prevState){
    if(!prevProps.allLaporan && this.props.allLaporan){
      if(this.state.willPrinting) this.props.dispatch(postPrint(this.props.allLaporan))
      
      this.setState({
          ...this.state,
          loading:!this.state.willPrinting && this.props.waitPrinting,
          willPrinting:false
      })
    }
  }


  componentWillUnmount(){
    this.props.dispatch(resetLaporan())
    this.props.dispatch(stopPrintServer())
  }

  render() {
    if(this.props.allLaporan){
      this.props.dispatch(setLoading(false))
    }

    return (
      <div style={{minHeight:900}}  ref={this.myRef}>
        <Modal 
          isOpen={this.state.loading} 
          backdropTransition={{timeout:0}}
          modalTransition={{timeout:0}}
          fade={false}
          className="modal-lg custom-modal" 
          centered={true} style={{textAlign:"center"}}>
            {/* #00BFFF */}
          <Loader
            type="Oval"
            color="#FFF"
            height={60}
            width={60}
          />
        </Modal>

        <NavbarComponent />
        <div style={{ backgroundColor: "#f9a826" }} className="hide-onprint">
          <tr>
            <td width="150"></td>
            <td>
              <FormLaporan2
                onSubmit={(data) => this.handleSubmit(data)}
              />
            </td>
          </tr>
        </div>
        <PrintContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ListLaporanContainer2);

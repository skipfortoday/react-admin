import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersList } from "../actions/userAction";
import NavbarComponent from "../components/NavbarComponent";
import {
  getLaporanDetail,
  getLaporanDetail2,
  resetLaporan,
  setLoading
} from "../actions/laporanAction";
import { getOptUser } from "../actions/optAction";
import { Container, Row, Spinner, Modal } from "reactstrap";
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
    // getLaporanDetail: state.Laporan.getLaporanDetail,
    // getLaporanHead: state.Laporan.getLaporanHead,
    // errorLaporanDetail: state.Laporan.errorLaporanDetail,
    allLaporan:state.Laporan.laporanBanyak,
    isLoading:state.Laporan.isLoading
  };
};

class ListLaporanContainer2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willPrinting:false
    }
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getUsersList());
  }

  handleSubmit(data) {

    if(this.props.allLaporan && data.type == 'printview'){
      if(data.type == 'printview'){
        this.setState({
          ...this,
          willPrinting:true,
        })
      }
    }else{
      let Nama = [];
      data.Nama.map((item)=>{
        Nama.push(item.value)
      })
      
      this.props.dispatch(getLaporanDetail2())
      this.props.dispatch(getLaporanDetail2(Nama, data.TglAwal, data.TglAkhir));
      // this.props.dispatch(getLaporanDetail2(['SB1MIT005', 'SB1MIT012'], data.TglAwal, data.TglAkhir));
      this.props.dispatch(setLoading(true));
      if(data.type == 'printview'){
        this.setState({
          ...this,
          willPrinting:true,
        })
      }

    }

  }
  

  componentDidUpdate(prevProps, prevState){
    if(this.state.willPrinting && !this.props.isLoading){
      setTimeout(() => {
        window.print();
        // this.myRef.current.print()
        // console.log(this.myRef.current)
        // history.push("/print-preview")
        // this.props.history.push('/print-preview')
      }, 100);
      this.setState({
        ...this,
        willPrinting:false,
      })
    }

    if(!prevProps.allLaporan && this.props.allLaporan ){
      if(this.props.isLoading) this.props.dispatch(setLoading(false))
    }
  }

  componentWillUnmount(){
    this.props.dispatch(resetLaporan())
  }

  render() {
    if(this.props.allLaporan){
      this.props.dispatch(setLoading(false))
    }

    return (
      <div style={{minHeight:900}}  ref={this.myRef}>
        <Modal 
          isOpen={this.props.isLoading} 
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

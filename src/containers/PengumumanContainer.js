import React, { Component } from "react";
import { connect } from "react-redux";
import { getListPengumuman } from "../actions/pengumumanAction";
import NavbarComponent from "../components/NavbarComponent";
import PengumumanTableComponent from "../components/PengumumanTableComponent";
import { Modal } from "reactstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapStateToProps = (state) => {
    return {
        getListPengumuman:state.Pengumuman.getListPengumuman,
        filterPengumuman: state.Pengumuman.filterPengumuman,
        isLoading:state.Pengumuman.isLoading,
    };
};


class PengumumanContainer extends Component {
    componentDidMount(){
        this.props.dispatch(getListPengumuman(this.state.mode))
    }

    constructor(props){
        super(props)
        this.state = {
            mode:"all"
        }
    }

    setMode(mode){
        if(this.state.mode != mode){
            this.setState({
                ...this.state,
                mode:mode
            })
            this.props.dispatch(getListPengumuman(mode))
        } 
    }

    render(){
        return(
            <div style={{minHeight:"900px"}}>
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
                <div className="p-4">
                    <PengumumanTableComponent
                        setMode={(mode)=> {this.setMode(mode)}}
                        mode={this.state.mode}
                    />
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, null)(PengumumanContainer);
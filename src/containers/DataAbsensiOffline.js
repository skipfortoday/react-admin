import React, { Component } from "react";
import { connect } from "react-redux";
import { getCabangList, setPegawaiSelect } from "../actions/cabangAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import ListMutasiPegawai from "../components/ListMutasiPegawai";
import FormMutasiComponent from "../components/FormMutasiComponent";
import { getListMutasiPegawai, getUsersList, listAbsensiOffline, postMutasiPegawai } from "../actions/userAction";
import ListDataAbsensiOffline from "../components/ListDataAbsensiOffline";
import { postMasukOffline, putPulangOffline } from "../actions/manualAction";

const mapStateToProps = (state) => {
    return{
        listOffline:state.users.listOffline,
        postMasukOffline: state.Manual.postMasukOffline,
        errPostMasukOffline: state.Manual.errPostMasukOffline,
        putPulangOffline: state.Manual.putPulangOffline,
        errPutPulangOffline: state.Manual.errPutPulangOffline,
    }
}

class DataAbsensiOffline extends Component {

    constructor(props){
        super(props)
        this.state = {
            opsiFilter : [
                {value:'all', label : 'Semua data'},
                {value:'scync', label : 'Sudah disingkron'},
                {value:'unscync', label : 'Belum disingkron'},
            ],
            defaultFilter : {value:'unscync', label : 'Belum disingkron'},
            dataSync : []
        }
    }

    componentDidMount() {
        this.props.dispatch(listAbsensiOffline(this.state.defaultFilter.value))
    }

    handleFilterChange(val){
        this.setState({
            ...this.state,
            defaultFilter:val
        },() => {
            this.props.dispatch(listAbsensiOffline(null))
            this.props.dispatch(listAbsensiOffline(this.state.defaultFilter.value))
        }
        );
    }

    handleUploadServer(data){
        
        if(data.action == "masuk"){
            this.props.dispatch(postMasukOffline(data));
        }

        if(data.action == "pulang"){
            this.props.dispatch(putPulangOffline(data));
        }

    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps.putPulangOffline,this.props.putPulangOffline)
        if(!prevProps.postMasukOffline && this.props.postMasukOffline){
            swal(
                "Proses Berhasil!",
                "Berhasil disimpan",
                "success"
              );
            
            this.props.dispatch(postMasukOffline())
            this.props.dispatch(listAbsensiOffline(this.state.defaultFilter.value))
        }

        if(!prevProps.putPulangOffline && this.props.putPulangOffline){
            swal(
                "Proses Berhasil!",
                "Berhasil disimpan",
                "success"
              );
            
            this.props.dispatch(putPulangOffline())
            this.props.dispatch(listAbsensiOffline(this.state.defaultFilter.value))
        }
    }


    render() {
        let ambil = JSON.parse(localStorage.getItem('user'));
        if (!localStorage.getItem('user') || ambil.Login === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/Login" />;
        }

        if(ambil.RoleAdmin != 99 && ambil.RoleAdmin != 1){
            swal("Failed!", "Anda tidak memiliki hak akses menu ini", "error");
            return <Redirect to="/" />;
        }
        
        console.log(this.props.listOffline)
        return (
            <div>
                <div style={{paddingLeft:20, paddingRight:20, paddingTop:10}}>
                    <h3>Data Absensi Offline</h3>
                    <br/>
                </div>
                <NavbarComponent />
                <ListDataAbsensiOffline 
                    opsiFilter={this.state.opsiFilter}
                    defaultFilter={this.state.defaultFilter}
                    listOffline={this.props.listOffline}
                    handleFilterChange={(val)=> {this.handleFilterChange(val)}}
                    handleUploadServer={(val)=> {this.handleUploadServer(val)}}
                    />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(DataAbsensiOffline);
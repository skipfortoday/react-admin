import React, { Component } from "react";
import { connect } from "react-redux";
import { getCabangList, setPegawaiSelect } from "../actions/cabangAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import ListMutasiPegawai from "../components/ListMutasiPegawai";
import FormMutasiComponent from "../components/FormMutasiComponent";
import { getListMutasiPegawai, getUserListServer, getUsersList, postMutasiPegawai } from "../actions/userAction";

const mapStateToProps = (state) => {
    return{
        resPostMutasi:state.users.resPostMutasi,
        listMutasi: state.users.getListMutasi,
    }
}

class MutasiPegawaiContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getCabangList());
        this.props.dispatch(getListMutasiPegawai());
        this.props.dispatch(getUsersList(true))
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevProps.resPostMutasi && this.props.resPostMutasi){
            swal(
                "Proses Berhasil!",
                this.props.resPostMutasi.message,
                "success"
              );
              this.props.dispatch(postMutasiPegawai(null))
              this.props.dispatch(setPegawaiSelect(null))
              this.props.dispatch(getListMutasiPegawai())
              this.props.dispatch(getUsersList(true))
        }
    }

    handleSubmit(data){
        // console.log(data)
        this.props.dispatch(postMutasiPegawai(data))
    }
    render() {
        let ambil = JSON.parse(localStorage.getItem('user'));
        if (!localStorage.getItem('user') || ambil.Login === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/Login" />;
        }

        if(ambil.RoleAdmin != 99){
            swal("Failed!", "Anda tidak memiliki hak akses menu ini", "error");
            return <Redirect to="/" />;
        }
        

        return (
            <div>
                <div style={{paddingLeft:20, paddingRight:20, paddingTop:10}}>
                    <h3>Mutasi Pegawai</h3>
                    <br/>
                </div>
                <NavbarComponent />
                <FormMutasiComponent onSubmit={(data) => this.handleSubmit(data)}/>
                <ListMutasiPegawai listMutasi={this.props.listMutasi} />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(MutasiPegawaiContainer);
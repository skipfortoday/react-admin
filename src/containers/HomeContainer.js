import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TableUserComponent from "../components/TableUserComponent";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser, getLocalFingerPrint, registerFingerPrint, deleteFingerprint, downloadUser } from "../actions/userAction";

import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8081');
import { Modal } from "reactstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapStateToProps = (state) => {
    return {
        getResponLoginUser: state.Login.getResponLoginUser,
        getLocalFp: state.users.getLocalFp,
        deleteFp: state.users.deleteFp,
        errorDeleteFp: state.users.errorDeleteFp,
        downloadUser: state.users.downloadUser
    };
};


class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: null,
            modal: false
        }
    }

    regFingerprint(UserID) {
        let key = new Date().getTime();
        this.props.dispatch(registerFingerPrint(UserID, key));
        this.setState({
            ...this.state,
            key: key,
            modal: true,
        })
    }

    delFingerprint(UserID, Nama){
        swal({
            title: "Anda yakin akan menghapus fingerprint "+UserID+" - "+Nama+" ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.dispatch(deleteFingerprint(UserID))
            }
        });
    }

    componentDidMount() {
        this.props.dispatch(deleteDataUser());
        this.props.dispatch(getUsersList(false, true));

        client.onopen = () => {
            // console.log('WebSocket Client Connected');
            // console.log(client)
        };

        client.onmessage = (message) => {
            let result = JSON.parse(message.data).data;
            if (result.Key == this.state.key) {
                // console.log(message.data)

                if (result.Status == "cancel") {
                    this.setState({
                        ...this.state,
                        key: null,
                        modal:false
                    })

                }
                if (result.Status == "done") {
                    this.setState({
                        ...this.state,
                        key: null,
                        modal:false
                    })
                    swal("Berhasil!", "Berhasil Mendaftar SIdik Jari", "success")
                    this.props.dispatch(getUsersList());
                }
            }
        };
    }

    componentDidUpdate() {
        if (this.props.deleteFp) {
            if(this.props.deleteFp.status){
                swal("Sukses", this.props.deleteFp.message, "success")
            }else{
                swal("Gagal", this.props.deleteFp.message, "error")
            }
            this.props.dispatch(deleteFingerprint())
            this.props.dispatch(getUsersList());
        }

        if(this.props.errorDeleteFp){
            swal("Gagal", this.props.errorDeleteFp, "error")
            this.props.dispatch(deleteFingerprint())
        }

        if(this.props.downloadUser){
            if(this.props.downloadUser.status){
                swal("Sukses", this.props.downloadUser.message, "success")
                this.props.dispatch(getUsersList(false, true));
            }else{
                swal("Gagal", this.props.downloadUser.message, "error")
            
            }
            this.props.dispatch(downloadUser())
        }

    }

    render() {
        if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
            swal("Failed!", "Login Dulu", "error");
            return <Redirect to="/Login" />;
        }
        return (
            <div>
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
                <NavbarComponent />
                <TableUserComponent
                    regFingerprint={(UserID) => this.regFingerprint(UserID)}
                    delFingerprint={(UserID, Nama) => this.delFingerprint(UserID, Nama)}
                // setKey={(key) => this.setKey(key)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(HomeContainer);

import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { postAdminCreate } from "../actions/adminAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import GoBackComponent from "../components/GoBackComponent";
import PengumumanFormComponent from "../components/PengumumanFormComponent";
import { getDetailPengumuman, getListCbCabang, getListCbGroup, savePengumuman } from "../actions/pengumumanAction";

import { Modal } from "reactstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapStateToProps = (state) => {
    return {
        listCbCabang: state.Pengumuman.listCbCabang,
        listCbGroup: state.Pengumuman.listCbGroup,
        resSavePengumuman: state.Pengumuman.resSavePengumuman,
        errorResSavePengumuman: state.Pengumuman.errorResSavePengumuman,
        isLoading: state.Pengumuman.isLoading
    };
};


class PengumumanEditContainer extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('user'));
        let config = JSON.parse(localStorage.getItem('config'));
        this.state = {
            user: user,
            uploadFile: null,
            contentIsi: "",
        }
    }

    componentDidMount() {
        this.props.dispatch(getListCbCabang(this.state.user.RoleAdmin, this.props.match.params.id, null));
        this.props.dispatch(getListCbGroup(this.state.user.RoleAdmin, this.props.match.params.id, null));
        if (this.props.match.params.id) this.props.dispatch(getDetailPengumuman(this.props.match.params.id));
        else {
            setTimeout(() => {
                this.props.dispatch(getDetailPengumuman(null));
            }, 0);
        }
    }

    componentWillUnmount() {
        this.props.dispatch(getDetailPengumuman(null))
    }

    handleSubmit(data) {

        data.file = this.state.uploadFile;
        data.id = this.props.match.params.id ? this.props.match.params.id : 0;

        let cCabangs = [];
        let cGroups = [];
        if (this.props.listCbCabang) {
            this.props.listCbCabang.map((item) => {
                if (item.isChecked) cCabangs.push(item.value);
            });

        }
        data.KodeCabang = cCabangs.length > 0 ? "-" + cCabangs.join("-,-") + "-" : "";

        if (this.props.listCbGroup) {
            this.props.listCbGroup.map((item) => {
                if (item.isChecked) cGroups.push(item.value);
            });
        }
        data.Group = cGroups.length > 0 ? "-" + cGroups.join("-,-") + "-" : "";
        data.Aktif = data.Aktif == "1" ? "true" : "false";
        data.Pinned = data.Pinned == "1" ? "true" : "false";
        data.Isi = this.state.contentIsi;
        this.props.dispatch(savePengumuman(data));
    }

    goBackClick() {
        this.props.history.goBack();
    }

    selectFile(file) {
        this.setState({
            ...this.state,
            uploadFile: file
        })
    }

    componentDidUpdate() {
        console.log(this.state.contentIsi)
    }
    editingIsi(text) {
        this.setState({
            ...this.state,
            contentIsi: text
        })
    }

    componentDidUpdate() {
        if (this.props.resSavePengumuman) {
            swal(
                this.props.resSavePengumuman.status ? "Berhasil!" : "Gagal!",
                this.props.resSavePengumuman.message,
                this.props.resSavePengumuman.status ? "success" : "error",
            ).then(() => {
                this.goBackClick();
            })
        }
        if (this.props.errorResSavePengumuman) {
            swal("Failed!", this.props.errorResSavePengumuman, "error");
        }
        this.props.dispatch(savePengumuman(null));
    }

    render() {
        if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/home" />;
        }

        return (
            <div>
                <NavbarComponent />
                <Modal
                    isOpen={this.props.isLoading}
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
                <div className="mt-2" >
                    <div style={{ minHeight: "900px", padding: "20px" }}>
                        <GoBackComponent title={this.props.match.params.id ? "Edit Pengumuman" : "Tambah Pengumuman"}
                            functionClick={() => this.goBackClick()} />
                        <PengumumanFormComponent
                            onSubmit={(data) => this.handleSubmit(data)}
                            functionFile={(file) => this.selectFile(file)}
                            functionIsi={(text) => this.editingIsi(text)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(PengumumanEditContainer);
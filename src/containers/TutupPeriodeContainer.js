import React, { Component } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import GoBackComponent from "../components/GoBackComponent";
import { getDetailPengumuman, getListCbCabang, getListCbGroup } from "../actions/pengumumanAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import PengumumanDetailComponent from "./PengumumanDetailComponent";
import { Container, Button, Badge } from "reactstrap";
import { getListPeriode } from "../actions/laporanAction";
import { siteConfig } from "../config";

const mapStateToProps = (state) => {
    return {
        getListPeriode : state.Laporan.getListPeriode
    };
};


class TutupPeriodeContainer extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('user'));
        let config = JSON.parse(localStorage.getItem('config'));
        this.state = {
            user: user,
        }
    }

    componentDidMount() {
        this.props.dispatch(getListPeriode());
    }



    render() {
        if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/home" />;
        }

      
        return (
            <div style={{ minHeight: "900px" }}>
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
                    
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(TutupPeriodeContainer);
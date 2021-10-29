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
import { Col, Modal, Row } from "reactstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import PengumumanDetailComponent from "./PengumumanDetailComponent";
import { Container, Button, Badge } from "reactstrap";
import { getDetailPeriode, getListPeriode, postPeriode, putPeriode } from "../actions/laporanAction";
import { siteConfig } from "../config";
import ListPeriodeAbsensi from "../components/ListPeriodeAbsensi";
import FormTutupPeriode from "../components/FormTutupPeriode";

const mapStateToProps = (state) => {
    return {
        listPeriode : state.Laporan.listPeriode,
        postPeriode: state.Laporan.postPeriode,
        putPeriode:state.Laporan.putPeriode
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

    handleSubmit(data){
        data.Periode = data.Periode.value
        if(!data.id){
            this.props.dispatch(postPeriode(data))
        }else{
            this.props.dispatch(putPeriode(data))
        }
    }

    componentDidUpdate(prevProps){
        if(!prevProps.postPeriode && this.props.postPeriode){
            swal("Berhasil!", this.props.postPeriode.message, "success").
            then(()=>{
                this.props.dispatch(getDetailPeriode())
                this.props.dispatch(postPeriode())
                this.props.dispatch(getListPeriode());
            })
        }

        if(!prevProps.putPeriode && this.props.putPeriode){
            swal("Berhasil!", this.props.putPeriode.message, "success").
            then(()=>{
                this.props.dispatch(getDetailPeriode())
                this.props.dispatch(putPeriode())
                this.props.dispatch(getListPeriode());
            })
        }

        if(!prevProps.errPutPeriode && this.props.errPutPeriode){
            swal("Gagal!", this.props.errPutPeriode, "error").
            then(()=>{
                this.props.dispatch(putPeriode())
                this.props.dispatch(getListPeriode());
            })
        }
    }

    render() {
        if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/home" />;
        }

        // console.log(this.props.listPeriode)
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
                    <div style={{paddingLeft:"10px", paddingRight:"10px",paddingTop:10}}>
                        <h3>Periode Absensi</h3>
                    </div>
                    
                    <div style={{display:"block"}}>
                        <div style={{display:"inline-block", width:"65%"}} >
                            <ListPeriodeAbsensi 
                                // listPeriode={this.props.listPeriode}
                                // getDetailPeriode={this.getDetailPeriode}
                            />
                        </div>
                        <div style={{display:"inline-block", width:"30%", marginLeft:"10px"}} >
                            <FormTutupPeriode
                                onSubmit={(data) => this.handleSubmit(data)}
                            />
                        </div>
                    </div>                   
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(TutupPeriodeContainer);
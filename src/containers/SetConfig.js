import React from 'react'
import { Container, Navbar, Row, NavLink, NavItem, NavbarBrand , Collapse} from 'reactstrap'
import { Component } from 'react'
import FormConfig from './FormConfig'
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { postConfig, resetPostConfig } from '../actions/cabangAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBackward } from '@fortawesome/free-solid-svg-icons';


const mapStateToProps = (state) => {
    return {
        getResponseSetConfig: state.Cabang.getResponseSetConfig,
        errorResponseSetConfig: state.Cabang.errorResponseSetConfig
    }
}

class SetConfig extends Component {
    handleSubmit(data) {
        if (data) {
            this.props.dispatch(postConfig(data))
        }
    }

    componentDidUpdate() {
        if (this.props.getResponseSetConfig) {
            if (this.props.getResponseSetConfig.status) {
                let data = {
                    KodeCabang: this.props.getResponseSetConfig.KodeCabang,
                    NamaCabang: this.props.getResponseSetConfig.NamaCabang,
                }
                localStorage.setItem("config", JSON.stringify(data));

                swal("Berhasil", "Konfigurasi telah diset", "success").then(() => {
                    window.location.href = '/';
                })
            } else {
                swal("Gagal", "Kode Cabang atau Password tidak sesuai", "error");
            }
            console.log(this.props.getResponseSetConfig);
        }
        if (this.props.errorResponseSetConfig) {
            swal("Gagal", this.props.errorResponseSetConfig, "error");
        }
        this.props.dispatch(resetPostConfig())
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md" fixed="top">
                    <Container>
                        <Link to="/">
                            <NavLink style={{textDecoration:"none", color:"#FFF"}}>
                                <FontAwesomeIcon icon={faArrowLeft}/></NavLink>
                        </Link>
                        <NavbarBrand> KONFIGURASI SITE</NavbarBrand>
                    </Container>
                </Navbar>
                <Container>
                    <FormConfig onSubmit={(data) => this.handleSubmit(data)} />
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(SetConfig);
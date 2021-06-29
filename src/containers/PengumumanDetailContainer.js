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

const mapStateToProps = (state) => {
    return {
        getDetailPengumuman: state.Pengumuman.getDetailPengumuman
    };
};


class PengumumanDetailContainer extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('user'));
        let config = JSON.parse(localStorage.getItem('config'));
        this.state = {
            user: user,
        }
    }

    componentDidMount() {
        this.props.dispatch(getDetailPengumuman(this.props.match.params.id));
    }

    goBackClick() {
        this.props.history.goBack();
    }

    componentWillUnmount() {
        this.props.dispatch(getDetailPengumuman(null))
    }

    render() {
        if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/home" />;
        }

        let groups = [];
        let cabangs = [];
        if (this.props.getDetailPengumuman.Group) groups = this.props.getDetailPengumuman.Group.replaceAll('-', '').split(',');
        if (this.props.getDetailPengumuman.KodeCabang) cabangs = this.props.getDetailPengumuman.KodeCabang.replaceAll('-', '').split(',');

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
                    <div style={{ minHeight: "900px", padding: "20px" }}>
                        <GoBackComponent title="Detail Pengumuman"
                            functionClick={() => this.goBackClick()} />
                        <PengumumanDetailComponent/>
                        <Link
                            to={"/pengumuman/edit/" + this.props.getDetailPengumuman.id}
                            style={{ marginBottom: "5px" }}>
                            <Button
                                style={{ width: "300px" }}
                                size="md"
                                color="warning"
                                className="mb-2"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                                        Edit Pengumuman
                                    </Button>

                        </Link>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(PengumumanDetailContainer);
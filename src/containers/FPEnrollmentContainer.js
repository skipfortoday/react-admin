import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Col, Modal, Row } from 'reactstrap';

import { getUserDetail } from '../actions/userAction';
import GoBackComponent from '../components/GoBackComponent';
import NavbarComponent from '../components/NavbarComponent';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


const mapStateToProps = (state) => {
    return {
        user: state.users.getUserDetail
    };
};

class FPEnrollmentContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }

    componentDidMount() {
        this.props.dispatch(getUserDetail(this.props.match.params.UserID))
    }

    goBackClick() {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <NavbarComponent />
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
                <div style={{ padding: "20px" }} >
                    <GoBackComponent title="Enrolment Fingerprint"
                        functionClick={() => this.goBackClick()} />
                    <Row>
                        <Col md={8}>
                            <table className="table table-custom">
                                <tr>
                                    <td width="140px">UserID</td>
                                    <td width="50px" className="text-center">:</td>
                                    <td >{this.props.user.UserID}</td>
                                </tr>
                                <tr>
                                    <td width="140px">Nama</td>
                                    <td width="20px" className="text-center">:</td>
                                    <td >{this.props.user.Nama}</td>
                                </tr>
                                <tr>
                                    <td width="140px">Cabang</td>
                                    <td width="20px" className="text-center">:</td>
                                    <td >{this.props.user.NamaCabang}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="text-left">Sidik Jari</td>
                                </tr>
                                <tr>
                                    <td width="140px">Kiri</td>
                                    <td width="20px" className="text-center">:</td>
                                    <td >
                                        <Button
                                            
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;L1
                                        </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;L2
                                        </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;L3
                                        </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;L4
                                        </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;L5
                                        </Button>

                                    </td>
                                </tr>
                                <tr>
                                    <td width="140px">Kanan</td>
                                    <td width="20px" className="text-center">:</td>
                                    <td >
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;R1
                                            </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;R2
                                        </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;R3
                                            </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;R4
                                            </Button>
                                        <Button
                                            style={{ margin: "5px" }}>
                                            <FontAwesomeIcon
                                                icon={faFingerprint}
                                            /> &nbsp;R5
                                            </Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, null)(FPEnrollmentContainer);
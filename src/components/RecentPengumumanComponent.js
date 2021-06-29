import React, { Component, useState } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    List, Card, CardBody, CardHeader, CardTitle,
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import { getDetailPengumuman } from "../actions/pengumumanAction";
import PengumumanDetailComponent from "../containers/PengumumanDetailComponent";

const mapStateToProps = (state) => {
    return {
        listPengumuman: state.Pengumuman.getListPengumuman,
        detailPengumuman: state.Pengumuman.getDetailPengumuman
    };
};


class RecentPengumumanComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    toggle = () => {
        this.setState({
            ...this.state,
            open: !open
        })
        this.props.dispatch(getDetailPengumuman(null))
    }

    getDetail = (id) => {
        this.setState({
            ...this.state,
            open: true
        })
        this.props.dispatch(getDetailPengumuman(id))
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.open} toggle={this.toggle} className="modal-lg">
                    <ModalHeader toggle={this.toggle}>DETAIL PENGUMUMAN</ModalHeader>
                    <ModalBody>
                        <PengumumanDetailComponent />
                    </ModalBody>
                </Modal>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h6">Pengumuman</CardTitle>
                    </CardHeader>
                    <CardBody style={{ padding: "10px" }}>
                        <List type="unstyled">
                            {
                                this.props.listPengumuman ?
                                    this.props.listPengumuman.map((item) => {
                                        return (
                                            <li
                                                style={{
                                                    marginBottom: "10px",
                                                    borderBottom: "1px solid #efefef"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: "11px"
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;&nbsp;
                                                    {item.TglPosting}
                                                </div>
                                                <Link onClick={() => this.getDetail(item.id)}
                                                    style={{ color: "unset" }}>{item.Judul}</Link>
                                            </li>
                                        )
                                    })
                                    : ("")
                            }
                        </List>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default connect(mapStateToProps, null)(RecentPengumumanComponent);
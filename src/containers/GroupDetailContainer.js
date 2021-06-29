import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import FormGroupComponent from "../components/FormGroupComponent";
import { getGroupDetail, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import { getTerlambatBertingkatDetail } from "../actions/TerlambatBertingkatAction";
import GoBackComponent from "../components/GoBackComponent";

const mapStateToProps = (state) => {
    return {
        gdetail: state.Group.getGroupDetail,
        tbertingkat: state.TerlambatBertingkat.getTerlambatBertingkatDetail,
        errorResponDataGroup: state.Group.errorResponDataGroup,
    };
};

class GroupDetailContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
        this.props.dispatch(getTerlambatBertingkatDetail(this.props.match.params.GroupID))
    }

    rupiahFormat(x) {
        if (x == undefined) return "Rp " + 0;
        return "Rp " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    goBackClick() {
        this.props.history.goBack();
    }

    render() {
        if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/home" />;
        }

        return (
            <div style={{minHeight:"900px"}}>
                <NavbarComponent />
                <div style={{ padding: "20px" }} >
                    <GoBackComponent title="Detail Group Jabatan" 
                        functionClick={() => this.goBackClick()}
                        />
                    <Row>
                        <Col md={6}>
                            <table className="table table-custom">
                                <tr>
                                    <td style={{ width: "220px" }}>GroupID</td>
                                    <td style={{ width: "20px" }}>:</td>
                                    <td>{this.props.gdetail.GroupID}</td>
                                </tr>
                                <tr>
                                    <td>Jabatan</td>
                                    <td>:</td>
                                    <td>{this.props.gdetail.Jabatan}</td>
                                </tr>
                                <tr>
                                    <td>Libur Mingguan</td>
                                    <td>:</td>
                                    <td>{this.props.gdetail.AdaOff == 'true' ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td>Hari Libur</td>
                                    <td>:</td>
                                    <td>{this.props.gdetail.HariLibur}</td>
                                </tr>
                                <tr>
                                    <td>Cek Jam Kembali</td>
                                    <td>:</td>
                                    <td>{this.props.gdetail.CekJamKembali == 'true' ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                
                            </table>
                        </Col>
                        <Col md={6}>
                            <table className="table table-custom">
                                <tr>
                                    <td>Terlambat Bertingkat</td>
                                    <td>:</td>
                                    <td>{this.props.gdetail.RuleTerlambatBertingkat == 'true' ? 'Ya' : 'Tidak'}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "220px" }}>Lembur Perjam</td>
                                    <td style={{ width: "20px" }}>:</td>
                                    <td>{this.rupiahFormat(this.props.gdetail.RpLemburPerJam)}</td>
                                </tr>

                                <tr>
                                    <td>Potongan Terlambat</td>
                                    <td>:</td>
                                    <td>{this.rupiahFormat(this.props.gdetail.RpPotonganTerlambat)}</td>
                                </tr>

                                <tr>
                                    <td>Potongan Terlambat Kembali</td>
                                    <td>:</td>
                                    <td>{this.rupiahFormat(this.props.gdetail.RpPotonganTerlambatKembali)}</td>
                                </tr>

                                <tr>
                                    <td>Potongan Tidak Masuk</td>
                                    <td>:</td>
                                    <td>{this.rupiahFormat(this.props.gdetail.RpPotonganTidakMasuk)}</td>
                                </tr>
                            </table>
                        </Col>
                        <Col md={12}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Shift</th>
                                        <th>Jam Datang</th>
                                        <th>Jam Pulang</th>
                                        <th>Max Jam Datang</th>
                                        <th>Min Jam Lembur</th>
                                        <th>Jam Mulai Lembur</th>
                                        <th>Jam Istirahat</th>
                                        <th>Jam Kembali</th>
                                        <th>Pot. Bertingkat</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{textAlign:"center"}}>Shift 1</td>
                                        <td style={{textAlign:"center"}}>{this.props.gdetail.JamDatang}</td>
                                        <td style={{textAlign:"center"}}>{this.props.gdetail.JamPulang}</td>
                                        <td style={{textAlign:"center"}}>{this.props.gdetail.MaxJamDatang}</td>
                                        <td style={{textAlign:"center"}}>{this.props.gdetail.MinJamLembur}</td>
                                        <td style={{textAlign:"center"}}>{this.props.gdetail.JamMulaiLembur}</td>
                                        <td style={{textAlign:"center"}}>{this.props.gdetail.JamMulaiPagi}</td>
                                        <td style={{textAlign:"center"}}>{this.props.gdetail.MaxJamKembali}</td>
                                        <td>
                                            {
                                                this.props.tbertingkat ?
                                                    this.props.tbertingkat.map((item) => {
                                                        if (item.Shift == 1)
                                                            return (
                                                                <Row>
                                                                    <Col md={6}>{item.MaxJamDatang}</Col>
                                                                    <Col md={6} style={{ textAlign: "right" }}>{this.rupiahFormat(item.RpPotonganTerlambat)}</Col>
                                                                </Row>)
                                                    }) : "-"
                                            }
                                        </td>
                                    </tr>
                                    {this.props.gdetail.JamDatangSiang ? (
                                        <tr>
                                            <td style={{textAlign:"center"}}>Shift 2</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamDatangSiang}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamPulangSiang}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.MaxJamDatangSiang}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.MinJamLemburSiang}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamMulaiLemburSiang}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamMulaiSiang}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.MaxJamKembaliSiang}</td>
                                            <td style={{padding:"10px"}}>
                                                {
                                                    this.props.tbertingkat ?
                                                        this.props.tbertingkat.map((item) => {
                                                            if (item.Shift == 2)
                                                                return (
                                                                    <Row>
                                                                        <Col md={6}>{item.MaxJamDatang}</Col>
                                                                        <Col md={6} style={{ textAlign: "right" }}>{this.rupiahFormat(item.RpPotonganTerlambat)}</Col>
                                                                    </Row>)
                                                        }) : "-"
                                                }
                                            </td>
                                        </tr>
                                    ) : ""}

                                    {this.props.gdetail.JamDatangSore ? (
                                        <tr>
                                            <td style={{textAlign:"center"}}>Shift 3</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamDatangSore}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamPulangSore}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.MaxJamDatangSore}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.MinJamLemburSore}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamMulaiLemburSore}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.JamMulaiSore}</td>
                                            <td style={{textAlign:"center"}}>{this.props.gdetail.MaxJamKembaliSore}</td>
                                            <td style={{padding:"5px"}}>
                                                {
                                                    this.props.tbertingkat ?
                                                        this.props.tbertingkat.map((item) => {
                                                            if (item.Shift == 3)
                                                                return (
                                                                    <Row>
                                                                        <Col md={6}>{item.MaxJamDatang}</Col>
                                                                        <Col md={6} style={{ textAlign: "right" }}>{this.rupiahFormat(item.RpPotonganTerlambat)}</Col>
                                                                    </Row>)
                                                        }) : "-"
                                                }
                                            </td>
                                        </tr>
                                    ) : ""}
                                </tbody>

                            </table>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(GroupDetailContainer);
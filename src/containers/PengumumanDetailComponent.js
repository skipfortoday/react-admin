import React from 'react'
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";
import { Container, Button, Badge } from "reactstrap";



const mapStateToProps = (state) => {
    return {
        getDetailPengumuman: state.Pengumuman.getDetailPengumuman
    }
}

const PengumumanDetailComponent = (props) => {
    let groups = [];
    let cabangs = [];
    if (props.getDetailPengumuman.Group) groups = props.getDetailPengumuman.Group.replaceAll('-', '').split(',');
    if (props.getDetailPengumuman.KodeCabang) cabangs = props.getDetailPengumuman.KodeCabang.replaceAll('-', '').split(',');

    return (
        <div>
            <table className="table" style={{ border: "1px solid #ccc;" }}>
                <tr>
                    <td style={{ width: "130px" }}>Judul</td>
                    <td style={{ width: "20px" }}>:</td>
                    <td>{props.getDetailPengumuman.Judul}</td>
                </tr>
                <tr>
                    <td>NO IM</td>
                    <td>:</td>
                    <td>{props.getDetailPengumuman.KodeAuto}</td>
                </tr>
                <tr>
                    <td>Berlaku</td>
                    <td>:</td>
                    <td>{props.getDetailPengumuman.StartDate + " s.d " + props.getDetailPengumuman.EndDate}</td>
                </tr>
                <tr>
                    <td>Isi</td>
                    <td>:</td>
                    <td>{ReactHtmlParser(props.getDetailPengumuman.Isi)}</td>
                </tr>
                <tr>
                    <td>Gambar</td>
                    <td>:</td>
                    <td>{
                        props.getDetailPengumuman.LinkGambar ? (
                            <img
                                style={{ width: "1200px", maxWidth: "90%" }}
                                src={props.getDetailPengumuman.LinkGambar} />
                        ) : ""
                    }

                    </td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>:</td>
                    <td>{props.getDetailPengumuman.Aktif ? "Aktif" : "InAktif"}</td>
                </tr>
                <tr>
                    <td>Cabang</td>
                    <td>:</td>
                    <td>
                        {
                            cabangs.map((item) => {
                                return (
                                    <Badge style={{ marginRight: "5px" }} color="success">{item}</Badge>
                                );
                            })
                        }
                    </td>
                </tr>
                <tr>
                    <td>Group</td>
                    <td>:</td>
                    <td>
                        {
                            groups.map((item) => {
                                return (
                                    <Link
                                        style={{
                                            marginRight: "5px"
                                        }}
                                        to={"/group/view/" + item}><Badge color="info">{item}</Badge></Link>
                                );
                            })
                        }
                    </td>
                </tr>
                <tr>
                    <td>Posting</td>
                    <td>:</td>
                    <td>{props.getDetailPengumuman.UserPosting + " / " + props.getDetailPengumuman.TglPosting}</td>
                </tr>
                <tr>
                    <td>Last Edit</td>
                    <td>:</td>
                    <td>{props.getDetailPengumuman.UserEdit + " / " + props.getDetailPengumuman.TglEdit}</td>
                </tr>
              
            </table>
        </div>
    )
}

export default connect(mapStateToProps, null)(PengumumanDetailComponent)
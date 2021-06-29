import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';

const { SearchBar } = Search;

const LocalPegawaiTableComponent = (props) => {
    const columns = [
        {
            dataField: "UserID",
            text: "User ID",
            sort: true,
            headerStyle: () => {
                return { width: "75px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
        },
        {
            dataField: "Nama",
            text: "Nama",
            sort: true,
            headerStyle: () => {
                return { width: "75px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
        },
        {
            dataField: "KodeCabang",
            text: "Cabang",
            sort: true,
            headerStyle: () => {
                return { width: "75px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
        },
        {
            dataField: "link",
            text: "Action",
            headerStyle: () => {
               return { width: "40px", backgroundColor: "#f9a826" };
            },
            formatter: (content, row) =>{
                return (
                    <div></div>
                )
            }
        }
    ]

    return (
        <div>
            {props.getUsersList ? (
                <ToolkitProvider
                    bootstrap4
                    keyField="UserID"
                    data={props.getUsersList}
                    columns={columns}
                    rowStyle={{ fontWeight: "bold" }}
                    defaultSorted={defaultSorted}
                    search
                >
                    {(props) => (
                        <div>
                            <Card
                                body
                                inverse
                                style={{ backgroundColor: "#ffffff", borderColor: "#ffffff" }}>
                                <Row>
                                    <Col>
                                        <h4 className="float-left" style={{color:"#111"}}>Download Data Fingerprint Semua Karyawan</h4>
                                        <div className="float-right">
                                            <SearchBar
                                                {...props.searchProps}
                                                placeholder="Search .."
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                  
                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory({sizePerPage:50})}
                                />
                            </Card>
                            {
                                props.getUsersList ? (
                                    <div>
                                        <Tooltip placement="auto" isOpen={resetDevice} target="btResetDevice" toggle={toggleResetDevice}>
                                            Reset Device Pegawai
                                        </Tooltip>
                                        <Tooltip placement="auto" isOpen={editPegawai} target="btEditPegawai" toggle={toggleEditPegawai}>
                                            Edit Data Pegawai
                                        </Tooltip>
                                        <Tooltip placement="auto" isOpen={resetPassword} target="btResetPassword" toggle={toggleResetPassword}>
                                            Reset Password
                                        </Tooltip>
                                        <Tooltip placement="auto" isOpen={deletePegawai} target="btDeletePegawai" toggle={toggleDeletePegawai}>
                                            Hapus Pegawai
                                        </Tooltip>
                                    </div>
                                ) : ("")
                            }
                        </div>
                    )}
                </ToolkitProvider>
            ) : (
                <div className="text-center">
                    {props.errorUsersList ? (
                        <h4>{props.errorUsersList}</h4>
                    ) : (
                        <Spinner color="dark" />
                    )}
                </div>
            )}
        </div>
    )

    

    
}

const mapStateToProps = (state) => {
    return {
        getUsersList : state.users.getUsersList,
        errorUsersList: state.users.errorUsersList,
    };
}
const defaultSorted = [
    {
        dataField: "UserID",
        order: "asc",
    },
];


export default connect(mapStateToProps, null)(LocalPegawaiTableComponent);
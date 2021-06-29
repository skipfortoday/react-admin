import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card, Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import {
    deleteUser,
    resetUser,
    resetPasswordUser,
    getUsersList,
    registerFingerPrint
} from "../actions/userAction";

const { SearchBar } = Search;

const handleClick = (dispatch, ID) => {
    swal({
        title: "Apakah Anda yakin akan menghapus data ini ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            dispatch(deleteUser(ID));
            swal("Data User Sukses dihapus", {
                icon: "success",
            }).then((value) => {
                dispatch(getUsersList())
            });
        } else {
            swal("Data gagal dihapus");
        }
    });
};

const handleClick2 = (dispatch, ID) => {
    swal({
        title: "Reset Device Login Karyawan ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willReset) => {
        if (willReset) {
            dispatch(resetUser(ID));
            swal("Berhasil, Karyawan Bisa Login Di Device Baru", {
                icon: "success",
            });
        } else {
            swal("Device tidak jadi di Reset");
        }
    });
};

const handleClick3 = (dispatch, ID) => {
    swal({
        title: "Reset Password Login Karyawan ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willresetPasswordUser) => {
        if (willresetPasswordUser) {
            dispatch(resetPasswordUser(ID));
            swal("Berhasil, Karyawan Bisa Login Dengan Password 123456", {
                icon: "success",
            });
        } else {
            swal("Password tidak jadi di Reset");
        }
    });
};



const defaultSorted = [
    {
        dataField: "UserID",
        order: "asc",
    },
];

const mapStateToProps = (state) => {
    let getLocalFp = [];
    if(state.users.getLocalFp) getLocalFp = state.users.getLocalFp;
    let getUsersList = state.users.getUsersList;
   
    
    return {
        getUsersList : getUsersList,
        errorUsersList: state.users.errorUsersList,
    };
};

const TableFingerprintComponent = (props) => {
    

    const columns = [
        {
            dataField: "NamaLengkap",
            text: "Nama",
            sort: true,
            headerStyle: () => {
                return { width: "120px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
            
        },
        {
            dataField: "NamaCabang",
            text: "Cabang",
            sort: true,
            headerStyle: () => {
                return { width: "50px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
        },
        {
            dataField:"FPServer",
            text: "FP Server",
            sort: true,
            headerStyle: () => {
                return { width: "60px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
            formatter:(val, row) => {
                return val == true ? 'Registered' : 'Not Registered';    
            }
        },
        {
            dataField:"FPLocal",
            text: "FP Local",
            sort: true,
            headerStyle: () => {
                return { width: "60px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
            formatter:(val, row) => {
                return val == true ? 'Registered' : 'Not Registered';    
            }
        },
        {
            text:"Download",
            sort:false,
            headerStyle: () => {
                return { width: "40px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
            formatter:(val, row) => {
                return row.FPServer == true && row.FPLocal == false ? 
                    (
                    <Button size="sm" 
                        onClick={() => {props.downloadFp(row.UserID)}}>
                        <FontAwesomeIcon
                        icon={faDownload}
                        />
                    </Button>) : '';  
            }
        }
    ];

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
                                    pagination={paginationFactory()}
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
    );
};

export default connect(mapStateToProps, null)(TableFingerprintComponent);
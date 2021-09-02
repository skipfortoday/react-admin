import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card, Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faUserPlus,
    faRetweet,
    faUndoAlt,
    faFingerprint,
    faTimes,
    faDownload,
    faEye,
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
    registerFingerPrint,
    downloadUser
} from "../actions/userAction";

const { SearchBar } = Search;

const user = JSON.parse(localStorage.getItem("user"))

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

const downloadUserx = (dispatch, User) => {
    // console.log(User)
    dispatch(downloadUser(User))
}

const defaultSorted = [
    {
        dataField: "UserID",
        order: "asc",
    },
];

const mapStateToProps = (state) => {
    let getLocalFp = [];
    if (state.users.getLocalFp) getLocalFp = state.users.getLocalFp;

    return {
        getUsersList: state.users.getUsersList,
        errorUsersList: state.users.errorUsersList,
    };
};

const TableUserComponent = (props) => {


    const [resetDevice, setResetDevice] = useState(false);
    const toggleResetDevice = () => setResetDevice(!resetDevice);

    const [editPegawai, setEditPegawai] = useState(false);
    const toggleEditPegawai = () => setEditPegawai(!editPegawai);

    const [resetPassword, setResetPassword] = useState(false);
    const toggleResetPassword = () => setResetPassword(!resetPassword);

    const [deletePegawai, setDeletePegawai] = useState(false);
    const toggleDeletePegawai = () => setDeletePegawai(!deletePegawai);

    const columns = [
        {
            dataField: "UserID",
            text: "UserID",
            sort: true,
            headerStyle: () => {
                return { width: "80px", backgroundColor: "#f9a826" };
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
                return { width: "110px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
        },
        {
            dataField: "Jabatan",
            text: "Group",
            sort: true,
            headerStyle: () => {
                return { width: "160px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
            formatter: (val, row) => {
                return (
                    <Link to={"/group/view/" + row.GroupID} style={{ color: "unset" }}>
                        {val}
                    </Link>
                )
            }
        },
        {
            dataField: "FPLocal",
            text: "Fingerprint",
            sort: true,
            headerStyle: () => {
                return { width: "50px", backgroundColor: "#f9a826" };
            },
            style: () => {
                return { fontWeight: "normal" };
            },
            formatter: (val, row) => {
                return val ? (
                    <div>
                        Registered &nbsp;
                        <Button
                            onClick={() => props.delFingerprint(row.UserID, row.Nama)}
                            size="sm"
                            color="danger"
                            >
                            <FontAwesomeIcon
                                icon={faTimes}
                            />
                        </Button>
                    </div>
                ) : "Not Registered"
            }
        },

        {
            dataField: "link",
            text: "Action",
            headerStyle: () => {
                return { width: "100px", backgroundColor: "#f9a826" };
            },
            formatter: (rowContent, row) => {
                return (
                    <div>
                        {user.RoleAdmin === 2 ? ("") :
                            <Button
                                id="btRegFingerprint"
                                size="sm"
                                color="warning"
                                className="mr-2"
                            onClick={() => props.regFingerprint(row.UserID)}
                            >
                                <FontAwesomeIcon icon={faFingerprint} />
                            </Button>
                        }
                        {user.RoleAdmin === 2 ? ("") :
                            <Button
                                id="btResetDevice"
                                size="sm"
                                color="warning"
                                className="mr-2"
                                onClick={() => handleClick2(props.dispatch, row.UserID)}
                            >
                                <FontAwesomeIcon icon={faRetweet} />
                            </Button>
                        }
                        
                        <Link to={"edit/" + row.UserID}>
                            <Button color="warning" className="mr-2" size="sm" id="btEditPegawai">
                                <FontAwesomeIcon icon={user.RoleAdmin === 2 ? faEye : faEdit} />
                            </Button>
                        </Link>
                        
                        {user.RoleAdmin === 2 ? ("") :
                            <Button
                                id="btResetPassword"
                                size="sm"
                                color="warning"
                                className="mr-2"
                                onClick={() => handleClick3(props.dispatch, row.UserID)}
                            >
                                <FontAwesomeIcon icon={faUndoAlt} />
                            </Button>
                        }
                        {user.RoleAdmin === 2 ? ("") :
                            <Button
                                id="btDeletePegawai"
                                size="sm"
                                color="warning"
                                className="mr-2"
                                onClick={() => handleClick(props.dispatch, row.UserID)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        }
                            

                        {!row.UserLocal ? (
                            <Button
                                id="btDownloadPegawai"
                                size="sm"
                                color="warning"
                                className="mr-2"
                                onClick={() => downloadUserx(props.dispatch, row)}
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </Button>
                        ) : ""}
                    </div>
                );
            },
        },
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
                                        {user.RoleAdmin === 2 ? "" : (
                                        <Link to="/create">
                                            <Button color="warning" className="mr-2">
                                                <FontAwesomeIcon icon={faUserPlus} /> Tambah Pegawai
                                            </Button>
                                        </Link>
                                        )}
                                        {user.RoleAdmin === 2 ? "" : (
                                        <Link to="/fingerprint">
                                            <Button color="warning" className="mr-2">
                                                <FontAwesomeIcon icon={faFingerprint} /> Singkron Data Fingerprint
                                            </Button>
                                        </Link>
                                        )}
                                    </Col>

                                    <Col>
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

export default connect(mapStateToProps, null)(TableUserComponent);

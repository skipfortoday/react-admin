import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Container,
  Button,
  Row,
  Col,
  Spinner,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
  retweet,
  faRetweet,
  faUndoAlt,
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
      });
      window.location.reload();
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
  return {
    getUsersList: state.users.getUsersList,
    errorUsersList: state.users.errorUsersList,
  };
};

const TableComponent = (props) => {
  const columns = [
    {
      dataField: "UserID",
      text: "UserID",
      sort: true,
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold", color: "white" };
      },
    },
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      headerStyle: () => {
        return { width: "110px", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold", color: "white" };
      },
    },
    {
      dataField: "Jabatan",
      text: "Group",
      sort: true,
      headerStyle: () => {
        return { width: "160px", backgroundColor: "#fec107" };
      },
      style: () => {
        return { fontWeight: "bold", color: "white" };
      },
    },

    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "80px", backgroundColor: "#fec107" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Button
              color="warning"
              className="mr-2"
              onClick={() => handleClick2(props.dispatch, row.UserID)}
            >
              <FontAwesomeIcon icon={faRetweet} />
            </Button>
            <Link to={"edit/" + row.UserID}>
              <Button color="warning" className="mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>
            <Button
              color="warning"
              className="mr-2"
              onClick={() => handleClick3(props.dispatch, row.UserID)}
            >
              <FontAwesomeIcon icon={faUndoAlt} />
            </Button>
            <Button
              color="warning"
              className="mr-2"
              onClick={() => handleClick(props.dispatch, row.UserID)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
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
          rowStyle={{ fontWeight: "bold", color: "white" }}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Card body inverse color="info">
              <CardTitle tag="h5">Menu Pegawai</CardTitle>
                <Row>
                  <Col>
                    <Link to="/create">
                      <Button color="warning" className="mr-2">
                        <FontAwesomeIcon icon={faUserPlus} /> Tambah Pegawai
                      </Button>
                    </Link>
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

export default connect(mapStateToProps, null)(TableComponent);

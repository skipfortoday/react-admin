import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {  Button, Row, Col, Spinner , Card} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteAdmin } from "../actions/adminAction";

const { SearchBar } = Search;

const handleClick = (dispatch, AdminID) => {
  
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteAdmin(AdminID))
      swal("Data Admin Sukses dihapus", {
        icon: "success",
      });window.location.reload();
    } else {
      swal("Data gagal dihapus");
    }
  });
}


const defaultSorted = [
  {
    dataField: "AdminID",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getAdminList: state.Admin.getAdminList,
    errorAdminList: state.Admin.errorAdminList,
  };
};

const AdminComponent = (props) => {

  const columns = [
    {
      dataField: "AdminID",
      text: "AdminID",
      sort: true,
      headerStyle: () => {
        return { width: "75px" , backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
    },
    {
      dataField: "TanggalCreate",
      text: "Tanggal Create",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "40px", backgroundColor:"#fec107" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"superadmin/edit/" + row.AdminID}>
              <Button  color="warning" className="mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>


            <Button  color="warning" className="mr-2" onClick={() => handleClick(props.dispatch, row.AdminID)}>
              <FontAwesomeIcon icon={faTrash} /> 
            </Button>
          </div>
        );
      },
    },
  ];

  
  return (
    <div>
      {props.getAdminList ? (
        <ToolkitProvider
          bootstrap4
          keyField="AdminID"
          data={props.getAdminList}
          columns={columns}
          rowStyle={ {  fontWeight: "bold" } } 
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Card body inverse style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
              <Row>
                <Col>
                  <Link to="/superadmin/create">
                    <Button color="warning" className="mr-2">
                      <FontAwesomeIcon icon={faSitemap} /> Tambah Admin
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <div className="float-right">
                    <SearchBar {...props.searchProps} placeholder="Search .." />
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
          {props.errorAdminList ? (
            <h4>{props.errorAdminList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(AdminComponent);

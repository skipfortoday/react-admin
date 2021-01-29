import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUsersCog,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteGroup } from "../actions/groupAction";

const { SearchBar } = Search;

const handleClick = (dispatch, GroupID) => {
  
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteGroup(GroupID))
      swal("Data Group Sukses dihapus", {
        icon: "success",
      });
    } else {
      swal("Data gagal dihapus");
    }
  });
}


const defaultSorted = [
  {
    dataField: "GroupID",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getGroupList: state.Group.getGroupList,
    errorGroupList: state.Group.errorGroupList,
  };
};


const GroupComponent = (props) => {

  const columns = [
    {
      dataField: "GroupID",
      text: "GroupID",
      sort: true,
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      dataField: "Jabatan",
      text: "Nama Group",
      sort: true,
      headerStyle: () => {
        return { width: "120px" };
      },
    },
    {
      dataField: "JamDatang",
      text: "Pagi Datang", 
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
      
    },
    {
      dataField: "JamPulang",
      text: "Pagi Pulang",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "HariLibur",
      text: "Hari Libur",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "200px" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"group/detail/" + row.GroupID}>
              <Button color="primary" className="mr-2">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>
  
            <Link to={"group/edit/" + row.GroupID}>
              <Button color="warning" className="mr-2">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
            </Link>
  
            <Button color="danger" className="mr-2" onClick={() => handleClick(props.dispatch, row.GroupID)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  
  return (
    <Container>
      {props.getGroupList ? (
        <ToolkitProvider
          bootstrap4
          keyField="GroupID"
          data={props.getGroupList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <Link to="group/create">
                    <Button color="danger" className="mr-2">
                      <FontAwesomeIcon icon={faUsersCog} /> Tambah Group <FontAwesomeIcon icon={faPlus} />
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
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorGroupList ? (
            <h4>{props.errorGroupList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

export default connect(mapStateToProps, null)(GroupComponent);

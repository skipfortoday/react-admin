import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUsersCog,
  faPlus,
  faClock,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import { deleteGroup } from "../actions/groupAction";

const { SearchBar } = Search;

const handleClick = (dispatch, GroupID) => {
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      dispatch(deleteGroup(GroupID));
      swal("Data Group Sukses dihapus", {
        icon: "success",
      });window.location.reload();
    } else {
      swal("Data gagal dihapus");
    }
  });
};

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
        return { width: "30px", color : "white" };
      },
      style: () => {
        return { color : "white" ,fontWeight : "bold" };
      },
    },
    {
      dataField: "Jabatan",
      text: "Nama Group",
      sort: true,
      headerStyle: () => {
        return { width: "120px" ,color : "white" };
      },
      style: () => {
        return { color : "white", fontWeight : "bold" };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "40px", color : "white" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"group/detail/" + row.GroupID}>
              <Button  color="primary" className="mr-2">
                <FontAwesomeIcon icon={faInfo} /> 
              </Button>
            </Link>

            <Link to={"group/edit/" + row.GroupID}>
              <Button  color="warning" className="mr-2">
                <FontAwesomeIcon icon={faEdit} /> 
              </Button>
            </Link>

            <Button
             color="danger"
              className="mr-2"
              onClick={() => handleClick(props.dispatch, row.GroupID)}
            >
              <FontAwesomeIcon icon={faTrash} /> 
            </Button>

            <Link to={"group/terlambatbertingkat/" + row.GroupID}>
              <Button  color="warning" className="mr-2">
                <FontAwesomeIcon icon={faSortAmountUp} /> 
              </Button>
            </Link>
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
          rowStyle={ { fontWeight: "bold" , color:"white" } } 
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
               <Card body inverse color="info">
              <Row>
                <Col>
                  <Link to="group/create">
                    <Button color="warning" className="mr-2">
                      <FontAwesomeIcon icon={faUsersCog} /> Tambah Group{" "}
                      <FontAwesomeIcon icon={faPlus} />
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

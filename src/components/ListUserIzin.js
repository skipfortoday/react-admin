import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { SearchBar } = Search;

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

const ListUserIzin = (props) => {
  const columns = [
    {
      dataField: "UserID",
      text: "UserID",
      sort: true,
      headerStyle: () => {
        return { width: "75px" , color : "white" };
      },
      style: () => {
        return { fontWeight : "bold", color :"white" };
      },
    },
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      headerStyle: () => {
        return { width: "180px", color : "white"};
      },
      style: () => {
        return { fontWeight : "bold", color :"white" };
      },
    },
    {
      dataField: "Jabatan",
      text: "Group",
      sort: true,
      headerStyle: () => {
        return { width: "200px", color : "white" };
      },
      style: () => {
        return { fontWeight : "bold", color :"white" };
      },
    },
    {
      dataField: "TglMulaiCuti",
      text: "Start Cuti",
      sort: true,
      headerStyle: () => {
        return { width: "90px", color : "white" };
      },
      style: () => {
        return { fontWeight : "bold", color :"white" };
      },
    },

    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "75px" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"create/" + row.UserID}>
              <Button color="warning" className="mr-2">
                <FontAwesomeIcon icon={faClipboardList} /> Add
              </Button>
            </Link>
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
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Card body inverse color="info">
              <Row>
                <Col>
                  <div className="float-xl-right">
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

export default connect(mapStateToProps, null)(ListUserIzin);

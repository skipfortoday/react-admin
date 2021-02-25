import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner,Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
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



const TableComponent = (props) => {
  const columns = [
    {
      dataField: "UserID",
      text: "UserID",
      sort: true,
      headerStyle: () => {
        return { width: "40px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold" , color:"white"};
      },
    },
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      headerStyle: () => {
        return { width: "80px" , backgroundColor:"#fec107"};
      },
      style: () => {
        return { fontWeight : "bold" , color:"white"};
      },
    },


    {
      dataField: "Jabatan",
      text: "Group",
      sort: true,
      headerStyle: () => {
        return { width: "120px", backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold" , color:"white"};
      },
    },

    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "20px", backgroundColor:"#fec107" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"laporan/" + row.UserID}>
              <Button color="warning" className="mr-2">
                <FontAwesomeIcon icon={faBook} />Scan 
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

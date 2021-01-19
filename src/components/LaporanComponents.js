import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";

const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "DatangID",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getLaporanList: state.Laporan.getLaporanList,
    errorLAporanList: state.Laporan.errorLaporanList,
  };
};

const LaporanComponent = (props) => {
  const columns = [
    {
      dataField: "UserID",
      text: "UserID",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "Tanggal",
      text: "Tanggal",
      sort: true,
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      dataField: "Datang",
      text: "Datang",
      sort: true,
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      dataField: "Pulang",
      text: "Pulang",
      sort: true,
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      dataField: "Terlambat",
      text: "Terlambat",
      sort: true,
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      dataField: "Lembur",
      text: "Lembur",
      sort: true,
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      dataField: "Shift",
      text: "Shift",
      sort: true,
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
        dataField: "Status",
        text: "Status",
        sort: true,
        headerStyle: () => {
          return { width: "80px" };
        },
      },
      {
        dataField: "Keterangan",
        text: "Keterangan",
        sort: true,
        headerStyle: () => {
          return { width: "200px" };
        },
      },
  ];

  return (
    <Container>
      {props.getLaporanList ? (
        <ToolkitProvider
          bootstrap4
          keyField="UserID"
          data={props.getLaporanList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <Link to="/create">
                    <Button color="danger" className="mr-2">
                      <FontAwesomeIcon icon={faUserPlus} /> Tambah Pegawai
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
          {props.errorLaporanList ? (
            <h4>{props.errorLaporanList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

export default connect(mapStateToProps, null)(LaporanComponent);

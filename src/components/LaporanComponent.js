import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Alert, Row, Col, Spinner } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";

const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "TanggalScan",
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
      dataField: "TanggalScan",
      text: "Tanggal",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "ScanMasuk",
      text: "Datang",
      sort: true,
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      dataField: "ScanPulang",
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
        dataField: "Keterangan",
        text: "Keterangan",
        sort: true,
        headerStyle: () => {
          return { width: "100px" };
        },
      },
      {
        dataField: "KetPulang",
        text: "KetPulang",
        sort: true,
        headerStyle: () => {
          return { width: "100px" };
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
                <Alert color="warning">
                 Nama 
                 </Alert>
             
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

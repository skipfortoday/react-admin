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
      dataField: "Tanggal",
      text: "Tanggal",
      sort: true,
      headerStyle: () => {
        return { width: "90px" };
      },
    },
    {
      dataField: "ScanMasuk",
      text: "Datang",
      sort: true,
      headerStyle: () => {
        return { width: "65px" };
      },
    },
    {
      dataField: "ScanPulang",
      text: "Pulang",
      sort: true,
      headerStyle: () => {
        return { width: "65px" };
      },
    },
    {
      dataField: "Tlambat",
      text: "Tlambat",
      sort: true,
      headerStyle: () => {
        return { width: "70px" };
      },
    },
    {
      dataField: "Lembur",
      text: "Lembur",
      sort: true,
      headerStyle: () => {
        return { width: "65px" };
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
      dataField: "Break",
      text: "Break",
      sort: true,
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "Kmbl",
      text: "Kmbl",
      sort: true,
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "Tlambat",
      text: "Tlambat",
      sort: true,
      headerStyle: () => {
        return { width: "70px" };
      },
    },
    {
      dataField: "Status",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { width: "70px" };
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
            <div >

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

import a from "../css/printlaporan.css";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Alert, Row, Col, Spinner, Table } from "reactstrap";
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
    getExpandKey: state.Laporan.getExpandKey,
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
        return { width: "115px" };
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
      dataField: "Terlambat",
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
      dataField: "Terlambat",
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

  const dtColumns = [

    {
      dataField: "k",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "90px" };
      },
    },
    {
      dataField: "KelKan",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "90px" };
      },
    },
    {
      dataField: "Durasi",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "90px" };
      },
    },
    {
      dataField: "Ket",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "90px" };
      },
    },
    {
      dataField: "KetKembali",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "90px" };
      },
    },
    
  ]

  /*DatangID: 105
JamKeluar: "11:31:00"
JamKembali: "12:31:00"
KeluarID: 1
Keterangan: "undefined"
KeteranganKembali: null
TotalKeluar: null*/

  const expandRow = {
    renderer: (row, rowIndex) => (
      <div>
        <BootstrapTable 
          classes='rDetail'
          keyField='DatangID' 
          data={ row.detail } 
          columns={ dtColumns } 
          />

      </div>
    ),
    expanded:props.getExpandKey[0],
    nonExpandable:props.getExpandKey[1]
  };

  console.log(props.getLaporanList);

  return (
    <BootstrapTable 
      keyField='Tanggal' 
      data={ props.getLaporanList } 
      columns={ columns } 
      expandRow={ expandRow }

      pagination={paginationFactory()}
    />
  );
  /*return (
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
  );*/
};

export default connect(mapStateToProps, null)(LaporanComponent);

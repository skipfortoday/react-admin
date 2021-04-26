import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {   Row, Col, Spinner , Card} from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "KodeCabang",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getLaporanKelengkapan: state.Laporan.getLaporanKelengkapan,
    errorLaporanKelengkapan: state.Laporan.errorLaporanKelengkapan,
  };
};

const KelengkapanAbsenComponent = (props) => {

  const columns = [
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      headerStyle: () => {
        return { width: "75px" , backgroundColor:"#f9a826" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
    },
    {
      dataField: "Tanggal",
      text: "Tanggal",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor:"#f9a826" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
    },
    {
      dataField: "Masuk",
      text: "Masuk", 
      sort: true,
      headerStyle: () => {
        return { width: "200px", backgroundColor:"#f9a826" };
      },
      style: () => {
        return { fontWeight : "bold" };
      },
      
    },
  ];

  
  return (
    <div>
      {props.getLaporanKelengkapan ? (
        <ToolkitProvider
          bootstrap4
          keyField="KodeCabang"
          data={props.getLaporanKelengkapan}
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
          {props.errorLaporanKelengkapan ? (
            <h4>{props.errorLaporanKelengkapan}</h4>
          ) : (
            // <Spinner color="dark" />
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(KelengkapanAbsenComponent);

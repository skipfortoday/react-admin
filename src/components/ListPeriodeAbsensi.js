import React, { useState } from "react";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Card, Col, Row, Spinner } from "reactstrap";
import Select from 'react-select'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import swal from 'sweetalert';
const { SearchBar } = Search;


const columns = [
    {
       dataField: "NamaPeriode",
       text: "Periode",
       sort: true,
       headerStyle: () => {
          return { width: "120px", backgroundColor: "#f9a826" };
       },
       style: () => {
          return { fontWeight: "normal" };
       },
    },
    {
        dataField: "TglAwal",
        text: "Awal Periode",
        sort: true,
        headerStyle: () => {
           return { width: "120px", backgroundColor: "#f9a826" };
        },
        style: () => {
           return { fontWeight: "normal" };
        },
     },
    {
        dataField: "TglAkhir",
        text: "Akhir Periode",
        sort: true,
        headerStyle: () => {
           return { width: "120px", backgroundColor: "#f9a826" };
        },
        style: () => {
           return { fontWeight: "normal" };
        },
     },
     {
        dataField: "TglTutup",
        text: "Closing",
        sort: true,
        headerStyle: () => {
           return { width: "120px", backgroundColor: "#f9a826" };
        },
        style: () => {
           return { fontWeight: "normal" };
        },
     },
     {
        dataField: "ac",
        text: "Aksi",
        sort: true,
        headerStyle: () => {
           return { width: "70px", backgroundColor: "#f9a826" };
        },
        style: () => {
           return { fontWeight: "normal" };
        },
     },
]

const defaultSorted = [
    {
       dataField: "NamaPeriode",
       order: "asc",
    },
];

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#333',
      padding: 20,
    }),
   
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
}

const ListPeriodeAbsensi = (props)=>{
    console.log(props)
    return (
        <div>
           {props.listPeriode ? (
              <ToolkitProvider
                 bootstrap4
                 keyField="id"
                 data={props.listPeriode}
                 columns={columns}
                 rowStyle={{ fontWeight: "bold" }}
                 defaultSorted={defaultSorted}
                 search
              >
                 {(props) => (
                    <div>
                       <Card body inverse style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
                          <Row>
                             {/* <Col md="4">
                                <div>
                                  
                                <Select
                                   styles={customStyles}
                                   options={opsiFilter}
                                   onChange={(value) => {handleFilterChange(value)}}
                                   value={defaultFilter}
                                />
                                </div>
                             </Col> */}
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
                <Spinner color="dark" />
              </div>
           )}
        </div>
    )
}
 

export default ListPeriodeAbsensi
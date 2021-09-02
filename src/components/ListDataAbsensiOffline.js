import React, { useState } from "react";
import Select from 'react-select'
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faEdit,
   faTrash,
   faSitemap,
   faFingerprint,
   faSync,
   faUpload,
   faArrowRight,
   faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteCabang } from "../actions/cabangAction";

const { SearchBar } = Search;

const handleClick = (dispatch, KodeCabang) => {

   swal({
      title: "Apakah Anda yakin akan menghapus data ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
   })
      .then((willDelete) => {
         if (willDelete) {
            dispatch(deleteCabang(KodeCabang))
            swal("Data Cabang Sukses dihapus", {
               icon: "success",
            }).then(()=>{
               window.location.reload();
            }); 
         } else {
            swal("Data gagal dihapus");
         }
      });
}


const defaultSorted = [
   {
      dataField: "KodeCabang",
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

const cbb = props => {
   return (
      <label style={{display:"inline-block"}}>
         <input 
            key={props.id} 
            onClick={props.handleCheckChieldElement} 
            type="checkbox" 
            checked={props.isChecked} 
            value={props.value} />
         Singkron
      </label>
   )
}

const ListDataAbsensiOffline = (props) => {
   const handleFilterChange =(value)=>{
      props.handleFilterChange(value)
   }
   const columns = [
      {
         dataField: "TanggalScan",
         text: "Tanggal",
         sort: true,
         headerStyle: () => {
            return { width: "120px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "Nama",
         text: "Nama",
         sort: true,
         headerStyle: () => {
            return { width: "250px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "",
         text: "Jam Masuk (Local|Server)",
         sort: true,
         headerStyle: () => {
            return { width: "140px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
     
         formatter: (rowContent, row) => {
            let server = row.server
            let svScanMasuk = null
            let sm = 1
            if(server) svScanMasuk = server.ScanMasuk

            if(svScanMasuk == null) {
               svScanMasuk = '--:--:--'
               sm = 0
            }
            let lm = 0
            let ScanMasuk = '--:--:--'
            if(row.ScanMasuk) {
               ScanMasuk = row.ScanMasuk
               lm = 1
            }

            return (
               <div>
                  <div style={{display:"inline-block", width:"80px"}}>{ScanMasuk}</div>
                  <div style={{display:"inline-block", width:"20px"}}> | </div>
                  <div style={{display:"inline-block", width:"80px"}}>{svScanMasuk}</div>
                  {!sm && lm ? (
                     <Button
                        onClick={()=>{
                           props.handleUploadServer({
                              action:"masuk",
                              Shift:row.Shift,
                              Nama:row.Nama.split(" - ")[1],
                              Keterangan:row.Keterangan,
                              UserID:row.UserID,
                              Tanggal:row.TanggalScan,
                              ScanMasuk:row.ScanMasuk
                           })
                        }}
                        style={{margin:"3px"}}
                        size="sm"
                        color="warning"
                     >Up Sevrer</Button>
                  ): ""}
               </div>
            )
         }

      },
      {
         dataField: "ScanPulang",
         text: "Jam Pulang (Local|Server)",
         headerStyle: () => {
            return { width: "140px", backgroundColor: "#f9a826" };
         },
         sort: true,
         style: () => {
            return { fontWeight: "normal" };
         },
         formatter: (rowContent, row) => {
            let server = row.server
            let svScanPulang = null
            let sp = 1
            if(server) svScanPulang = server.ScanPulang

            if(svScanPulang == null) {
               sp = 0
               svScanPulang = '--:--:--'
            }

            let lp = 0
            let ScanPulang = '--:--:--'
            if(row.ScanPulang) {
               ScanPulang = row.ScanPulang
               lp = 1
            }
            
            return (
               <div>
                  <div style={{display:"inline-block", width:"80px"}}>{ScanPulang}</div>
                  <div style={{display:"inline-block", width:"20px"}}> | </div>
                  <div style={{display:"inline-block", width:"80px"}}>{svScanPulang}</div>
                  {
                   !sp && lp && row.server?.DatangID ? (
                     <Button
                        onClick={()=>{
                           props.handleUploadServer({
                              action:"pulang",
                              Nama:row.Nama.split(" - ")[1],
                              Keterangan:row.KetPulang,
                              UserID:row.UserID,
                              Tanggal:row.TanggalScan,
                              ScanPulang:row.ScanPulang,
                              DatangID: row.server.DatangID
                           })
                        }}
                        style={{margin:"3px"}}
                        size="sm"
                        color="warning"
                     >Up Sevrer</Button>
                   )  : ""
                  }
               </div>
            )
         }
      },

   ];

   let opsiFilter = props.opsiFilter
   let defaultFilter = props.defaultFilter


   return (
      <div>
         {props.listOffline ? (
            <ToolkitProvider
               bootstrap4
               keyField="id"
               data={props.listOffline}
               columns={columns}
               rowStyle={{ fontWeight: "bold" }}
               defaultSorted={defaultSorted}
               search
            >
               {(props) => (
                  <div>
                     <Card body inverse style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
                        <Row>
                           <Col md="4">
                              <div>
                                
                              <Select
                                 styles={customStyles}
                                 options={opsiFilter}
                                 onChange={(value) => {handleFilterChange(value)}}
                                 value={defaultFilter}
                              />
                              </div>
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
               {props.errorCabangList ? (
                  <h4>{props.errorCabangList}</h4>
               ) : (
                  <Spinner color="dark" />
               )}
            </div>
         )}
      </div>
   );
};

export default ListDataAbsensiOffline;
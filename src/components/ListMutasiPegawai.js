import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faEdit,
   faTrash,
   faSitemap,
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

const ListMutasiPegawai = (props) => {

   const columns = [
      {
         dataField: "Pegawai",
         text: "Pegawai",
         sort: true,
         headerStyle: () => {
            return { width: "200px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "CabangAsal",
         text: "Cabang Asal",
         sort: true,
         headerStyle: () => {
            return { width: "100px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "CabangTujuan",
         text: "Cabang Tujuan",
         sort: true,
         headerStyle: () => {
            return { width: "200px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },

      },
      {
         dataField: "Tanggal",
         text: "Tanggal Mutasi",
         headerStyle: () => {
            return { width: "200px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
   ];

   return (
      <div>
         {props.listMutasi ? (
            <ToolkitProvider
               bootstrap4
               keyField="id"
               data={props.listMutasi}
               columns={columns}
               rowStyle={{ fontWeight: "bold" }}
               defaultSorted={defaultSorted}
               search
            >
               {(props) => (
                  <div>
                     <Card body inverse style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
                        <Row>
                           <Col>
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

export default ListMutasiPegawai;

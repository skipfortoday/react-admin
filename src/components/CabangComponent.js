import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { getCabangList } from "../actions/cabangAction";
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
               // window.location.reload();
               dispatch(getCabangList());
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

const mapStateToProps = (state) => {
   return {
      getCabangList: state.Cabang.getCabangList,
      errorCabangList: state.Cabang.errorCabangList,
   };
};

const CabangComponent = (props) => {

   const columns = [
      {
         dataField: "KodeCabang",
         text: "KodeCabang",
         sort: true,
         headerStyle: () => {
            return { width: "75px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "NamaCabang",
         text: "Nama Cabang",
         sort: true,
         headerStyle: () => {
            return { width: "100px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "Alamat",
         text: "Alamat Cabang",
         sort: true,
         headerStyle: () => {
            return { width: "200px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },

      },
      {
         dataField: "link",
         text: "Action",
         headerStyle: () => {
            return { width: "40px", backgroundColor: "#f9a826" };
         },
         formatter: (rowContent, row) => {
            return (
               <div>
                  <Link to={"cabang/edit/" + row.KodeCabang}>
                     <Button color="warning" className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                     </Button>
                  </Link>

                  <Button color="warning" className="mr-2" onClick={() => handleClick(props.dispatch, row.KodeCabang)}>
                     <FontAwesomeIcon icon={faTrash} />
                  </Button>
               </div>
            );
         },
      },
   ];


   return (
      <div>
         {props.getCabangList ? (
            <ToolkitProvider
               bootstrap4
               keyField="KodeCabang"
               data={props.getCabangList}
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
                              <Link to="/cabang/create">
                                 <Button color="warning" className="mr-2">
                                    <FontAwesomeIcon icon={faSitemap} /> Tambah Cabang
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

export default connect(mapStateToProps, null)(CabangComponent);

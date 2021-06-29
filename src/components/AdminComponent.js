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
import { deleteAdmin, getAdminList } from "../actions/adminAction";

const { SearchBar } = Search;

const handleClick = (dispatch, AdminID) => {

   swal({
      title: "Apakah Anda yakin akan menghapus data ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
   })
      .then((willDelete) => {
         if (willDelete) {
            dispatch(deleteAdmin(AdminID))
            swal("Data Admin Sukses dihapus", {
               icon: "success",
            }).then(()=>{
               
               // this.props.dispatch(getAdminList());
               window.location.reload();
            });
         } else {
            swal("Data gagal dihapus");
         }
      });
}


const defaultSorted = [
   {
      dataField: "AdminID",
      order: "asc",
   },
];

const mapStateToProps = (state) => {
   return {
      getAdminDetail: state.Admin.getAdminList,
      errorAdminDetail: state.Admin.errorAdminList,
   };
};

const AdminComponent = (props) => {

   const columns = [
      {
         dataField: "Username",
         text: "Username",
         sort: true,
         headerStyle: () => {
            return { width: "75px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "KodeCabang",
         text: "Kode Cabang",
         sort: true,
         headerStyle: () => {
            return { width: "75px", backgroundColor: "#f9a826" };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "TanggalCreate",
         text: "Tanggal Create",
         sort: true,
         headerStyle: () => {
            return { width: "100px", backgroundColor: "#f9a826" };
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
                  <Link to={"superadmin/edit/" + row.AdminID}>
                     <Button color="warning" className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                     </Button>
                  </Link>
                  { row.RoleAdmin == 99 ? (
                     <Button color="warning" className="mr-2" onClick={() => handleClick(props.dispatch, row.AdminID)}>
                        <FontAwesomeIcon icon={faTrash} />
                     </Button>
                  ) : ("")}
               </div>
            );
         },
      },
   ];


   return (
      <div>
         {props.getAdminDetail ? (
            <ToolkitProvider
               bootstrap4
               keyField="AdminID"
               data={props.getAdminDetail}
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
                              <Link to="/superadmin/create">
                                 <Button color="warning" className="mr-2">
                                    <FontAwesomeIcon icon={faSitemap} /> Tambah Admin
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
               {props.errorAdminDetail ? (
                  <h4>{props.errorAdminDetail}</h4>
               ) : (
                  <Spinner color="dark" />
               )}
            </div>
         )}
      </div>
   );
};

export default connect(mapStateToProps, null)(AdminComponent);

import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteIzin } from "../actions/izinAction";


const { SearchBar } = Search;

const handleClick = (dispatch, DatangID) => {
  
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteIzin(DatangID))
      swal("Data Izin Sukses dihapus", {
        icon: "success",
      }); window.location.reload();
    } else {
      swal("Data gagal dihapus");
    }
  });
}


const defaultSorted = [
  {
    dataField: "DatangID",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getIzinListSolo: state.Izin.getIzinListSolo,
    errorIzinListSolo: state.Izin.errorIzinListSolo,
  };
};


const IzinComponentSolo = (props) => {

  const columns = [
  {
      dataField: "TanggalIzin",
      text: "Tanggal Izin",
      sort: true,
      headerStyle: () => {
        return { width: "120px",backgroundColor:"#fec107" };
      },
      style: () => {
        return {  fontWeight : "bold", color :"white" };
      },
    },
    {
      dataField: "Nama",
      text: "Nama ",
      sort: true,
      headerStyle: () => {
        return { width: "120px" ,backgroundColor:"#fec107"};
      },
      style: () => {
        return { fontWeight : "bold", color :"white" };
      },
    },
    {
      dataField: "Status",
      text: "Status", 
      sort: true,
      headerStyle: () => {
        return { width: "100px",backgroundColor:"#fec107" };
      },
      style: () => {
        return {  fontWeight : "bold" , color :"white"};
      },
      
    },
    {
      dataField: "Keterangan",
      text: "Keterangan",
      sort: true,
      headerStyle: () => {
        return { width: "250px",backgroundColor:"#fec107" };
      },
      style: () => {
        return { fontWeight : "bold",color :"white" };
      },
    },
    {
      dataField: "link",
      text: "Act",
      headerStyle: () => {
        return { width: "40px" ,backgroundColor:"#fec107"};
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Button color="danger" className="mr-2" onClick={() => handleClick(props.dispatch, row.DatangID)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        );
      },
    },
  ];

  
  return (
    <div>
      {props.getIzinListSolo ? (
        <ToolkitProvider
          bootstrap4
          keyField="DatangID"
          data={props.getIzinListSolo}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Card body inverse color="dark">
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
          {props.errorIzinListSolo ? (
            <h4>{props.errorIzinListSolo}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(IzinComponentSolo);

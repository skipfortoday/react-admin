import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteIzin, getIzinList } from "../actions/izinAction";

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
      }).then(()=> {dispatch(getIzinList())});

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
    getIzinList: state.Izin.getIzinList,
    errorIzinList: state.Izin.errorIzinList,
  };
};


const IzinComponent = (props) => {

  const columns = [
  {
      dataField: "TanggalIzin",
      text: "Tanggal Izin",
      sort: true,
      headerStyle: () => {
        return { width: "120px",backgroundColor:"#f9a826" };
      },
      style: () => {
        return {  fontWeight : "normal" };
      },
    },
    {
      dataField: "Nama",
      text: "Nama ",
      sort: true,
      headerStyle: () => {
        return { width: "120px" ,backgroundColor:"#f9a826"};
      },
      style: () => {
        return { fontWeight : "normal" };
      },
    },
    {
      dataField: "Status",
      text: "Status", 
      sort: true,
      headerStyle: () => {
        return { width: "100px",backgroundColor:"#f9a826" };
      },
      style: () => {
        return {  fontWeight : "normal" };
      },
      
    },
    {
      dataField: "Keterangan",
      text: "Keterangan",
      sort: true,
      headerStyle: () => {
        return { width: "250px",backgroundColor:"#f9a826" };
      },
      style: () => {
        return { fontWeight : "normal" };
      },
    },
    {
      dataField: "link",
      text: "Act",
      headerStyle: () => {
        return { width: "30px" ,backgroundColor:"#f9a826"};
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Button color="warning" className="mr-2" onClick={() => handleClick(props.dispatch, row.DatangID)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        );
      },
    },
  ];

  
  return (
    <div>
      {props.getIzinList ? (
        <ToolkitProvider
          bootstrap4
          keyField="DatangID"
          data={props.getIzinList}
          columns={columns}
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
          {props.errorIzinList ? (
            <h4>{props.errorIzinList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(IzinComponent);

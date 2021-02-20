import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faTrash,
  faCalendarCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
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
        return { width: "120px" };
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
        return { width: "120px" };
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
        return { width: "100px" };
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
        return { width: "250px" };
      },
      style: () => {
        return { fontWeight : "bold",color :"white" };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "100px" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"izin/detail/" + row.DatangID}>
              <Button color="primary" className="mr-2">
                <FontAwesomeIcon icon={faInfo} /> 
              </Button>
            </Link>
            <Button color="danger" className="mr-2" onClick={() => handleClick(props.dispatch, row.DatangID)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        );
      },
    },
  ];

  
  return (
    <Container>
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
              <Card body inverse color="info">
              <Row>
                <Col>
                  <Link to="izin/list">
                    <Button color="warning" className="mr-2">
                      <FontAwesomeIcon icon={faCalendarCheck} /> Izin Perorang<FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Link>
                  <Link to="izin/group">
                    <Button color="warning" className="mr-2">
                      <FontAwesomeIcon icon={faCalendarCheck} /> Izin Pergroup <FontAwesomeIcon icon={faPlus} />
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
          {props.errorIzinList ? (
            <h4>{props.errorIzinList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

export default connect(mapStateToProps, null)(IzinComponent);

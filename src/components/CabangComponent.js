import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faSitemap,
  faPlus,
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
      });window.location.reload();
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
        return { width: "75px" };
      },
    },
    {
      dataField: "NamaCabang",
      text: "Nama Cabang",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "Alamat",
      text: "Alamat Cabang", 
      sort: true,
      headerStyle: () => {
        return { width: "200px" };
      },
      
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "70px" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"cabang/detail/" + row.KodeCabang}>
              <Button color="primary" className="mr-2">
                <FontAwesomeIcon icon={faInfo} />
              </Button>
            </Link>
  
            <Link to={"cabang/edit/" + row.KodeCabang}>
              <Button color="warning" className="mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>

            <Link to={"/cabang#"}>
            <Button color="danger" className="mr-2" onClick={() => handleClick(props.dispatch, row.KodeCabang)}>
              <FontAwesomeIcon icon={faTrash} /> 
            </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  
  return (
    <Container>
      {props.getCabangList ? (
        <ToolkitProvider
          bootstrap4
          keyField="KodeCabang"
          data={props.getCabangList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <Link to="/cabang/create">
                    <Button color="danger" className="mr-2">
                      <FontAwesomeIcon icon={faSitemap} /> Tambah Cabang <FontAwesomeIcon icon={faPlus} />
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
    </Container>
  );
};

export default connect(mapStateToProps, null)(CabangComponent);

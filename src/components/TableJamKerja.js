import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import { deleteJamKerja } from "../actions/JamKerjaAction";

const { SearchBar } = Search;

const handleClick = (dispatch, Shift) => {
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      dispatch(deleteJamKerja(Shift));
      swal("Data Jam Kerja Sukses dihapus", {
        icon: "success",
      });
    } else {
      swal("Data gagal dihapus");
    }
  });
};

const defaultSorted = [
  {
    dataField: "Shift",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getJamKerjaList: state.JamKerja.getJamKerjaList,
    errorJamKerjaList: state.JamKerja.errorJamKerjaList,
  };
};

const TableJamKerja = (props) => {
  const columns = [
    {
      dataField: "Shift",
      text: "Shift",
      sort: true,
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "JamMasuk",
      text: "Jam Masuk",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "JamPulang",
      text: "Jam Pulang",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "300px" };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"detailjamkerja/" + row.Shift}>
              <Button color="dark" className="mr-2">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            <Link to={"editjamkerja/" + row.Shift}>
              <Button color="dark" className="mr-2">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
            </Link>

            <Button
              color="dark"
              className="mr-2"
              onClick={() => handleClick(props.dispatch, row.Shift)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      {props.getJamKerjaList ? (
        <ToolkitProvider
          bootstrap4
          keyField="Shift"
          data={props.getJamKerjaList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <Link to="/createjamkerja">
                    <Button color="dark" className="mr-2">
                      <FontAwesomeIcon icon={faUserPlus} /> Tambah Jam Kerja
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
          {props.errorJamKerjaList ? (
            <h4>{props.JamKerjaList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

export default connect(mapStateToProps, null)(TableJamKerja);

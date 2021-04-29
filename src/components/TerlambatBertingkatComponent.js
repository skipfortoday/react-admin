import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteTerlambatBertingkat, getTerlambatBertingkatDetail } from "../actions/TerlambatBertingkatAction";
import { Link } from "react-router-dom";

const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "Shift",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getTerlambatBertingkatDetail: state.TerlambatBertingkat.getTerlambatBertingkatDetail,
    errorTerlambatBertingkatList: state.TerlambatBertingkat.errorTerlambatBertingkatList,
  };
};

const TerlambatBertingkatComponent = (props) => {
  const handleClick = (dispatch, RuleTerlambatBertingkatID) => {

    swal({
      title: "Apakah Anda yakin akan menghapus data ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteTerlambatBertingkat(RuleTerlambatBertingkatID))
          swal("Data TerlambatBertingkat Sukses dihapus", {
            icon: "success",
          }).then(()=>{
            dispatch(getTerlambatBertingkatDetail(props.GroupID))
          });
        } else {
          swal("Data gagal dihapus");
        }
      });
  }

  const columns = [
    {
      dataField: "RuleTerlambatBertingkatID",
      text: "ID",
      sort: true,
      headerStyle: () => {
        return { width: "5px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "bold" };
      },
    },
    {
      dataField: "GroupID",
      text: "GroupID",
      sort: true,
      headerStyle: () => {
        return { width: "30px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "bold" };
      },
    },
    {
      dataField: "Shift",
      text: "Shift",
      sort: true,
      headerStyle: () => {
        return { width: "30px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "bold" };
      },
    },
    {
      dataField: "MaxJamDatang",
      text: "Max Jam Datang",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "bold" };
      },

    },
    {
      dataField: "RpPotonganTerlambat",
      text: "Potongan ",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "bold" };
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
            <Link to={"/group/terlambatbertingkat/"+row.GroupID+"/"+row.RuleTerlambatBertingkatID} onClick={() => props.editRow(row.RuleTerlambatBertingkatID)}>
              {//dispatch(getTerlambatBertingkatDetail2(row.RuleTerlambatBertingkatID)
              }
              <Button color="warning" className="mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>

            <Button color="warning" className="mr-2" 
              onClick={() => props.deleteRow(row.RuleTerlambatBertingkatID)}>
                {//handleClick(props.dispatch, row.RuleTerlambatBertingkatID)
                }
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        );
      },
    },
  ];


  return (
    <div>
      {props.getTerlambatBertingkatDetail ? (
        <ToolkitProvider
          bootstrap4
          keyField="RuleTerlambatBertingkatID"
          data={props.getTerlambatBertingkatDetail}
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
          {props.errorTerlambatBertingkatDetail ? (
            <h4>{props.errorTerlambatBertingkatDetail}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(TerlambatBertingkatComponent);

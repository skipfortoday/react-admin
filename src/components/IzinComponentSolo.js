import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Tooltip } from "reactstrap";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteIzin, getIzinDetailForm, getIzinListSolo } from "../actions/izinAction";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../components/IzinComponentSolo.css';



const { SearchBar } = Search;



const handleEditClick = (dispatch, DatangID) => {
  dispatch(getIzinDetailForm(DatangID))
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
    UserID: state.form.formLengkapiAbsen.values.Nama.value,
    TglAwal: state.form.formLengkapiAbsen.values.TglAwal,
    TglAkhir: state.form.formLengkapiAbsen.values.TglAkhir,
  };
};




const IzinComponentSolo = (props) => {
  console.log(props)
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
          }).then((value) => {
             dispatch(getIzinListSolo(props.UserID,props.TglAwal,props.TglAkhir))
          }); 
        } else {
          swal("Data gagal dihapus");
        }
      });
  }
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [tooltipOpenH, setTooltipOpenH] = useState(false);
  const toggleH = () => setTooltipOpenH(!tooltipOpenH);

  const columns = [
    {
      dataField: "TanggalIzin",
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
      dataField: "ScanMasuk",
      text: "Datang",
      sort: true,
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "normal" };
      },
    },

    {
      dataField: "ScanPulang",
      text: "Pulang",
      sort: true,
      headerStyle: () => {
        return { width: "120px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "normal" };
      },
    },

    {
      dataField: "STATUS",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { width: "100px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "normal" };
      },

    },
    {
      dataField: "Keterangan",
      text: "Keterangan",
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
        return { width: "70px", backgroundColor: "#f9a826" };
      },
      style: () => {
        return { fontWeight: "normal" };
      },
      formatter: (rowContent, row) => {
        return (
          <span>
            <Button size="sm" color="danger" className="mr-1" id="TooltipHapus" onClick={() => handleClick(props.dispatch, row.DatangID)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button size="sm" color="warning" className="mr-1" id="TooltipEdit" onClick={() => handleEditClick(props.dispatch, row.DatangID)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </span>
        );
      },
    },
  ];

  // console.log(props.getIzinListSolo);
  return (
    <div>
      
      { props.getIzinListSolo[0] ? (
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
              {/* <Card body inverse color="light"> */}
              <Row>
                <Col>
                  <div className="float-right" >
                    <SearchBar {...props.searchProps} placeholder="Search .." />
                  </div>
                </Col>
              </Row>
              {/* <div id="TooltipHapus"></div> */}
              <Tooltip placement="auto" isOpen={tooltipOpen} target="TooltipHapus" toggle={toggle}>
                Hapus Status Absensi
              </Tooltip>
              {/* <div id="TooltipEdit"></div> */}
              <Tooltip placement="auto" isOpen={tooltipOpenH} target="TooltipEdit" toggle={toggleH}>
                Edit Status Absensi
              </Tooltip>
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
                sizePerPage={50}
              />

              {/* </Card> */}
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorIzinListSolo ? (
            <h4>props.errorIzinListSolo</h4>
          ) : (
            "Belum Ada Data"

          )}

        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(IzinComponentSolo);

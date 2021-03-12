import React ,{ useState }from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner,Tooltip  } from "reactstrap";

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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const columns = [
  {
      dataField: "TanggalIzin",
      text: "Tanggal Izin",
      sort: true,
      headerStyle: () => {
        return { width: "120px",backgroundColor:"#fec107" };
      },
      style: () => {
        return {  fontWeight : "bold"};
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
        return { fontWeight : "bold" };
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
        return {  fontWeight : "bold" };
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
        return { fontWeight : "bold"  };
      },
    },
    {
      dataField: "link",
      text: "Hapus",
      headerStyle: () => {
        return { width: "40px" ,backgroundColor:"#fec107"   };
      },
      style: () => {
        return { fontWeight : "bold"  };
      },
      formatter: (rowContent, row) => {
        return (
          <span> 
            <Button size="sm"  color="danger" className="mr-2" id="TooltipExample"  onClick={() => handleClick(props.dispatch, row.DatangID)}>
              -
            </Button>  
            </span>
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
              {/* <Card body inverse color="light"> */}
              <Row>
                <Col>
                  <div className="float-right" >
                    <SearchBar {...props.searchProps} placeholder="Search .." />
                  </div>
                </Col>
              </Row>
              <div id="TooltipExample"></div>
              <Tooltip placement="auto" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
              Hapus Status Absensi
            </Tooltip>
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
           
              {/* </Card> */}
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


import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import  { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux"

const { SearchBar } = Search;



const mapStateToProps = (state) => {
  return {
    getLaporanList: state.Laporan.getLaporanList,
    getExpandKey: state.Laporan.getExpandKey,
    errorLAporanList: state.Laporan.errorLaporanList,
  };
};


const LaporanComponent = (props) => {
  const columns = [
    {
      dataField: "Tanggal",
      text: "Tanggal",
      sort: true,
      headerStyle: () => {
        return { width: "85px" , fontSize: '12px' ,lineHeight: '10%' , backgroundColor:'#dbdbdb' };
      },
      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    {
      dataField: "ScanMasuk",
      text: "Datang",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
    },
    
    {
      dataField: "ScanPulang",
      text: "Pulang",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px', lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
    },
    {
      dataField: "Terlambat",
      text: "Tlmbat",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px', lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
      style: () => {
        return { color: 'red' };
      },

    },
    {
      dataField: "Lembur",
      text: "Lembur",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
      style: () => {
        return { color: '#017580' };
      },
    },
    {
      dataField: "Shift",
      text: "S",
      sort: true,
      headerStyle: () => {
        return { width: "5px"  , fontSize: '12px', lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    {
      dataField: "IstirahatKeluar",
      text: "Break",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '10px' , lineHeight: '10%' , backgroundColor:'#dbdbdb'};
      },
    },
    {
      dataField: "IstirahatKembali",
      text: "Kmbl",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '10px' , lineHeight: '10%' , backgroundColor:'#dbdbdb'};
      },
    },
    {
      dataField: "TerlambatIstirahat",
      text: "Tlmbat",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '10px' , lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
      style: () => {
        return { color: 'red'};
      },
    },
    {
      dataField: "Status",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { width: "60px" , fontSize: '12px' , lineHeight: '10%' , backgroundColor:'#dbdbdb'};
      },
      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    {
      dataField: "Keterangan",
      text: "Keterangan",
      sort: true,
      headerStyle: () => {
        return { width: "100px" , fontSize: '12px' , lineHeight: '10%' , backgroundColor:'#dbdbdb'};
      },
      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    {
      dataField: "KetPulang",
      text: "KetPulang",
      sort: true,
      headerStyle: () => {
        return { width: "70px", fontSize: '12px' ,lineHeight: '10%' , backgroundColor:'#dbdbdb' };
      },

      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    
  ];

  const dtColumns = [

    {
      dataField: "k",
      text: "",
      sort: true,
      headerStyle: () => {
        return {  };
      },
      style: () => {
        return { width: "30px" };
      },
    },
    {
      dataField: "KelKan",
      text: "",
      sort: true,
      headerStyle: () => {
        return {  };
      },
      style: () => {
        return { width: "30px" };
      },
    },
    {
      dataField: "Durasi",
      text: "",
      sort: true,
      headerStyle: () => {
        return { };
      },
      style: () => {
        return { width: "30px" };
      },
    },
    {
      dataField: "Ket",
      text: "",
      sort: true,
      headerStyle: () => {
        return { };
      },
      style: () => {
        return { width: "100px" ,  fontWeight: "normal" };
      },
    },
    {
      dataField: "KetKembali",
      text: "",
      sort: true,
      headerStyle: () => {
        return { };
      },
      style: () => {
        return { width: "100px" ,  fontWeight: "normal" };
      },
    },
    
  ]

  /*DatangID: 105
JamKeluar: "11:31:00"
JamKembali: "12:31:00"
KeluarID: 1
Keterangan: "undefined"
KeteranganKembali: null
TotalKeluar: null*/
const defaultSorted = [
  {
    dataField: "Tanggal",
    order: "asc",
  },
];

  const expandRow = {
    renderer: (row, rowIndex) => (
      <div>
        <BootstrapTable 
          classes='rDetail'
          keyField='DatangID' 
          data={ row.detail } 
          rowStyle={ { lineHeight: '70%' , fontWeight: "bold" , fontFamily: 'TimesNewRoman',  fontSize:"12px" } } 
          columns={ dtColumns } 
          defaultSortDirection="asc"
          defaultSorted={ defaultSorted } 
          />

      </div>
    ),
    expanded:props.getExpandKey[0],
    nonExpandable:props.getExpandKey[1]
  };



  return (
    <BootstrapTable 
      keyField='Tanggal' 
      data={ props.getLaporanList } 
      columns={ columns } 
      expandRow={ expandRow }
      rowStyle={ { lineHeight : '0px' , fontFamily: 'TimesNewRoman' , fontWeight: "bold" , fontSize:"12px" } }
      pagination={paginationFactory()}
    />
  );
  /*return (
    <Container>
      {props.getLaporanList ? (
        <ToolkitProvider
          bootstrap4
          keyField="UserID"
          data={props.getLaporanList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div >


              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorLaporanList ? (
            <h4>{props.errorLaporanList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );*/
};

export default connect(mapStateToProps, null)(LaporanComponent);

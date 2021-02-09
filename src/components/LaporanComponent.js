
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import  { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux"

const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "TanggalScan",
    order: "asc",
  },
];

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
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "ScanMasuk",
      text: "Datang",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
      style: () => {
        return { fontSize: '12px' };
      },

    },
    
    {
      dataField: "ScanPulang",
      text: "Pulang",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px', lineHeight: '10%', backgroundColor:'#dbdbdb' };
      },
      style: () => {
        return { fontSize: '12px' };
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
        return { color: 'red', fontSize: '12px' };
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
        return { fontSize: '12px' , color: '#017580' };
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
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "IstirahatKeluar",
      text: "Break",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '10px' , lineHeight: '10%' , backgroundColor:'#dbdbdb'};
      },
      style: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "IstirahatKembali",
      text: "Kmbl",
      sort: true,
      headerStyle: () => {
        return { width: "38px" , fontSize: '10px' , lineHeight: '10%' , backgroundColor:'#dbdbdb'};
      },
      style: () => {
        return { fontSize: '12px' };
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
        return { color: 'red' , fontSize: '12px' , lineHeight: '10%' };
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
        return { fontSize: '10px' };
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
        return { fontSize: '10px' };
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
        return { fontSize: '10px' };
      },
    },
    
  ];

  const dtColumns = [

    {
      dataField: "k",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "120px" , fontSize: '12px'  };
      },
      style: () => {
        return { fontSize: '12px' ,width: "25px" };
      },
    },
    {
      dataField: "KelKan",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "90px" , fontSize: '12px'  };
      },
      style: () => {
        return { fontSize: '12px', width: "25px" };
      },
    },
    {
      dataField: "Durasi",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "90px" , fontSize: '12px' };
      },
      style: () => {
        return { fontSize: '12px' ,width: "25px" };
      },
    },
    {
      dataField: "Ket",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "120px" , fontSize: '12px'  };
      },
      style: () => {
        return { fontSize: '10px' ,width: "100px"};
      },
    },
    {
      dataField: "KetKembali",
      text: "",
      sort: true,
      headerStyle: () => {
        return { width: "120px" , fontSize: '12px'  };
      },
      style: () => {
        return { fontSize: '10px' , width: "100px" };
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

  const expandRow = {
    renderer: (row, rowIndex) => (
      <div>
        <BootstrapTable 
          classes='rDetail'
          keyField='DatangID' 
          data={ row.detail } 
          rowStyle={ { lineHeight: '80%' } } 
          columns={ dtColumns } 
          />

      </div>
    ),
    expanded:props.getExpandKey[0],
    nonExpandable:props.getExpandKey[1]
  };

  console.log(props.getLaporanList);

  return (
    <BootstrapTable 
      keyField='Tanggal' 
      data={ props.getLaporanList } 
      columns={ columns } 
      expandRow={ expandRow }
      rowStyle={ { lineHeight : '9px' } } 
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

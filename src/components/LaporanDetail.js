
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux"
import { getLaporanDetail } from "../actions/laporanAction";


const mapStateToProps = (state) => {
  return {
    getLaporanDetail: state.Laporan.getLaporanDetail,
    getExpandKey: state.Laporan.getExpandKey,
    errorLaporanDetail: state.Laporan.errorLaporanDetail,
  };
};


const LaporanDetail = (props) => {
  const columns = [
    {
      dataField: "Tanggal",
      text: "Tanggal",
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
      headerStyle: () => {
        return { width: "120px" , fontSize: '12px'  };
      },
      style: () => {
        return { fontSize: '10px' , width: "100px" };
      },
    },
    
  ]

  const options = {
    firstPageText: 'OK',
    sizePerPageList: [{
      text: 'OK', value: 100
    }] // A numeric array is also available. the purpose of above example is custom the text
  };
  
  /*DatangID: 105
JamKeluar: "11:31:00"
JamKembali: "12:31:00"
KeluarID: 1
Keterangan: "undefined"
KeteranganKembali: null
TotalKeluar: null*/

  const expandRow = {
    renderer: (row) => (
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

  return (
    <BootstrapTable 
      keyField='Tanggal' 
      data={ props.getLaporanDetail } 
      columns={ columns } 
      expandRow={ expandRow }
      rowStyle={ { lineHeight : '9px' } } 
      pagination={paginationFactory(options)}
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

export default connect(mapStateToProps, null)(LaporanDetail);

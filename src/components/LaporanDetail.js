
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux"


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
      sort: true,
      headerStyle: () => {
        return { width: "90px" , fontSize: '12px' ,lineHeight: '10%' };
      },
      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    {
      dataField: "ScanMasuk",
      text: "Datang",
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%' };
      },
    },
    
    {
      dataField: "ScanPulang",
      text: "Pulang",
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px', lineHeight: '10%' };
      },
    },
    {
      dataField: "Terlambat",
      text: "Tlmbat",
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px', lineHeight: '10%'};
      },
      style: () => {
        return { color: 'red' };
      },

    },
    {
      dataField: "Lembur",
      text: "Lembur",
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%'};
      },
      style: () => {
        return { color: '#017580' };
      },
    },
    {
      dataField: "Shift",
      text: "Shift",
      headerStyle: () => {
        return { width: "2px"  , fontSize: '12px', lineHeight: '10%' };
      },
      style: () => {
        return { fontWeight: "normal"  };
      },
    },
    {
      dataField: "IstirahatKeluar",
      text: "Break",
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%'};
      },
    },
    {
      dataField: "IstirahatKembali",
      text: "Kmbl",
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%'};
      },
    },
    {
      dataField: "TerlambatIstirahat",
      text: "Tlmbat",
      headerStyle: () => {
        return { width: "38px" , fontSize: '12px' , lineHeight: '10%' };
      },
      style: () => {
        return { color: 'red' };
      },
    },
    {
      dataField: "Status",
      text: "Status",
      headerStyle: () => {
        return { width: "70px" , fontSize: '12px' , lineHeight: '10%'};
      },
      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    {
      dataField: "Keterangan",
      text: "Keterangan",
      headerStyle: () => {
        return { width: "150px" , fontSize: '12px' , lineHeight: '10%'};
      },
      style: () => {
        return {  fontWeight: "normal"  };
      },
    },
    {
      dataField: "KetPulang",
      text: "KetPulang",
      headerStyle: () => {
        return { width: "65px", fontSize: '12px' ,lineHeight: '10%'};
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
      headerStyle: () => {
        return { };
      },
      style: () => {
        return { width: "30px" };
      },
    },
    {
      dataField: "Durasi",
      text: "",
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
      headerStyle: () => {
        return {  };
      },
      style: () => {
        return { width: "100px" ,  fontWeight: "normal" };
      },
    },
    {
      dataField: "KetKembali",
      text: "",
      headerStyle: () => {
        return { };
      },
      style: () => {
        return {  width: "100px" , fontWeight: "normal"};
      },
    },
    
  ]

  const defaultSorted = [{
    dataField: 'Urutan',
    order: 'desc'
  }];
  

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
          rowStyle={ { lineHeight: '70%' , fontWeight: "bold" , fontFamily: 'TimesNewRoman',  fontSize:"12px" } } 
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
      classes='rTblBsr'
      data={ props.getLaporanDetail } 
      columns={ columns } 
      expandRow={ expandRow }
      rowStyle={ { lineHeight : '0px' , fontFamily: 'TimesNewRoman' , fontWeight: "bold" , fontSize:"12px" } } 
      pagination={paginationFactory(options)}
      defaultSorted= { defaultSorted }
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

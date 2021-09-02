
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux"


// const mapStateToProps = (state) => {
//   var arrobj = state.Laporan.getLaporanDetail.body;
//   var arr = [];
//   for(var data in arrobj){
//     arr.push(arrobj[data])
//   };
//   return {
//     getLaporanDetail: arr,
//     getExpandKey: state.Laporan.getExpandKey,
//     errorLaporanDetail: state.Laporan.errorLaporanDetail,
//   };
// };

const rowClasses = row => (row.Tanggal.includes('Minggu') ? "alert-row" :"");

function terlambatFormatter(cell, row) {
  if (row.Terlambat) {
    return (
      <span>
        <strong style={ { color: 'red'} }>{ cell }</strong>
      </span>
    );
  }

  return (
    <span>{ cell }</span>
  );
}

function LiburFormatter(cell, row) {
  if (row.Tanggal.includes('Minggu') ) {
    return (
      <span>
        <strong style={ { color: 'red'   } } >{ cell }</strong>
      </span>
    );
  }

  return (
    <span>{ cell }</span>
  );
}


const LaporanDetailBanyak = (props) => {
  // console.log(props.getLaporanDetail);
  // console.log(Array.isArray(props.getLaporanDetail));
    const columns = [
        {
        dataField: "Tanggal",
        text: "Tanggal",
        sort: true,
        formatter: LiburFormatter,
        headerStyle: () => {
            return {  width: "80px", fontSize: '12px' ,padding : '0px', textAlign:'center',  };
        },
        style: () => {
            return {  fontWeight: "normal" , fontSize :'12px' ,textAlign:'right',padding : '0px'};
        },
        },
        {
            dataField: "ScanMasuk",
            text: "Datang",
            formatter: terlambatFormatter,
            headerStyle: () => {
                return { width: "42px" , fontSize: '12px' ,textAlign:'center',padding : '0px' };  
            },
            style: () => {
                return { padding : '0px' };
            },
        },
        
        {
        dataField: "ScanPulang",
        text: "Pulang",
        headerStyle: () => {
            return { width: "42px" , fontSize: '12px',textAlign:'center' ,padding : '0px'};
        },
        style: () => {
            return { padding : '0px' };
        },
        },
        {
        dataField: "Terlambat",
        text: "Tlmbat",
        headerStyle: () => {
            return { width: "38px" , fontSize: '12px', textAlign:'center',padding : '0px'};
        },
        style: () => {
            return { color: 'red',padding : '0px' };
        },

        },
        {
        dataField: "Lembur",
        text: "Lembur",
        headerStyle: () => {
            return { width: "38px" , fontSize: '12px' , textAlign:'center', padding : '0px'};
        },
        style: () => {
            return { color: '#017580' ,padding : '0px'};
        },
        },
        {
        dataField: "Shift",
        text: "Shift",
        headerStyle: () => {
            return { width: "15px"  , fontSize: '12px', textAlign:'center',padding : '0px' };
        },
        style: () => {
            return { fontWeight: "normal" ,padding : '0px' };
        },
        },
        {
        dataField: "IstirahatKeluar",
        text: "Break",
        headerStyle: () => {
            return { width: "38px" , fontSize: '12px',textAlign:'center',padding : '0px'};
        },
        style: () => {
            return { padding : '0px' };
        },
        },
        {
        dataField: "IstirahatKembali",
        text: "Kmbl",
        headerStyle: () => {
            return { width: "38px" , fontSize: '12px',textAlign:'center',padding : '0px'};
        },
        style: () => {
            return { padding : '0px' };
        },
        },
        {
        dataField: "TerlambatIstirahat",
        text: "Tlmbat",
        headerStyle: () => {
            return { width: "38px" , fontSize: '12px' ,textAlign:'center',padding : '0px' };
        },
        style: () => {
            return { color: 'red',padding : '0px' };
        },
        },
        {
        dataField: "Status",
        text: "Status",
        formatter: LiburFormatter,
        headerStyle: () => {
            return { width: "80px" , fontSize: '12px',textAlign:'center',padding : '0px'};
        },
        style: () => {
            return {  fontWeight: "normal" ,padding : '0px' };
        },
        },
        {
        dataField: "Keterangan",
        text: "Keterangan",
        headerStyle: () => {
            return { width: "165px" , fontSize: '12px' ,textAlign:'center',padding : '0px'};
        },
        style: () => {
            return {  fontWeight: "normal" , fontSize: '12px' ,padding : '0px' };
        },
        },
        {
        dataField: "KetPulang",
        text: "KetPulang",
        headerStyle: () => {
            return { width: "100px", fontSize: '12px',textAlign:'center',padding : '0px'};
        },
        style: () => {
            return {  fontWeight: "normal" ,padding : '0px'  };
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
            return { width: "30px"  ,padding : '0px'};
        },
        },
        {
        dataField: "KelKan",
        text: "",
        headerStyle: () => {
            return { };
        },
        style: () => {
            return { width: "40px" ,padding : '0px' };
        },
        },
        {
        dataField: "Durasi",
        text: "",
        headerStyle: () => {
            return { };
        },
        style: () => {
            return { width: "30px" ,padding : '0px' };
        },
        },
        {
        dataField: "Ket",
        text: "",
        headerStyle: () => {
            return {  };
        },
        style: () => {
            return { width: "100px" ,  fontWeight: "normal" ,padding : '0px' };
        },
        },
        {
        dataField: "KetKembali",
        text: "",
        headerStyle: () => {
            return { };
        },
        style: () => {
            return {  width: "100px" , fontWeight: "normal" ,padding : '0px'};
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

    var arrobj = props.data.data.body
    let expands = props.data.expandKey
    var rowsLaporan = [];
    for(var data in arrobj){
        rowsLaporan.push(arrobj[data])
    };

    const expandRow = {
        renderer: (row) => (
        <div>
            <BootstrapTable 
            classes='rDetail'
            keyField='DatangID' 
            data={ row.detail } 
            rowStyle={ {  fontWeight: "bold" , fontFamily: 'TimesNewRoman',  fontSize:"12px",padding : '0px' } } 
            columns={ dtColumns } 
            />
        </div>
        ),
        expanded:expands[0],
        nonExpandable:expands[1]
    };

    

    return (
    <BootstrapTable 
      keyField='Tanggal'
      data={ rowsLaporan } 
      columns={ columns } 
      expandRow={ expandRow }
      rowClasses={rowClasses}
      headerClasses='page-header-space'
      rowStyle={ {fontFamily: 'TimesNewRoman' , fontWeight: "bold" , fontSize:"12px", textAlign:'center' ,padding : '0px'} } 
      pagination={paginationFactory(options) }
      defaultSorted= { defaultSorted }
    />
  );
};

export default LaporanDetailBanyak
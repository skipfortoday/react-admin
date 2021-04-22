import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {  Spinner } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    getLaporanList: state.Laporan.getLaporanList,
    getExpandKey: state.Laporan.getExpandKey,
    errorLaporanList: state.Laporan.errorLaporanList,
  };
};

const rowClasses = (row) => (row.Tanggal.includes("Minggu") ? "alert-row" : "");

function terlambatFormatter(cell, row) {
  if (row.Terlambat) {
    return (
      <span>
        <strong style={{ color: "red" }}>{cell}</strong>
      </span>
    );
  }

  return <span>{cell}</span>;
}

function LiburFormatter(cell, row) {
  if (row.Tanggal.includes("Minggu")) {
    return (
      <span>
        <strong style={{ color: "red" }}>{cell}</strong>
      </span>
    );
  }

  return <span>{cell}</span>;
}

function KeteranganPanjang(cell, row) {
  if (row.Keterangan != null && row.Keterangan.length > 60) {
    return (
      <span>
        <strong
          style={{ lineHeight: "10px", fontWeight: "normal", fontSize: "12px" }}
        >
          {cell}
        </strong>
      </span>
    );
    // if (row.Keterangan != null && row.Keterangan.length > 120) {
    //   return (
    //     <span>
    //       <strong style={ { lineHeight: '18px' ,fontWeight: "normal" , fontSize: '12px' } } >{ cell }</strong>
    //     </span>
    //   );
    // }
  }

  return <span>{cell}</span>;
}

const LaporanDetail2 = (props) => {
  const columns = [
    {
      dataField: "Tanggal",
      text: "Tanggal",
      sort: true,
      formatter: LiburFormatter,
      headerStyle: () => {
        return {
          width: "90px",
          fontSize: "12px",
          padding: "0px",
          textAlign: "center",
        };
      },
      style: () => {
        return { fontWeight: "normal", fontSize: "12px", textAlign: "right" ,padding: "0px" };
      },
    },
    {
      dataField: "ScanMasuk",
      text: "Datang",
      formatter: terlambatFormatter,
      headerStyle: () => {
        return {
          width: "38px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { padding: "0px" };
      },
    },

    {
      dataField: "ScanPulang",
      text: "Pulang",
      headerStyle: () => {
        return {
          width: "38px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { padding: "0px" };
      },
    },
    {
      dataField: "Terlambat",
      text: "Tlmbat",
      headerStyle: () => {
        return {
          width: "38px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { color: "red" , padding: "0px" };
      },
    },
    {
      dataField: "Lembur",
      text: "Lembur",
      headerStyle: () => {
        return {
          width: "38px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { color: "#017580" , padding: "0px"};
      },
    },
    {
      dataField: "Shift",
      text: "Shift",
      headerStyle: () => {
        return {
          width: "15px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { fontWeight: "normal", padding: "0px" };
      },
    },
    {
      dataField: "IstirahatKeluar",
      text: "Break",
      headerStyle: () => {
        return {
          width: "38px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { padding: "0px" };
      },
    },
    {
      dataField: "IstirahatKembali",
      text: "Kmbl",
      headerStyle: () => {
        return {
          width: "38px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { padding: "0px" };
      },
    },
    {
      dataField: "TerlambatIstirahat",
      text: "Tlmbat",
      headerStyle: () => {
        return {
          width: "38px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { color: "red", padding: "0px" };
      },
    },
    {
      dataField: "Status",
      text: "Status",
      formatter: LiburFormatter,
      headerStyle: () => {
        return {
          width: "80px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { fontWeight: "normal", padding: "0px" };
      },
    },
    {
      dataField: "Keterangan",
      text: "Keterangan",
      formatter: KeteranganPanjang,
      headerStyle: () => {
        return {
          width: "150px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { fontWeight: "normal", fontSize: "12px", padding: "0px" };
      },
    },
    {
      dataField: "KetPulang",
      text: "KetPulang",
      headerStyle: () => {
        return {
          width: "65px",
          fontSize: "12px",
          textAlign: "center",
          padding: "0px",
        };
      },
      style: () => {
        return { fontWeight: "normal" , padding: "0px"};
      },
    },
  ];

  const dtColumns = [
    {
      dataField: "k",
      text: "",
      headerStyle: () => {
        return {};
      },
      style: () => {
        return { width: "30px" };
      },
    },
    {
      dataField: "KelKan",
      text: "",
      headerStyle: () => {
        return {};
      },
      style: () => {
        return { width: "30px" };
      },
    },
    {
      dataField: "Durasi",
      text: "",
      headerStyle: () => {
        return {};
      },
      style: () => {
        return { width: "30px" };
      },
    },
    {
      dataField: "Ket",
      text: "",
      headerStyle: () => {
        return {};
      },
      style: () => {
        return { width: "100px", fontWeight: "normal" };
      },
    },
    {
      dataField: "KetKembali",
      text: "",
      headerStyle: () => {
        return {};
      },
      style: () => {
        return { width: "100px", fontWeight: "normal" };
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "Urutan",
      order: "desc",
    },
  ];

  const options = {
    firstPageText: "OK",
    sizePerPageList: [
      {
        text: "OK",
        value: 100,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
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
          classes="rDetail"
          keyField="DatangID"
          data={row.detail}
          rowStyle={{
            fontWeight: "bold",
            fontFamily: "TimesNewRoman",
            fontSize: "12px",
          }}
          columns={dtColumns}
        />
      </div>
    ),
    expanded: props.getExpandKey[0],
    nonExpandable: props.getExpandKey[1],
  };
  {console.log(props.getLaporanList)}
  return (
    <div>
      {props.getLaporanList  ? (
        
        <div>
          <BootstrapTable
            keyField="Tanggal"
            data={props.getLaporanList}
            columns={columns}
            expandRow={expandRow}
            rowClasses={rowClasses}
            headerClasses="page-header-space"
            rowStyle={{
              fontFamily: "TimesNewRoman",
              fontWeight: "bold",
              fontSize: "12px",
              textAlign: "center",
              padding: "0px",
            }}
            pagination={paginationFactory(options)}
            defaultSorted={defaultSorted}
          />
        </div>
      ) : (
        <div className="text-center">
          {!props.errorLaporanList ? (
            <h4>{props.errorLaporanList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
          
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, null)(LaporanDetail2);

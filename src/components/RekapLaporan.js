import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanHead: state.Laporan.getLaporanHead,
    getLaporanRekap: state.Laporan.getLaporanRekap,
  };
};

const RekapLaporan = (props) => {
  return (
    <Table borderless size="sm">
      <tbody style={{fontSize: '14px' , fontWeight: "bold" , lineHeight : "100%" , fontFamily : "Arial"}}>
        <tr >
          <td width="120">Periode</td>
          <td width="10">:</td>
          <td>{props.getLaporanRekap.Periode}</td>
        </tr>
        <tr>
          <td width="120">Nama</td>
          <td width="10">:</td>
          <td>{props.getLaporanHead.Nama}</td>
        </tr> 
        <tr>
          <td width="120">Posisi / Jabatan</td>
          <td width="10">:</td>
          <td>{props.getLaporanHead.Posisi}</td>
        </tr>
        
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLaporan);

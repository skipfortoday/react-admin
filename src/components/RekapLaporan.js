import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getUserDetail: state.users.getUserDetail,
    getLaporanRekap: state.Laporan.getLaporanRekap,
    errorUserDetail: state.users.errorUserDetail,
  };
};

const RekapLaporan = (props) => {
  return (
    <Table borderless size="sm">
      <tbody style={{fontSize: '14px' , fontWeight: "bold"}}>
        <tr >
          <td width="120">Tanggal</td>
          <td width="10">:</td>
          <td>{props.getLaporanRekap.Periode}</td>
        </tr>
        <tr>
          <td width="120">Nama</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Nama}</td>
        </tr> 
        <tr>
          <td width="120">Posisi / Jabatan</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Jabatan}</td>
        </tr>
        
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLaporan);

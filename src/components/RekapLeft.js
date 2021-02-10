import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
    return {
      getLaporanRekap: state.Laporan.getLaporanRekap,
      errorLaporanRekap: state.Laporan.errorLaporanRekap,
    };
};

  
const RekapLeft = (props) => {
  return (
    <Table size="sm">
      <tbody>
        <tr>
          <td>Ijin Terlambat</td>
          <td>:</td>
          <td>{props.getLaporanRekap.JumTerlambat}</td>
        </tr> 
        <tr>
          <td >Jumlah Terlambat</td>
          <td >:</td>
          <td>{props.getLaporanRekap.JumTerlambat}</td>
          <td >=</td>
          <td >{props.getLaporanRekap.RpPotonganTerlambat}</td>
        </tr>
        <tr>
          <td >Ijin Tidak Masuk</td>
          <td >:</td>
          <td>{props.getLaporanRekap.JumTerlambat}</td>
          <td >=</td>
          <td >{props.getLaporanRekap.RpPotonganTerlambat}</td>
        </tr>
        <tr>
          <td >Trlmbt Kmbl Istrht</td>
          <td >:</td>
          <td>{props.getLaporanRekap.JumTerlambat}</td>
          <td >=</td>
          <td >{props.getLaporanRekap.RpPotonganTerlambat}</td>
        </tr>
        <tr>
          <td >Total Potongan</td>
          <td ></td>
          <td ></td>
          <td >=</td>
          <td>{props.getLaporanRekap.JumTerlambat}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLeft);

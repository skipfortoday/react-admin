import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getIzinDetail: state.Izin.getIzinDetail,
    errorIzinDetail: state.Izin.errorIzinDetail,
  };
};

const DetailIzinComponent = (props) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="200">DatangID</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.DatangID}</td>
        </tr>
        <tr>
          <td width="200">Nama</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Nama}</td>
        </tr>
        <tr>
          <td width="200">Tanggal</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.TanggalScan}</td>
        </tr>
        <tr>
          <td width="200">Status</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Status}</td>
        </tr>
        <tr>
          <td width="200">Keterangan</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Keterangan}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailIzinComponent);

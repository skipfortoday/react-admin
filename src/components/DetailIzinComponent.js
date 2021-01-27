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
          <td width="200">TanggalIzin</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.TanggalIzin}</td>
        </tr>
        <tr>
          <td width="200">Nama</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Nama}</td>
        </tr>
        <tr>
          <td width="200">UserID</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.UserID}</td>
        </tr>
        <tr>
          <td width="200">Alamat</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Alamat}</td>
        </tr>
        <tr>
          <td width="200">Group</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Jabatan}</td>
        </tr>
        <tr>
          <td width="200">Nama Cabang</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.NamaCabang}</td>
        </tr>
        <tr>
          <td width="200">Status</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Status}</td>
        </tr>
        <tr>
          <td width="200">Status</td>
          <td width="10">:</td>
          <td>{props.getIzinDetail.Keterangan}</td>
        </tr>
        

      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailIzinComponent);

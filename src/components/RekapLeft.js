import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getUserDetail: state.users.getUserDetail,
    errorUserDetail: state.users.errorUserDetail,
  };
};

const RekapLeft = (props) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="120">Ijin Terlambat</td>
          <td width="10">:</td>
          <td width="10">{props.getUserDetail.Nama}</td>
          <td width="100">Jumlah Sakit Bulan Ini</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Nama}</td>
          <td width="200">Jumlah Lembur</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Nama}</td>
        </tr> 
        <tr>
          <td width="100">Jabatan</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Jabatan}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLeft);

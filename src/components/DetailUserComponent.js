import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getUserDetail: state.users.getUserDetail,
    errorUserDetail: state.users.errorUserDetail,
  };
};

const DetailUserComponent = (props) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="200">Nama</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.UserID}</td>
        </tr>
        <tr>
          <td width="200">Alamat</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Nama}</td>
        </tr>
        <tr>
          <td width="200">Umur</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.NamaRole}</td>
        </tr>
        <tr>
          <td width="200">No HP</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.NamaCabang}</td>
        </tr><tr>
          <td width="200">No HP</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Hari}{props.getUserDetail.Bulan}{props.getUserDetail.Tahun}</td>
        </tr>

      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailUserComponent);

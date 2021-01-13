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
          <td width="200">UserID</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.UserID}</td>
        </tr>
        <tr>
          <td width="200">Nama</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Nama}</td>
        </tr>
        <tr>
          <td width="200">Pass</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Pass}</td>
        </tr>
        <tr>
          <td width="200">Tanggal Masuk</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.TglMasuk}</td>
        </tr>
        <tr>
          <td width="200">Role User</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.RoleUser}</td>
        </tr>
        <tr>
          <td width="200">ID Groups</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.IdGroups}</td>
        </tr>
        <tr>
          <td width="200">Kode Cabang</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.KodeCabang}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailUserComponent);

import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getGroupDetail: state.Group.getGroupDetail,
    errorGroupDetail: state.Group.errorGroupDetail,
  };
};

const DetailGroupComponent = (props) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="200">GroupID</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.GroupID}</td>
        </tr>
        <tr>
          <td width="200">Nama Group</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.Jabatan}</td>
        </tr>
        <tr>
          <td width="200">Jam Datang 1</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamDatang}</td>
        </tr>
        <tr>
          <td width="200">Jam Pulang 1</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamPulang}</td>
        </tr>
        <tr>
          <td width="200">Max Jam Datang</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MaxJamDatang}</td>
        </tr>
        <tr>
          <td width="200">Min Jam Lembur</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MinJamLembur}</td>
        </tr>
        <tr>
          <td width="200">Hari Libur</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.HariLibur}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailGroupComponent);

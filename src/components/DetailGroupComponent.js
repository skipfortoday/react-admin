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
          <td width="200">Jam Datang Pagi</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamDatang}</td>
        </tr>
        <tr>
          <td width="200">Max Jam Datang Pagi</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MaxJamDatang}</td>
        </tr>
        <tr>
          <td width="200">Jam Pulang Pagi</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamPulang}</td>
        </tr>
        <tr>
          <td width="200">Min Jam Lembur Pagi</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MinJamLembur}</td>
        </tr>
        <tr>
          <td width="200">Jam Datang Siang</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamDatangSiang}</td>
        </tr>
        <tr>
          <td width="200">Max Jam Datang Siang</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MaxJamDatangSiang}</td>
        </tr>
        <tr>
          <td width="200">Jam Pulang Siang</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamPulangSiang}</td>
        </tr>
        <tr>
          <td width="200">Min Jam Lembur Siang</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MinJamLemburSiang}</td>
        </tr>
        <tr>
          <td width="200">Jam Datang Sore</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamDatangSore}</td>
        </tr>
        <tr>
          <td width="200">Max Jam Datang Sore</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MaxJamDatangSore}</td>
        </tr>
        <tr>
          <td width="200">Jam Pulang Sore</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.JamPulangSore}</td>
        </tr>
        <tr>
          <td width="200">Min Jam Lembur Sore</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.MinJamLemburSore}</td>
        </tr>
        <tr>
          <td width="200">Hari Libur</td>
          <td width="10">:</td>
          <td>{props.getGroupDetail.HariLibur}</td>
        </tr><tr>
          <td width="200">Rp Lembur Perjam</td>
          <td width="10">:</td>
          <td>Rp. {props.getGroupDetail.RpLemburPerJam}</td>
        </tr>
        <tr>
          <td width="200">Potongan Terlambat</td>
          <td width="10">:</td>
          <td>Rp. {props.getGroupDetail.RpPotonganTerlambat}</td>
        </tr>
        <tr>
          <td width="200">Potongan Tidak Masuk</td>
          <td width="10">:</td>
          <td>Rp. {props.getGroupDetail.RpPotonganTidakMasuk}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailGroupComponent);

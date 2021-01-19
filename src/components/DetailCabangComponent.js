import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getCabangDetail: state.Cabang.getCabangDetail,
    errorCabangDetail: state.Cabang.errorCabangDetail,
  };
};

const DetailCabangComponent = (props) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="200">Kode Cabang </td>
          <td width="10">:</td>
          <td>{props.getCabangDetail.KodeCabang}</td>
        </tr>
        <tr>
          <td width="200">Nama Cabang</td>
          <td width="10">:</td>
          <td>{props.getCabangDetail.NamaCabang}</td>
        </tr>
        <tr>
          <td width="200">Alamat</td>
          <td width="10">:</td>
          <td>{props.getCabangDetail.Alamat}</td>
        </tr>
        <tr>
          <td width="200">General Manager</td>
          <td width="10">:</td>
          <td>{props.getCabangDetail.GeneralManagerID}</td>
        </tr>
        <tr>
          <td width="200">HRD</td>
          <td width="10">:</td>
          <td>{props.getCabangDetail.hrdID}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailCabangComponent);

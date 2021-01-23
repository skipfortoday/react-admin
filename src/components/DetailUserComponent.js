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
          <td width="200">Pass</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Pass}</td>
        </tr>
        <tr>
          <td width="200">Nama</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Nama}</td>
        </tr> 
        <tr>
          <td width="200">Tanggal Lahir</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.LahirHari}/{props.getUserDetail.LahirBulan}/{props.getUserDetail.LahirTahun}</td>
        </tr>
        <tr>
          <td width="200">Alamat</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Alamat}</td>
        </tr>  
        <tr>
          <td width="200">HP</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.HP}</td>
        </tr>
        <tr>
          <td width="200">Jabatan</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Jabatan}</td>
        </tr>
        <tr>
          <td width="200">NamaCabang</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.NamaCabang}</td>
        </tr>        
        <tr>
          <td width="200">Status</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.Status}</td>
        </tr>
        <tr>
          <td width="200">Tanggal Masuk Kerja</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.MasukHari}/{props.getUserDetail.MasukBulan}/{props.getUserDetail.MasukTahun}</td>
        </tr>
        <tr>
          <td width="200">Tanggal Awal Kontrak</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.KontrakHari}/{props.getUserDetail.KontrakBulan}/{props.getUserDetail.KontrakTahun}</td>
        </tr>
        <tr>
          <td width="200">Tanggal Mulai Cuti</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.CutiHari}/{props.getUserDetail.CutiBulan}/{props.getUserDetail.CutiTahun}</td>
        </tr>
        <tr>
          <td width="200">Tampilkan Lembur</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.TampilkanTerlambat}</td>
        </tr>
        <tr>
          <td width="200">Tampilkan Terlambat</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.TampilkanTerlambat}</td>
        </tr>
        <tr>
          <td width="200">Tanggal Keluar</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.KeluarHari}/{props.getUserDetail.KeluarBulan}/{props.getUserDetail.KeluarTahun}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailUserComponent);

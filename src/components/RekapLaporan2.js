import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanRekap: state.Laporan.getLaporanRekap,
  };
};

const RekapLaporan = (props) => {
    let data = props.data
    console.log(data)
  return (
    <Table borderless size="sm">
      <tbody style={{fontSize: '14px' , fontWeight: "bold" , lineHeight : "70%" , fontFamily : "Arial"}}>
        <tr >
          <td width="120">Periode</td>
          <td width="10">:</td>
          <td>{data.footer.Periode}</td>
        </tr>
        <tr>
          <td width="120">Nama</td>
          <td width="10">:</td>
          <td>{data.header.Nama}</td>
        </tr> 
        <tr>
          <td width="120">Posisi / Jabatan</td>
          <td width="10">:</td>
          <td>{data.header.Posisi}</td>
        </tr>
        
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLaporan);

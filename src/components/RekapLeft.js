import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
    return {
      getLaporanRekap: state.Laporan.getLaporanRekap,
      errorLaporanRekap: state.Laporan.errorLaporanRekap,
    };
};

  
const RekapLeft = (props) => {
  return (
    <Table borderless size="sm">
      <tbody style={{fontSize: '14px' , fontWeight: "bold", fontFamily : "Arial"}}>
        <tr style={{ lineHeight : '9px' }} >
          <td >Ijin Terlambat</td>
          <td >:</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.IjinTerlambat}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td >Jumlah Sakit Bulan ini</td>
          <td >:</td>
          <td >{props.getLaporanRekap.JumlahSakit}</td>
          <td ></td>
          <td >Jumlah Lembur</td>
          <td >:</td>
          <td >{props.getLaporanRekap.JumlahLembur}</td>
        </tr> 
        <tr style={{ lineHeight : '9px' }}>
          <td >Jumlah Terlambat</td>
          <td >:</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td >=</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.RpPotonganTerlambat}</td>
          <td ></td>
          <td >Jumlah Cuti Bulan ini</td>
          <td >:</td>
          <td >{props.getLaporanRekap.JumlahCuti}</td>
          <td ></td>
          <td >Total Lembur</td>
          <td >:</td>
          <td style={{color: '#017580'}}>{props.getLaporanRekap.TotalJamLembur}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td >Ijin Tidak Masuk</td>
          <td >:</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.JumlahIzinTidakMasuk}</td>
          <td >=</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.RpPotonganTidakMasuk}</td>
          <td ></td>
          <td >Ijin Tidak Masuk</td>
          <td >:</td>
          <td >{props.getLaporanRekap.JumlahIzinTidakMasuk}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td style={{color: 'red'}}></td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td >Trlmbt Kmbl Istrht</td>
          <td >:</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.TerlambatKembali}</td>
          <td >=</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.RpPotKembaliIstirahat}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td >---+</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td style={{color: 'red'}}></td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td >--------+</td>
          <td ></td>
          <td >Total Tidak Masuk</td>
          <td >:</td>
          <td >{props.getLaporanRekap.TotalTidakMasuk}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td style={{color: 'red'}}></td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td >Total Potongan</td>
          <td ></td>
          <td ></td>
          <td >=</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.TotalPotongan}</td>
          <td ></td>
          <td >Total Cuti Thn ini</td>
          <td >:</td>
          <td >{props.getLaporanRekap.TotalCutiThnIni}</td>
          <td ></td>
          <td >OFF</td>
          <td >:</td>
          <td >{props.getLaporanRekap.JumlahOFF}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td >Sisa Cuti</td>
          <td >:</td>
          <td >{props.getLaporanRekap.SisaCuti}</td>
          <td ></td>
          <td >Jumlah Masuk Kantor</td>
          <td >:</td>
          <td >{props.getLaporanRekap.JmlMasukKantor}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '14px' , fontWeight: "bold", fontFamily : "TimesNewRoman" , fontStyle : "italic"}} >{props.getLaporanRekap.TglPrint}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td >Cuti Khusus Bulan Ini</td>
          <td >:</td>
          <td style={{color: 'red'}}>{props.getLaporanRekap.JumlahCutiKhusus}</td>
          <td ></td>
          <td >Jumlah Dinas Luar</td>
          <td >:</td>
          <td >{props.getLaporanRekap.JumlahDinasLuar}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLeft);

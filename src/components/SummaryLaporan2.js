import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

// const mapStateToProps = (state) => {
//     return {
//       getLaporanRekap: state.Laporan.getLaporanRekap,
//       errorLaporanRekap: state.Laporan.errorLaporanRekap,
//     };
// };

  
const SummaryLaporan2 = (props) => {
  let ambil = JSON.parse(localStorage.getItem('user'));
  let nama = ambil.Username
  let data = props.data
  console.log(data)
  return (
    <Table borderless size="sm">
      <tbody style={{fontSize: '14px' , fontWeight: "bold", fontFamily : "Arial"}}>
        <tr style={{ lineHeight : '9px' }} >
          <td style={{ width : '150px' }}>Ijin Terlambat</td>
          <td >:</td>
          <td style={{color: 'red'}}>{data.IjinTerlambat}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td style={{ width : '170px' }}>Jumlah Sakit Bulan ini</td>
          <td >:</td>
          <td >{data.JumlahSakit}</td>
          <td ></td>
          <td style={{ width : '170px' }}>Jumlah Lembur</td>
          <td >:</td>
          <td style={{ width : '200px' }}>{data.JumlahLembur}</td>
        </tr> 
        <tr style={{ lineHeight : '9px' }}>
          <td >Jumlah Terlambat</td>
          <td >:</td>
          <td style={{color: 'red'}}>{data.JumTerlambat}</td>
          <td >=</td>
          <td style={{color: 'red'}}>{data.RpPotonganTerlambat}</td>
          <td ></td>
          <td >Jumlah Cuti Bulan ini</td>
          <td >:</td>
          <td >{data.JumlahCuti}</td>
          <td ></td>
          <td >Total Lembur</td>
          <td >:</td>
          <td style={{color: '#017580'}}>{data.TotalJamLembur}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td >Ijin Tidak Masuk</td>
          <td >:</td>
          <td style={{color: 'red'}}>{data.JumlahIzinTidakMasuk}</td>
          <td >=</td>
          <td style={{color: 'red'}}>{data.RpPotonganTidakMasuk}</td>
          <td ></td>
          <td >Ijin Tidak Masuk</td>
          <td >:</td>
          <td >{data.JumlahIzinTidakMasuk}</td>
          <td ></td>
          <td ></td>
          <td ></td>
          <td style={{color: 'red'}}></td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td >Trlmbt Kmbl Istrht</td>
          <td >:</td>
          <td style={{color: 'red'}}>{data.TerlambatKembali}</td>
          <td >=</td>
          <td style={{color: 'red'}}>{data.RpPotKembaliIstirahat}</td>
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
          <td >-----------+</td>
          <td ></td>
          <td >Total Tidak Masuk</td>
          <td >:</td>
          <td >{data.TotalTidakMasuk}</td>
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
          <td style={{color: 'red'}}>{data.TotalPotongan}</td>
          <td ></td>
          <td >Total Cuti Thn ini</td>
          <td >:</td>
          <td >{data.TotalCutiThnIni}</td>
          <td ></td>
          <td >OFF</td>
          <td >:</td>
          <td >{data.JumlahOFF}</td>
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
          <td >{data.SisaCuti}</td>
          <td ></td>
          <td >Jumlah Masuk Kantor</td>
          <td >:</td>
          <td >{data.JmlMasukKantor}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td colspan='3' style={{fontSize: '14px' , fontWeight: "bold", fontFamily : "TimesNewRoman" , fontStyle : "italic"}} >{data.TglPrint}{nama}</td>
           <td></td>
           <td></td>
           <td></td>
          <td >Cuti Khusus Bulan Ini</td>
          <td >:</td>
          <td style={{color: 'red'}}>{data.JumlahCutiKhusus}</td>
          <td ></td>
          <td >Jumlah Dinas Luar</td>
          <td >:</td>
          <td >{data.JumlahDinasLuar}</td>
        </tr>
        <tr>
          <td colspan="6"></td>
          <td >Acc Lupa Absen(Sejak Awal Kerja)</td>
          <td >:</td>
          <td style={{color: 'red'}}>{data.AccLupaAbsen}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryLaporan2

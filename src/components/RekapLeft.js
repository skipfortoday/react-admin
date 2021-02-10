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
      <tbody>
        <tr style={{ lineHeight : '9px' }} >
          <td style={{fontSize: '12px'}}>Ijin Terlambat</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{color: 'red', fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Jumlah Sakit Bulan ini</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Jumlah Lembur</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
        </tr> 
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '12px'}}>Jumlah Terlambat</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}>=</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.RpPotonganTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Jumlah Cuti Bulan ini</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Total Lembur</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{color: '#017580',fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '12px'}}>Ijin Tidak Masuk</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}>=</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.RpPotonganTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Ijin Tidak Masuk</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{color: 'red',fontSize: '12px'}}></td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '12px'}}>Trlmbt Kmbl Istrht</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}>=</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.RpPotonganTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>--+</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{color: 'red',fontSize: '12px'}}></td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>--------+</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Total Tidak Masuk</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{color: 'red',fontSize: '12px'}}></td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '12px'}}>Total Potongan</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>=</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Total Cuti Thn ini</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>OFF</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Sisa Cuti</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Jumlah Masuk Kantor</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
        </tr>
        <tr style={{ lineHeight : '9px' }}>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Cuti Khusus Bulan Ini</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{color: 'red',fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
          <td style={{fontSize: '12px'}}></td>
          <td style={{fontSize: '12px'}}>Jumlah Dinas Luar</td>
          <td style={{fontSize: '12px'}}>:</td>
          <td style={{fontSize: '12px'}}>{props.getLaporanRekap.JumTerlambat}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(RekapLeft);

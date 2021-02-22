import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getLaporanHead: state.Laporan.getLaporanHead,
    errorLaporanHead: state.Laporan.errorLaporanHead,
  };
};

const NamaCabangLaporan = (props) => {
  return (

      
    
    <Table borderless size="sm">
    
      <tbody
        style={{ fontSize: "14px", fontWeight: "bold", lineHeight: "70%" , fontFamily : "Arial" }}
      >
        <tr >
        <td style={{ width:"50px" }}>
        <img src="/logo-lviors-hitam.png" alt="Lviors"/>
        </td>
        <td>
         <tr>
         <td>
          {props.getLaporanHead.NamaHead}
        </td>
          </tr> 
        <tr>
          <td>{props.getLaporanHead.Alamat}</td>
        </tr>
        <tr>
          <td>{props.getLaporanHead.NoTelp}</td>
        </tr> 
        
        </td>
        </tr>
        <tr>
          <td colspan="10"  style={{ width:"100px" }}><div style={{ textAlign: "center" ,textDecoration:"underline" }}> Absensi Per Karyawan</div></td>
        </tr>
       
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(NamaCabangLaporan);

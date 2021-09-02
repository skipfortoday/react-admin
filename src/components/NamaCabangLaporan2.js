import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const NamaCabangLaporan2 = (props) => {
    let data = props.data
    return (
      <div style={{display:"block", width:"100%"}}>
        <Table borderless size="sm" style={{width:"100%"}}>
          <tbody
            style={{ fontSize: "14px", fontWeight: "bold", lineHeight: "70%" , fontFamily : "Arial" }}
          >
            <tr >
            <td style={{width:"55px"}}>
            <img style={{width:"100%"}} src="/logo-lviors-hitam.png" alt="Lviors"/>
            </td>
            <td>
            <tr>
            <td>
              {data.header.NamaHead}
            </td>
              </tr> 
            <tr>
              <td>{data.header.Alamat}</td>
            </tr>
            <tr>
              <td>{data.header.NoTelp}</td>
            </tr> 
            
            </td>
            </tr>
            <tr>
              <td colspan="10"  style={{ width:"100px" }}><div style={{ textAlign: "center" ,textDecoration:"underline" }}> Absensi Per Karyawan</div></td>
            </tr>
          
          </tbody>
        </Table>

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

      </div>
  );
};

export default NamaCabangLaporan2
// export default connect(mapStateToProps, null)(NamaCabangLaporan2);

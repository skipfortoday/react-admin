import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Spinner, Modal } from "reactstrap";
import './print.css';

export default function PrintContainer() {
    const allLaporan = useSelector(state => state.Laporan.laporanBanyak)
   
    return (
        <div className="div-table-print">
            {
                allLaporan ? (
                    allLaporan.map((item) => {
                    let arrobj = item.data.body
                    let expands = item.expandKey
                    var rowsLaporan = [];
                    for(var data in arrobj){
                        rowsLaporan.push(arrobj[data])
                    };
                    let footer = item.data.footer
                    let ambil = JSON.parse(localStorage.getItem('user'));
                    let nama = ambil.Username
                    return(
                        <div className="container-table-print">
                            
                            {
                                <table style={{width:"100%"}} className="table-print">
                                <thead>
                                    <tr>
                                    <td colspan="12">
                                        <img style={{width:"60px", display:"inline-block"}} src="/logo-lviors-hitam.png" alt="Lviors"/>
                                        <div style={{fontSize:"14px", fontWeight:"bold", display:"inline-block", verticalAlign:"top", marginLeft:"10px"}} colSpan="2">
                                        <div style={{marginBottom:"-5px"}}>{item.data.header.NamaHead}</div>
                                        <div style={{marginBottom:"-5px"}}>{item.data.header.Alamat}</div>
                                        <div style={{marginBottom:"-5px"}}>{item.data.header.NoTelp}</div>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td colSpan="12">
                                        <div style={{ textAlign: "center" ,textDecoration:"underline", fontWeight:"bold" }}> Absensi Per Karyawan</div>
                                    </td>
                                    </tr>
                                    <tr style={{fontSize:"14px", fontWeight:"bolder"}}>
                                    <td colSpan="12">
                                        <div style={{marginBottom:"-5px"}}>
                                        <div style={{display:"inline-block", width:"120px"}}>Periode</div>
                                        <div style={{display:"inline-block", width:"20px"}}>:</div>
                                        <div style={{display:"inline-block"}}>{footer.Periode}</div>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr style={{fontSize:"14px", fontWeight:"bolder"}}>
                                    <td colSpan="12">
                                    <div style={{marginBottom:"-5px"}}>
                                        <div style={{display:"inline-block", width:"120px"}}>Nama</div>
                                        <div style={{display:"inline-block", width:"20px"}}>:</div>
                                        <div style={{display:"inline-block"}}>{item.data.header.Nama}</div>
                                        </div>
                                    </td>
                                    </tr> 
                                    
                                    <tr style={{fontSize:"14px", fontWeight:"bolder"}}>
                                    <td colSpan="12" style={{padding:'0px !important'}}>
                                        <div style={{marginBottom:"0px"}}>
                                        <div style={{display:"inline-block", width:"120px"}}>Posisi / Jabatan</div>
                                        <div style={{display:"inline-block", width:"20px"}}>:</div>
                                        <div style={{display:"inline-block"}}>{item.data.header.Posisi}</div>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <th colspan="12" style={{height:"30px", borderTop:"2px solid #333", marginTop:"5px"}}></th>
                                    </tr>
                                    <tr className="tr-head" style={{fontSize:"12px"}}>
                                    <th>Tanggal</th>
                                    <th>Datang</th>
                                    <th>Pulang</th>
                                    <th>Tlmbt</th>
                                    <th>Lmbur</th>
                                    <th>Shift</th>
                                    <th>Break</th>
                                    <th>Kmbl</th>
                                    <th>Tlmbt</th>
                                    <th>Status</th>
                                    <th>Keterangan</th>
                                    <th>Ket.Pulang</th>
                                    </tr>
                                </thead>
                                {/* <tbody> */}
                                    {
                                    rowsLaporan.map((row)=>{
                                        let trrow = "tr-row";
                                        if(row.w == 0) trrow += ' tr-row-red'
                                        let colorRed = row.Terlambat != null ? "#f00" : "#333"
                                        
                                        return(
                                        <tbody>
                                            <tr className={trrow}>
                                            <td style={{textAlign:"right", width:"145px"}}>{row.Tanggal}</td>
                                            <td style={{textAlign:"center", width:"60px", fontWeight:"bold", color:colorRed}}>{row.ScanMasuk}</td>
                                            <td style={{textAlign:"center", width:"60px", fontWeight:"bold"}}>{row.ScanPulang}</td>
                                            <td style={{textAlign:"center", width:"60px", fontWeight:"bold", color:"#f00"}}>{row.Terlambat}</td>
                                            <td style={{textAlign:"center", width:"60px", fontWeight:"bold", color:"teal"}}>{row.Lembur}</td>
                                            <td style={{textAlign:"center", width:"50px"}}>{row.Shift}</td>
                                            <td style={{textAlign:"center", width:"60px"}}>{row.IstirahatKeluar}</td>
                                            <td style={{textAlign:"center", width:"60px"}}>{row.IstirahatKembali}</td>
                                            <td style={{textAlign:"center", width:"60px"}}>{row.TerlambatIstirahat}</td>
                                            <td style={{textAlign:"center", width:"160px"}}>{row.Status}</td>
                                            <td style={{textAlign:"center", width:"215px"}}>{row.Keterangan}</td>
                                            <td style={{textAlign:"center", width:"140px"}}>{row.KetPulang}</td>
                                            </tr>
                                            {
                                            row.detail.length > 0 ? (
                                                <tr className="tr-row tr-row-detail">
                                                <td colspan="12">
                                                    {row.detail.map((dt)=>{
                                                    return(
                                                        <div className="tf-row">
                                                        <div className="tf-row-col" style={{width:"130px"}}>Keluar Kantor</div>
                                                        <div className="tf-row-col" style={{width:"150px"}}>{dt.KelKan}</div>
                                                        <div className="tf-row-col" style={{width:"150px"}}>{dt.Durasi}</div>
                                                        <div className="tf-row-col" style={{width:"200px"}}>{dt.Ket}</div>
                                                        <div className="tf-row-col" style={{width:"200px"}}>{dt.KetKembali}</div>
                                                        </div>
                                                    )  
                                                    })}
                                                </td>
                                                </tr>
                                            ) : ""
                                            }
                                        </tbody>
                                        )
                                    })
                                    }
                                {/* </tbody> */}
                                
                                <tbody className="tfoot-print">
                                    
                                    <tr>
                                    <td colspan="12">
                                        <div style={{height:"10px"}}></div>
                                        {/* <div style={{borderTop:"2px solid #333", marginTop:"4px"}}></div> */}
                                    </td>
                                    </tr>
                                    <tr>
                                    <td colspan="12" className="tf-td">
                                        <div className="tf-col" style={{width:"270px"}}>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"130px"}}>Ijin Terlambat</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col">{footer.IjinTerlambat}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"130px"}}>Jumlah Terlambat</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"30px", color:"#f00"}}>{footer.JumTerlambat}</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>=</div>
                                            <div className="tf-row-col" style={{width:"60px", textAlign:"right", color:"#f00"}}>{footer.RpPotonganTerlambat}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"130px"}}>Ijin Tidak Masuk</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"30px", color:"#f00"}}>{footer.JumlahIzinTidakMasuk}</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>=</div>
                                            <div className="tf-row-col" style={{width:"60px",textAlign:"right", color:"#f00"}}>{footer.RpPotonganTidakMasuk}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"130px"}}>Trlmbt Kmbl Istrht</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"30px", color:"#f00"}}>{footer.TerlambatKembali}</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>=</div>
                                            <div className="tf-row-col" style={{width:"60px", textAlign:"right", color:"#f00"}}>{footer.RpPotKembaliIstirahat}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"130px"}}></div>
                                            <div className="tf-row-col" style={{width:"20px"}}>&nbsp;</div>
                                            <div className="tf-row-col" style={{width:"30px", color:"#f00"}}></div>
                                            <div className="tf-row-col" style={{width:"20px"}}>&nbsp;&nbsp;</div>
                                            <div className="tf-row-col" style={{width:"60px", textAlign:"right"}}>---------</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"130px"}}>Total Potongan</div>
                                            <div className="tf-row-col" style={{width:"20px"}}></div>
                                            <div className="tf-row-col" style={{width:"30px", color:"#f00"}}></div>
                                            <div className="tf-row-col" style={{width:"20px"}}>=</div>
                                            <div className="tf-row-col" style={{width:"60px", textAlign:"right", color:"#f00"}}>{footer.TotalPotongan}</div>
                                        </div>
                                        </div>
                                        <div className="tf-col" style={{width:"250px"}}>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>Jml Sakit Bulan Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>{footer.JumlahSakit}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>Jml Cuti Bulan Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>{footer.JumlahCuti}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>Ijin Tidak Masuk</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>{footer.JumlahIzinTidakMasuk}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}></div>
                                            <div className="tf-row-col" style={{width:"20px"}}></div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>-------</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>Total Tidak Masuk</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>{footer.TotalTidakMasuk}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>Total Cuti Tahun Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>{footer.TotalCutiThnIni}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>Sisa Cuti</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>{footer.SisaCuti}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>Cuti Khusus Bulan Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right", color:"#f00"}}>{footer.JumlahCutiKhusus}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"160px"}}>ACC Lupa Absen (Dari Awal Kerja)</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right", color:"#f00"}}>{footer.AccLupaAbsen}</div>
                                        </div>
                                        </div>
                                        <div className="tf-col" style={{width:"300px"}}>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Jml Lembur</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"right"}}>{footer.JumlahLembur}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Total Lembur</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"right"}}>{footer.TotalJamLembur}</div>
                                        </div>
                                        <div className="tf-row" style={{marginTop:"50px"}}>
                                            <div className="tf-row-col" style={{width:"140px"}}>OFF</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"right"}}>{footer.JumlahOFF}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Jml Masuk Kantor</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"right"}}>{footer.JmlMasukKantor}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Jml Dinas Luar</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"right"}}>{footer.JumlahDinasLuar}</div>
                                        </div>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td colspan="10" style={{fontSize:"12px", fontStyle:"italic"}}>{footer.TglPrint} {nama}</td>
                                    {/* <td colspan="2" style={{textAlign:"right", fontSize:"12px", fontStyle:"italic"}}>Halaman 1</td> */}
                                    </tr>
                                    
                                </tbody>
                                </table>
                            }
                            {/* <LaporanDetailBanyak data={item} /> */}
                            {/* summary absensi */}
                            {/* <SummaryLaporan2 data={item.data.footer} style={{pageBreakInside:"avoid"}}  /> */}
                            {/* <div style="page-break-after:always"></div> */}
                            <div className="page-break"></div>
                        </div>
                    )      
                    })
                ) : (
                    ""
                )
            }
        </div>
    )

    
}

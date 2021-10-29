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
                    let nama = ambil ? ambil.Username : ''
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
                                    <th colspan="12" style={{height:"10px", borderTop:"2px solid #333", marginTop:"5px"}}></th>
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
                                <tbody>
                                    {
                                    rowsLaporan.map((row)=>{
                                        let trrow = "tr-row";
                                        if(row.w == 0) trrow += ' tr-row-red'
                                        let colorRed = row.Terlambat != null ? "#f00" : "#333"
                                        
                                        return(
                                            <>
                                                <tr className={trrow}>
                                                    <td style={{textAlign:"right", width:"145px"}}>{row.Tanggal}</td>
                                                    <td style={{textAlign:"center", whiteSpace:"nowrap", fontWeight:"bold", color:colorRed}}>{row.ScanMasuk}</td>
                                                    <td style={{textAlign:"center", whiteSpace:"nowrap", fontWeight:"bold"}}>{row.ScanPulang}</td>
                                                    <td style={{textAlign:"center", width:"60px", fontWeight:"bold", color:"#f00"}}>{row.Terlambat}</td>
                                                    <td style={{textAlign:"center", width:"60px", fontWeight:"bold", color:"teal"}}>{row.Lembur}</td>
                                                    <td style={{textAlign:"center", width:"50px"}}>{row.Shift}</td>
                                                    <td style={{textAlign:"center", width:"60px"}}>{row.IstirahatKeluar}</td>
                                                    <td style={{textAlign:"center", width:"60px"}}>{row.IstirahatKembali}</td>
                                                    <td style={{textAlign:"center", width:"60px"}}>{row.TerlambatIstirahat}</td>
                                                    <td style={{textAlign:"center", width:"160px"}}>{row.CaraMasuk === 'HPWFH' ? 'WFH' : row.Status}</td>
                                                    <td style={{textAlign:"center", width:"215px"}}>{row.Keterangan}</td>
                                                    <td style={{textAlign:"center", width:"140px"}}>{row.KetPulang}</td>
                                                </tr>
                                                {
                                                    row.detail.length == 0 ? "" :
                                                    row.detail.map((dt)=>{
                                                        return (
                                                            <tr className="tr-row tr-row-detail tr-keluar" style={{color:"#333"}}>
                                                                <td style={{textAlign:"right", width:"145px", fontWeight:"bold"}}>Keluar Kantor</td>
                                                                <td style={{textAlign:"center", whiteSpace:"nowrap", fontWeight:"bold"}} colspan="2">{dt.KelKan}</td>
                                                                <td style={{textAlign:"left", whiteSpace:"nowrap", fontWeight:"bold"}} colspan="2">{dt.Durasi}</td>
                                                                <td style={{textAlign:"left", whiteSpace:"nowrap"}} colspan="5"><b>Ket :</b>{dt.Ket.replace("Ket. :","")}</td>
                                                                <td style={{textAlign:"left", whiteSpace:"nowrap"}} colspan="2"><b>Ket. Kembali :</b> {dt.KetKembali.replace("Ket. Kembali :","")}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    })
                                    }
                                </tbody>
                                
                                <tbody className="tfoot-print">
                                    
                                    
                                    <tr>
                                    <td colspan="12" className="tf-td">
                                        <div className="tf-col" style={{width:"270px"}}>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"135px"}}>Ijin Terlambat</div>
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
                                        <div className="tf-row" style={{ marginTop:"20px"}}>
                                            <div className="tf-row-col" style={{width:"130px", fontSize:"12px", fontStyle:"italic"}}>{footer.TglPrint} {nama}</div>
                                        </div>
                                        
                                        </div>
                                        <div className="tf-col" style={{width:"250px"}}>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}>Jml Sakit Bulan Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left"}}>{footer.JumlahSakit}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}>Jml Cuti Bulan Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left"}}>{footer.JumlahCuti}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}>Ijin Tidak Masuk</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left"}}>{footer.JumlahIzinTidakMasuk}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}></div>
                                            <div className="tf-row-col" style={{width:"20px"}}><span style={{borderBottom:"1px solid #000", display:"block", width:"50px", height:"20px", marginRight:"-20px"}}></span></div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"right"}}>+</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}>Total Tidak Masuk</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left"}}>{footer.TotalTidakMasuk}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}>Total Cuti Tahun Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left"}}>{footer.TotalCutiThnIni}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}>Sisa Cuti</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left"}}>{footer.SisaCuti}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px"}}>Cuti Khusus Bulan Ini</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left", color:"#f00"}}>{footer.JumlahCutiKhusus}</div>
                                        </div>
                                        
                                        </div>
                                        <div className="tf-col" style={{width:"300px"}}>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Jml Lembur</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"left"}}>{footer.JumlahLembur}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Total Lembur</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"left"}}>{footer.TotalJamLembur}</div>
                                        </div>
                                        <div className="tf-row" style={{marginTop:"00px"}}>
                                            <div className="tf-row-col" style={{width:"140px"}}>OFF</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"left"}}>{footer.JumlahOFF}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Jml Masuk Kantor</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"left"}}>{footer.JmlMasukKantor}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"140px"}}>Jml Dinas Luar</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{textAlign:"left"}}>{footer.JumlahDinasLuar}</div>
                                        </div>
                                        <div className="tf-row">
                                            <div className="tf-row-col" style={{width:"300px", whiteSpace:"nowrap"}}>ACC Lupa Absen (Dari Awal Kerja)</div>
                                            <div className="tf-row-col" style={{width:"20px"}}>:</div>
                                            <div className="tf-row-col" style={{width:"40px", textAlign:"left", color:"#f00"}}>{footer.AccLupaAbsen}</div>
                                        </div>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    
                                    {/* <td colspan="2" style={{textAlign:"right", fontSize:"12px", fontStyle:"italic"}}>Halaman 1</td> */}
                                    </tr>
                                    
                                </tbody>
                                </table>
                            }
                           
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

//Post Untuk input prosesi absensi dari APP
app.post("/api/attlogUpdate", (req, res) => {
    let post = {
        Pass: req.body.Pass,
        UserID: req.body.UserID,
    };
    let query = "Select * FROM ?? WHERE ??=? AND ??=?";
    let table = ["user", "Pass", post.Pass, "UserID", post.UserID];

    query = mysql.format(query, table);
    conn.query(query, function (error, rows) {
        let grup = rows[0].GroupID;
        let kodecabang = rows[0].KodeCabang;
        console.log(grup);
        console.log(kodecabang);
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                res.json({
                    Error: true,
                    Message: "OK",
                    GroupID: grup,
                    KodeCabang: kodecabang,
                });
            } else {
                res.json({
                    Error: true,
                    Message: "UserID atau Pass salah!",
                });
            }
        }
    });
});


////////////////////////////////////////////////////////////////////////////////////////////
// Api untuk proses login di APP
app.post("/api/loginLengkap", (req, res) => {
    let post = {
        Pass: req.body.Pass,
        UserID: req.body.UserID,
    };
    let query = "Select * FROM ?? WHERE ??=? AND ??=?";
    let table = ["user", "Pass", post.Pass, "UserID", post.UserID];
    query = mysql.format(query, table);
    let grup;
    let kodecabang;
    conn.query(query, function (error, rows) {
        grup = rows[0].GroupID;
        kodecabang = rows[0].KodeCabang;
        console.log(grup);
        console.log(kodecabang);
        if (error) {
            console.log("error karena -->" + error);
        } else {
            if (rows.length == 1) {
                console.log("INI masuk " + error);
                //res.json({ Error: true, Message: "OK rubah", GroupID: grup, KodeCabang:kodecabang });
            } else {
                console.log("INI keluar " + error);
                //res.json({ Error: true, Message: "UserID atau Pass salah!" });
            }
        }
    });
    console.log("Model console 2");
    let post2 = {
        grup2: grup,
        kodecabang2: kodecabang,
    };
    console.log("Model console 2b");
    let query2 = "Select * FROM ?? WHERE ??=? ";
    let table2 = ["tblgrupjabatan", "GroupID", post2.grup];

    console.log("Model console 2c");

    query2 = mysql.format(query2, table2);
    console.log("Model console 2d");
    conn2.query(query2, function (error2, rows2) {
        let jamdatang = rows2[0].JamDatang;
        let maxjamdatang = rows2[0].MaxJamDatang;
        console.log("Model console 2e");
        console.log(jamdatang);
        console.log(maxjamdatang);
        if (error2) {
            console.log(error2);
        } else {
            if (rows2.length == 1) {
                res.json({
                    Error: true,
                    Message: "OK rubah",
                    GroupID: grup,
                    MaxJamDatang: maxjamdatang,
                });
            } else {
                res.json({
                    Error: true,
                    Message: "UserID atau Pass salah!",
                });
            }
        }
    });
    console.log("Model console 2f");
});


//
app.post("/api/loginsu", (req, res) => {
    let data = {
        AdminID: req.body.AdminID,
        Password: req.body.Password,
    };
    let sql = "INSERT INTO admin SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.json({ Message: "OK" });;
    });
});



//Mengedit data user untuk panel admin
app.put("/api/usertest/:id", (req, res) => {
    let data = {
        Nama: req.body.Nama,
        UserID: req.body.UserID,
        Pass: md5(req.body.Pass),
        TglAwalKontrakPertama: req.body.TglAwalKontrakPertama,
        TglMulaiCuti: req.body.TglMulaiCuti,

    };

    let sql =
        `CALL EditUser (
        '` + req.params.id + `',
        '` + data.Pass + `',
        '` + req.body.Nama + `',
        '` + req.body.Alamat + `',
        '` + req.body.TglLahir + `',
        '` + req.body.HP + `',
        '` + req.body.TglMasuk + `',
        '` + req.body.TglMulaiCuti + `',
        '` + req.body.TglAwalKontrakPertama + `',
        '` + req.body.GroupID + `',
        '` + req.body.KodeCabang + `',
        '` + req.body.Status + `',
        '` + req.body.TampilkanLembur + `',
        '` + req.body.RoleID + `',
        '` + req.body.Posisi + `',
        '` + req.body.TampilkanTerlambat + `'
      )`;


    ///// Tnpa Tanggal Awal Kontrak Dan Tanpa Tanggal  Awla Cuti
    let sql2 =
        `CALL EditUserTKC (
        '` + req.params.id + `',
        '` + data.Pass + `',
        '` + req.body.Nama + `',
        '` + req.body.Alamat + `',
        '` + req.body.TglLahir + `',
        '` + req.body.HP + `',
        '` + req.body.TglMasuk + `',
        '` + req.body.GroupID + `',
        '` + req.body.KodeCabang + `',
        '` + req.body.Status + `',
        '` + req.body.TampilkanLembur + `',
        '` + req.body.RoleID + `',
        '` + req.body.Posisi + `',
        '` + req.body.TampilkanTerlambat + `'
    )`;


    /// Tanpa Tanggal Awal Kontrak Pertama
    let sql3 =
        `CALL EditUserT (
        '` + req.params.id + `',
        '` + data.Pass + `',
        '` + req.body.Nama + `',
        '` + req.body.Alamat + `',
        '` + req.body.TglLahir + `',
        '` + req.body.HP + `',
        '` + req.body.TglMasuk + `',
        '` + req.body.TglMulaiCuti + `',
        '` + req.body.GroupID + `',
        '` + req.body.KodeCabang + `',
        '` + req.body.Status + `',
        '` + req.body.TampilkanLembur + `',
        '` + req.body.RoleID + `',
        '` + req.body.Posisi + `',
        '` + req.body.TampilkanTerlambat + `'
    )`;


    // Tanpa Tanggal Mulai Cuti
    let sql4 =
        `CALL EditUserC (
        '` + req.params.id + `',
        '` + data.Pass + `',
        '` + req.body.Nama + `',
        '` + req.body.Alamat + `',
        '` + req.body.TglLahir + `',
        '` + req.body.HP + `',
        '` + req.body.TglMasuk + `',
        '` + req.body.TglAwalKontrakPertama + `',
        '` + req.body.GroupID + `',
        '` + req.body.KodeCabang + `',
        '` + req.body.Status + `',
        '` + req.body.TampilkanLembur + `',
        '` + req.body.RoleID + `',
        '` + req.body.Posisi + `',
        '` + req.body.TampilkanTerlambat + `'
    )`;


    if (data.TglAwalKontrakPertama && data.TglMulaiCuti == undefined) {
        conn.query(sql2, function (error, results) {
            if (error) {
                res.json({
                    Error: true,
                    Message: "Eror Rest Sql2",
                })
            } else {
                res.json({
                    Error: false,
                    Message: "Berhasil yokkk",
                    Data,
                    results,
                })
            }
        });
    }
    else {
        if (data.TglAwalKontrakPertama == undefined) {
            conn.query(sql3, function (error, results) {
                if (error) {
                    res.json({
                        Error: true,
                        Message: "Eror Rest Sql3",
                    })
                } else {
                    res.json({
                        Error: false,
                        Message: "Berhasil yokkk sql 3",
                        Data,
                        results,
                    })
                }
            });
        }
        else {
            if (data.TglMulaiCuti == undefined) {
                conn.query(sql4, function (error, results) {
                    if (error) {
                        res.json({
                            Error: true,
                            Message: "Eror Rest Sql4 ",
                        })
                    } else {
                        res.json({
                            Error: false,
                            Message: "Berhasil yokkk sql 4",
                            Data,
                            results,
                        })
                    }
                });
                {
                    conn.query(sql1, function (error, results) {
                        if (error) {
                            res.json({
                                Error: true,
                                Message: "Eror Rest Sql",
                            })
                        } else {
                            res.json({
                                Error: false,
                                Message: "Berhasil yokkk sql",
                                Data,
                                results,
                            })
                        }
                    });
                };
            };
        };
    };
});

//Menampilkan Detail grup Per ID Pegawai
app.get("/api/usertest/:id", (req, res) => {
    conn.query(
        `SELECT * FROM user Where UserID="` + req.params.id + `"`,
        function (err, rows) {
            if (err) throw err;
            let group = rows[0];
            res.send(group);
        }
    );
});


// Menampilkan Recent Scan Untuk APP Android Berdasarkan Tgl Mulai Dan Tgl Akhir
app.get("/api/apprecentscan/:id&:TglAwal&:TglAkhir", (req, res) => {
    conn.query(
      `CALL AppMenampilkanRecentScan ('` +
      req.params.id +
      `','` +
      req.params.TglAwal +
      `','` +
      req.params.TglAkhir +
      `')`,
      function (err, rows) {
        if (err) throw err;
        let scan = rows[0];
        res.send(scan);
      }
    );
  });


  ////////////////////////////////////////////////////////////////////////////////////////////

////////////////////          API AMBIL SCAN PERHARI                   ////////////////////

///////////////////////////////////////////////////////////////////////////////////////////




//Urut Berdasarkan Nama (bawah)

app.get("/api/listscanperharinama", (req, res) => {
    conn.query(`CALL ListScanPerhariNama `, function (err, rows) {
      if (err) throw err;
      let scan = rows[0];
      res.send(scan);
    });
  });


/////////////////////////////////////////

app.get("/api/applaporan/:id", (req, res) => {
    conn.query(
      `CALL AppMenampilkanScan ('` + req.params.id + `')`,
      function (err, rows) {
        if (err) throw err;
        let scan = rows[0];
        res.send(scan);
      }
    );
  });




  app.get("/api/tlaporan", (req, res) => {
    conn.query(
      `CALL MenampilkanLaporan ('` +
      req.body.Nama +
      `','` +
      req.body.TglAwal +
      `','` +
      req.body.TglAkhir +
      `')`,
      function (err, rows) {
        if (err) throw err;
        let scan = rows[0];
        res.send(scan);
      }
    );
  });



  app.delete("/api/deletescan", (req, res) => {
    let sql = `DELETE FROM attlog ORDER BY DatangID DESC LIMIT 1`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  app.delete("/api/del/:id", (req, res) => {
    let sql = `DELETE FROM attlog WHERE UserID="` + req.params.id + `" AND TanggalScan = CURRENT_DATE()`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  

  //Menampilkan seluruh data cabang yang sudah terdaftar di panel admin
app.get("/api/superadmin", async (req, res, next) => {
    try {
      const user = await getUserFromDb({ id: req.params.id })
      res.json(user);
    } catch (e) {
      //this will eventually be handled by your error handling middleware
      next(e)
    }
  })


  // Upload File

// // menerapkan middleware multer hanya pada rute berikut
// app.post("/api/upload", multer({ storage: diskStorage }).single("photo"),
//   (req, res) => {
//     const file = req.file.path;
//     const filename = req.file.filename;
//     console.log(file);
//     console.log(filename);
//     var sql = "INSERT INTO test (path1) VALUES('" + filename + "')"
//     var sql2 = "SELECT keyf FROM test ORDER BY keyf DESC limit 1"
//     if (!file) {
//       res.status(400).send({
//         status: false,
//         data: "No File is selected.",
//       });
//     } else {
//       conn.query(sql, function (err, results) {
//         if (err) throw err;
//         else {
//           conn.query(sql2, function (err, rows) {
//             keyf = rows[0];
//             if (err) throw err;
//             res.send(keyf);
//           });
//         }
//       });
//       //res.send(file);
//     }
//     // var sql = "INSERT INTO test VALUES('"+req.file.filename+"')";
//     //conn.query(sql, function(err, results){

//     //  })

//   }
// );



// // menerapkan middleware multer hanya pada rute berikut
// app.put("/api/upload", multer({ storage: diskStorage }).single("photo"),
//   (req, res) => {
//     const file = req.file.path;
//     const filename = req.file.filename;
//     var sql = "UPDATE SET test (path2) VALUES('" + filename + "')"
//     if (!file) {
//       res.status(400).send({
//         status: false,
//         data: "No File is selected.",
//       });
//     } else {
//       conn.query(sql, function (err, results) {
//         if (err) throw err;
//         res.send(results);
//       });
//       //res.send(file);
//     }
//     // var sql = "INSERT INTO test VALUES('"+req.file.filename+"')";
//     //conn.query(sql, function(err, results){

//     //  })

//   }
// );


///////////////////////////////////////////////////////
////////           API PENGUMUMAN           //////////
/////////////////////////////////////////////////////


// app.get("/app/pengumuman", (req, res) => {
//   conn.query(`SELECT * FROM news`, function (err, rows) {
//     if (err) throw err;
//     let news = rows;
//     res.send(news);
//   });
// });

// app.get("/api/pengumuman", (req, res) => {
//   let q = `CALL listPengumuman()`
//   conn.query(`SELECT * FROM news`, function (err, rows) {
//     if (err) throw err;
//     let news = rows;
//     res.send(news);
//   });
// });

// app.post("/api/pengumuman", (req, res) => {
//   var Data = {
//       kode = req.body.kode,
//       judul = req.body.judul,
//       isi = req.body.isi,
//       tgl_posting = req.body.tgl_posting,
//       user_posting = req.body.user_posting,
//       StartDate= req.body.StartDate,
//       EndDate= req.body.EndDate,
//       aktif= req.body.aktif,
//       group= req.body.group,
//   };
//   conn.query(`INSERT INTO news(kode,judul,isi,tgl_posting,user_posting,StartDate,EndDate,aktif,group) VALUES (data.kode,data.judul,isi,tgl_posting,user_posting,StartDate,EndDate,aktif,group)`, function (err, rows) {
//     if (err) throw err;
//     let news = rows;
//     res.send(news);
//   });
// });


////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN DATA SCAN         ///////////////////

///////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
/////////////////////          USERR SIDE              /////////////////////
///////////////////////////////////////////////////////////////////////////

//Tampilkan 5 Recent Scan Untuk User per ID
app.get("/api/lastscan/:id", (req, res) => {
    let sql =
      `SELECT DAYNAME(a.TanggalScan)as NamaHari, DAY(a.TanggalScan) as Hari, MONTH(a.TanggalScan)as Bulan, YEAR(a.TanggalScan) as Tahun, b.Nama, a.ScanMasuk, a.ScanPulang, a.Shift FROM attlog a JOIN user b ON a.UserID = b.UserID WHERE a.UserID="` +
      req.params.id +
      `" ORDER BY a.TanggalScan DESC LIMIT 5`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  
  //Tampilkan 5 Recent Scan Untuk User per ID
  app.get("/api/lastscan/:id", (req, res) => {
    let sql =
      `SELECT DAYNAME(a.TanggalScan)as NamaHari, DAY(a.TanggalScan) as Hari, MONTH(a.TanggalScan)as Bulan, YEAR(a.TanggalScan) as Tahun, b.Nama, a.ScanMasuk, a.ScanPulang, a.Shift FROM attlog a JOIN user b ON a.UserID = b.UserID WHERE a.UserID="` +
      req.params.id +
      `" ORDER BY a.TanggalScan DESC LIMIT 5`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  
app.get("/api/xtest", (req, res) => {
    conn.query("SELECT * FROM user WHERE KodeCabang = 'SB1'", (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });


////////////////////////////////////////////////////////////////////////////
/////////////////////          ADMIN SIDE              /////////////////////
///////////////////////////////////////////////////////////////////////////

//Tampilkan 10 Recent Scan Untuk Admin

//Tampilkan 30 Day  Scan Untuk Admins dan User
app.get("/api/attlog/:id", (req, res) => {
    let sql =
      `SELECT DAYNAME(a.TanggalScan)as NamaHari, DAY(a.TanggalScan) as Hari, MONTH(a.TanggalScan)as Bulan, YEAR(a.TanggalScan) as Tahun,a.UserID, b.Nama, a.ScanMasuk, a.ScanPulang, a.Shift, IF(TIMEDIFF(a.ScanMasuk,a.JamMasuk)< '00:00:00','-',TIMEDIFF(a.ScanMasuk,a.JamMasuk)) as Terlambat,IF(TIMEDIFF(a.ScanPulang,a.JamPulang)< '00:30:00','-',TIMEDIFF(a.ScanPulang,a.JamPulang)) as Lembur FROM ATTLOG a JOIN user b ON a.UserID = b.UserID WHERE a.UserID="` +
      req.params.id +
      `" ORDER BY a.TanggalScan ASC LIMIT 31   `;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  
  //Tampilkan Data Scan Berdasarkan ID Karyawan Dan Menentukan Tanggal Mulai Dan Tanggal Akhir
  
  app.get("/api/tlog/:id&:tglin&:tglout", (req, res) => {
    let sql =
      `SELECT DAYNAME(c.Tanggal)as NamaHari, DAY(c.Tanggal) as Hari, MONTH(c.Tanggal)as Bulan, YEAR(c.Tanggal) as Tahun,
    IFNULL((SELECT a.UserID FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as USERID,
    IFNULL((SELECT b.Nama FROM attlog a, user b WHERE c.Tanggal = a.TanggalScan AND a.UserID = b.UserID AND a.UserID="` +
      req.params.id +
      `" ),"TIDAK MASUK") as Nama,
    IFNULL((SELECT a.ScanMasuk FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as ScanMasuk,
    IFNULL((SELECT a.ScanPulang FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as ScanPulang,
    IFNULL((SELECT a.Shift FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as Shift,
    IFNULL((SELECT IF(TIMEDIFF(a.ScanMasuk,a.JamMasuk)< '00:00:00','-',TIMEDIFF(a.ScanMasuk,a.JamMasuk)) FROM attlog a
     WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as Terlambat,
    IFNULL((SELECT IF(TIMEDIFF(a.ScanPulang,a.JamPulang)< '00:30:00','-',TIMEDIFF(a.ScanPulang,a.JamPulang)) FROM attlog a
     WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as Lembur
    FROM tgl c WHERE c.tanggal between "` +
      req.params.tglin +
      `" and "` +
      req.params.tglout +
      `" ORDER BY c.Tanggal ASC LIMIT 31`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });


// Menampilkan Role User Previlage untuk acc izin & lembur
app.get("/api/roleuser", (req, res) => {
    let sql = "SELECT * FROM role";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });

  
  

////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN DATA WAKTU        ////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//Mengambil waktu server dan data jam kerja untuk APP bisa scan

app.get("/api/gettime", (req, res) => {
    let sql = `SELECT Now() as Waktu`;
    let query = conn.query(sql, (err, results) => {
      if (err) res.send(JSON.stringify(err));
      res.send(JSON.stringify(results));
    });
  });
  
  //Mengambil waktu server dan data jam kerja untuk APP bisa scan
  
  app.get("/api/gettime2", (req, res) => {
    let sql = `SELECT DATE_FORMAT(NOW(), "%d %m %Y - %T")as Waktu`;
    let query = conn.query(sql, (err, results) => {
      if (err) res.send(JSON.stringify(err));
      test = results[0]
      res.send(JSON.stringify(test));
    });
  });

  
////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        TRIAL REPPORT API       ////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/reportabsen/:id&:tglin&:tglout", (req, res) => {
    let sql =
      `SELECT DAYNAME(c.Tanggal)as NamaHari, DAY(c.Tanggal) as Hari, MONTH(c.Tanggal)as Bulan, YEAR(c.Tanggal) as Tahun,
    IFNULL((SELECT a.UserID FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as USERID,
    IFNULL((SELECT b.Nama FROM attlog a, user b WHERE c.Tanggal = a.TanggalScan AND a.UserID = b.UserID AND a.UserID="` +
      req.params.id +
      `" ),"TIDAK MASUK") as Nama,
    IFNULL((SELECT a.ScanMasuk FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as ScanMasuk,
    IFNULL((SELECT a.ScanPulang FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as ScanPulang,
    IFNULL((SELECT a.Shift FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as Shift,
  
    IFNULL((SELECT IF(TIMEDIFF(a.ScanMasuk,'08:00:00') < '00:05:00','-','1') FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as JumlahTerlambat,
    IFNULL((SELECT IF(TIMEDIFF(a.ScanMasuk,'08:00:00') < '00:05:00','-',TIMEDIFF(a.ScanMasuk,'08:00:00')) FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as Terlambat,
  
  
    IFNULL((SELECT IF(TIMEDIFF(a.ScanPulang,'16:00:00') < '00:30:00','-',TIMEDIFF(a.ScanPulang,'16:00:00')) FROM attlog a WHERE c.Tanggal = a.TanggalScan AND a.UserID="` +
      req.params.id +
      `" ),"-") as Lembur
    FROM tgl c WHERE c.tanggal between "` +
      req.params.tglin +
      `" and "` +
      req.params.tglout +
      `" ORDER BY c.Tanggal ASC`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });


  

////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        TRIAL VALIDATION API                    ////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//menampilkan detail Laporan  data scan berdasarkan TANGGAL SCAN

app.get("/api/laporan/:id", (req, res) => {
    conn.query(
      `CALL MenampilkanScan('` + req.params.id + `')`,
      function (err, rows) {
        if (err) throw err;
  
        let scan = rows[0];
  
        let strDatangID = ""; // 1,2,3
        let newArray = {};
        scan.map(function (data, key) {
          strDatangID += data.DatangID;
          data["detail"] = [];
          newArray[data.TanggalScan] = data;
          if (key < scan.length - 1) strDatangID += ",";
        });
  
        let sql =
          `SELECT *,  
          IF(JamKembali IS NULL, DATE_FORMAT(JamKeluar, "%H:%i"), CONCAT(DATE_FORMAT(JamKeluar, "%H:%i"),' - ', DATE_FORMAT(JamKembali, "%H:%i"))) AS KelKan, 
          CONCAT('Total = ',IF(JamKembali IS NULL, '', DATE_FORMAT(TIMEDIFF(JamKembali,JamKeluar), "%H:%i"))) AS Durasi , 
          CONCAT('Ket. : ',IFNULL(Keterangan,'')) AS Ket, 
          CONCAT('Ket. Kembali : ',IFNULL(KeteranganKembali,'')) AS KetKembali 
   
          FROM tblkeluarkantor WHERE DatangID IN(` +
          strDatangID +
          `) `;
        let query = conn.query(sql, (err, results) => {
          if (err) throw err;
          results.map(function (data, key) {
            data["k"] = "Keluar Kantor";
            newArray[data.TanggalScan]["detail"].push(data);
          });
          
          res.send(newArray);
        });
      }
    );
  });

  //menampilkan detail Laporan  data scan berdasarkan User ID

app.get("/api/laporan2/:id", (req, res) => {
    conn.query(
      `CALL MenampilkanScan('` + req.params.id + `')`,
      function (err, rows) {
        if (err) throw err;
  
        let scan = rows[0];
  
        let strDatangID = ""; // 1,2,3
        let newArray = {};
        scan.map(function (data, key) {
          strDatangID += data.DatangID;
          data["detail"] = [];
          newArray[data.DatangID] = data;
          if (key < scan.length - 1) strDatangID += ",";
        });
  
        let sql =
          `SELECT *,  
          IF(JamKembali IS NULL, DATE_FORMAT(JamKeluar, "%H:%i"), CONCAT(DATE_FORMAT(JamKeluar, "%H:%i"),' - ', DATE_FORMAT(JamKembali, "%H:%i"))) AS KelKan, 
          CONCAT('Total = ',IF(JamKembali IS NULL, '', DATE_FORMAT(TIMEDIFF(JamKembali,JamKeluar), "%H:%i"))) AS Durasi , 
          CONCAT('Ket. : ',IFNULL(Keterangan,'')) AS Ket, 
          CONCAT('Ket. Kembali : ',IFNULL(KeteranganKembali,'')) AS KetKembali 
   
          FROM tblkeluarkantor WHERE DatangID IN(` +
          strDatangID +
          `) `;
        let query = conn.query(sql, (err, results) => {
          if (err) throw err;
          results.map(function (data, key) {
            data["k"] = "Keluar Kantor";
            newArray[data.DatangID]["detail"].push(data);
          });
          res.send(newArray);
        });
      }
    );
  });

  // //Menampilkan Scan Perhari ini
// // Dengan menampilkan Jam Keluar Kantor Karyawan
// // Key = User ID


// app.get("/api/availkaryawan", (req, res) => {
//   conn.query(
//     `CALL ListScanPerhari`,
//     function (err, rows) {
//       if (err) throw err;

//       let scan = rows[0];

//       let strDatangID = ""; // 1,2,3
//       let newArray = {};
//       scan.map(function (data, key) {
//         strDatangID += data.DatangID;
//         data["detail"] = [];
//         newArray[data.DatangID] = data;
//         if (key < scan.length - 1) strDatangID += ",";
//       });

//       let sql =
//         `SELECT *,  
//         IF(JamKembali IS NULL, DATE_FORMAT(JamKeluar, "%H:%i"), CONCAT(DATE_FORMAT(JamKeluar, "%H:%i"),' - ', DATE_FORMAT(JamKembali, "%H:%i"))) AS KelKan, 
//         CONCAT('Total = ',IF(JamKembali IS NULL, '', DATE_FORMAT(TIMEDIFF(JamKembali,JamKeluar), "%H:%i"))) AS Durasi , 
//         CONCAT('Ket. : ',IFNULL(Keterangan,'')) AS Ket, 
//         CONCAT('Ket. Kembali : ',IFNULL(KeteranganKembali,'')) AS KetKembali 
 
//         FROM tblkeluarkantor WHERE DatangID IN(` +
//         strDatangID +
//         `) `;
//       let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         results.map(function (data, key) {
//           data["k"] = "Keluar Kantor";
//           newArray[data.DatangID]["detail"].push(data);
//         });
//         res.send(newArray);
//       });
//     }
//   );
// });





//////////////////////////////////////////////////////////////////////

// API Temporari Izin

/////////////////////////////////////////////////////////////////////


// Menampilkan Seluruh Request Izin yang Pertama
app.get("/api/reqizin", (req, res) => {
    conn.query(`CALL MenampilkanReqIzin `, function (err, rows) {
      if (err) throw err;
      let izin = rows[0];
      res.send(izin);
    });
  });
  
  // Menampilkan Izin Yang DI Acc Orang 1 
  app.get("/api/reqizinlv1", (req, res) => {
    conn.query(`CALL MReqIzinAccPertama`, function (err, rows) {
      if (err) throw err;
      let izin = rows[0];
      res.send(izin);
    });
  });
  
  
  // Menampilkan Izin yang di acc 
  app.get("/api/accizin", (req, res) => {
    conn.query(`CALL MenampilkanAccIzin`, function (err, rows) {
      if (err) throw err;
      let izin = rows[0];
      res.send(izin);
    });
  });
  
  
  // Proses Request Izin Karyawan 
  //Menambahkan Data Request Izin
  app.post("/api/reqizin", (req, res) => {
    let sql =
      `CALL ProsesReqIzin (
  '` +
      req.body.UserID +
      `',
  '` +
      req.body.Tanggal +
      `',
  '` +
      req.body.Status +
      `',
  '` +
      req.body.Keterangan +
      `'  
  )`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });
  });
  
  
  //Proses Acc User Pertama
  app.put("/api/reqizinlv1/:id", (req, res) => {
    let data = {
      UserID: req.body.UserID,
      yn1: req.body.yn1,
      Alasan: req.body.Alasan,
    };
    let sql =
      `UPDATE cabang SET ACC3="` +
      req.body.UserID +
      `", YN1="` +
      req.body.yn1 +
      `", Alasan="` +
      req.body.Alasan +
      `" WHERE IzinID="` +
      req.params.id +
      `"`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(data));
    });
  });
  
  //Proses Acc User kedua
  app.put("/api/reqizinlv2/:id", (req, res) => {
    let data = {
      UserID: req.body.UserID,
      yn2: req.body.yn2,
      Alasan: req.body.Alasan,
    };
    let sql =
      `UPDATE cabang SET ACC3="` +
      req.body.UserID +
      `", YN2="` +
      req.body.yn2 +
      `", Alasan="` +
      req.body.Alasan +
      `" WHERE IzinID="` +
      req.params.id +
      `"`;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(data));
    });
  });

  async function apiCall(Body) {
    console.log(Body);
    let query = `CALL InputIzinLiburMassal(
      '` + Body.UserID + `',
      '` + Body.TanggalScan + `',
      '` + Body.Status.value + `',
      '` + Body.Keterangan + `')`;
  
    const rows = await asyncQuery(query);
    var resp = JSON.parse(JSON.stringify(rows[0]));
    return resp[0].StatusAction;
  }
  
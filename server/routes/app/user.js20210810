const mysql = require('mysql');
const conn = require('../../config/database.js')
let md5 = require("md5");
const jwt = require('../../middleware/jwt.js');
const util = require('util');
const asyncQuery = util.promisify(conn.query).bind(conn);

exports.updateUser = (req, res) => {
   let data = {
      Username: req.body.Username,
      Pass: req.body.Pass,
   };

   let sql = `
    UPDATE user 
    SET Username = "` + data.Username + `", 
    Pass="` + md5(data.Pass) + `" 
    WHERE UserID = "` + req.params.id + `"`;

   conn.query(sql, (err, results) => {
      if (err) {
         let pesan = err.sqlMessage;
         res.json({ message: pesan });
      } else {
         res.send(JSON.stringify(results));
      }
   });
}

exports.getAllUser = (req, res) => {

   conn.query(
      "SELECT KodeCabang FROM user WHERE UserID = '" + req.user.UserID + "'",
      function (err, rows) {
         if (err) res.send({ "error": "error" })
         const KodeCabang = rows[0].KodeCabang;
         const sql = `CALL MenampilkanUser('` + KodeCabang + `')`;
         conn.query(
            sql,
            function (err, rows) {
               if (err) throw err;
               let user = rows[0];
               res.send(user);
            }
         );
      }
   );
}

exports.getUser = async (req, res) => {
   conn.query(
      `CALL MenampilkanDetailUser('` + req.params.id + `')`,
      function (err, rows) {
         if (err) throw err;
         let user = rows[0];
         let detailuser = user[0];
         detailuser['Groups'] = [];
         let KodeCabang = detailuser.KodeCabang;
         let GroupID = detailuser.GroupID;
         let q = `SELECT g.*, c.NamaCabang FROM tblgrupjabatan g 
            LEFT JOIN cabang c ON c.KodeCabang = g.KodeCabang
            WHERE g.GroupID = '` + GroupID + `' ORDER BY g.KodeCabang = '`+KodeCabang+`' DESC`;


         conn.query(q, async (err, results) => {
            if (results.length > 0) {
               await Promise.all(results.map(async (dtl, kk) => {
                  let qq = `SELECT 
                  t.Shift, t.MaxJamDatang, t.RpPotonganTerlambat
                  FROM tblruleterlambatbertingkat  t
                  WHERE t.KodeCabang = '`+ dtl.KodeCabang + `' AND t.GroupID = '` + GroupID + `'
                  ;`;
                  const PotBertingkat = await asyncQuery(qq);

                  let DetailGroup = {
                     Default: KodeCabang == dtl.KodeCabang ? true : false,
                     Cabang: dtl.KodeCabang +" - "+dtl.NamaCabang,
                     GroupID: dtl.GroupID,
                     Jabatan: dtl.Jabatan,
                     LiburMingguan: dtl.adaOff,
                     HariLibur: dtl.HariLibur,
                     CekJamKembali: dtl.CekJamKembali,
                     TerlambahBertingkat: dtl.RuleTerlambatBertingkat,
                     RpLemburPerJam: dtl.RpLemburPerJam,
                     RpPotonganTerlambat: dtl.RpPotonganTerlambat,
                     RpPotonganTerlambatKembali: dtl.RpPotonganTerlambatKembali,
                     RpPotonganTidakMasuk: dtl.RpPotonganTidakMasuk,
                     Shifts: [
                        {
                           Shift: 1,
                           JamDatang: dtl.JamDatang,
                           JamPulang: dtl.JamPulang,
                           MaxJamDatang: dtl.MaxJamDatang,
                           MinJamLembur: dtl.MinJamLembur,
                           JamIstirahat: dtl.JamMulaiPagi,
                           JamKembaliIstirahat: dtl.MaxJamKembali,
                           PotonganBertingkat: [
                           ]
                        }
                     ]
                  };

                  if (dtl.JamDatangSiang) {
                     DetailGroup.Shifts.push({
                        Shift: 2,
                        JamDatang: dtl.JamDatangSiang,
                        JamPulang: dtl.JamPulangSiang,
                        MaxJamDatang: dtl.MaxJamDatangSiang,
                        MinJamLembur: dtl.MinJamLemburSiang,
                        JamIstirahat: dtl.JamMulaiSiang,
                        JamKembaliIstirahat: dtl.MaxJamKembaliSiang,
                        PotonganBertingkat: [
                        ]
                     })
                  }

                  if (dtl.JamDatangSore) {
                     DetailGroup.Shifts.push({
                        Shift: 3,
                        JamDatang: dtl.JamDatangSore,
                        JamPulang: dtl.JamPulangSore,
                        MaxJamDatang: dtl.MaxJamDatangSore,
                        MinJamLembur: dtl.MinJamLemburSore,
                        JamIstirahat: dtl.JamMulaiSore,
                        JamKembaliIstirahat: dtl.MaxJamKembaliSore,
                        PotonganBertingkat: [
                        ]
                     })
                  }


                  if (PotBertingkat.length > 0 && DetailGroup.Shifts.length > 0) {
                     await Promise.all(PotBertingkat.map(async function (item, key) {
                        await Promise.all(DetailGroup.Shifts.map(async function (shift, k) {
                           if (shift.Shift == item.Shift) {
                              
                              DetailGroup.Shifts[k].PotonganBertingkat.push({
                                 MaxJamDatang: item.MaxJamDatang,
                                 RpPotonganTerlambat: item.RpPotonganTerlambat
                              })
                              return;
                           }
                        }))
                     }))
                  }

                  detailuser['Groups'].push(DetailGroup);
               }));
            }



            res.send(detailuser);
         });
      }
   );
}

exports.login = (req, res) => {

   let post = {
      Pass: req.body.Pass,
      UserID: req.body.UserID,
      DeviceID: req.body.DeviceID,
   };

   let query = `
        Select u.DeviceID, u.RoleID, u.UserID, u.Username , u.KodeCabang, u.Nama, c.NamaCabang,
        u.GroupID
        FROM user u
        LEFT JOIN cabang c ON u.KodeCabang = c.KodeCabang
        WHERE (??=? AND ??=? AND ??=?) 
        OR (??=? AND ??=? AND ??=?)`;

   let table = [
      "Pass", md5(post.Pass),
      "UserID", post.UserID,
      "DeviceID", post.DeviceID,

      "Pass", md5(post.Pass),
      "Username", post.UserID,
      "DeviceID", post.DeviceID,
   ];

   let query2 = `
        UPDATE user 
        SET DeviceID = "` + req.body.DeviceID + `" 
        WHERE UserID = "` + req.body.UserID + `" 
        OR Username = "` + post.UserID + `"`;

      //   Select u.DeviceID, u.RoleID, u.UserID, u.Username , u.KodeCabang, u.Nama, c.NamaCabang,
      //   u.GroupID
      //   FROM user u
      //   LEFT JOIN cabang c ON u.KodeCabang = c.KodeCabang
      //   WHERE (??=? AND ??=? AND ??=?) 
      //   OR (??=? AND ??=? AND ??=?)`;
   let query3 =
      `SELECT
         u.DeviceID, u.RoleID, u.UserID, u.Username , 
         u.KodeCabang, u.Nama, c.NamaCabang,
         u.GroupID
         
      FROM user u
      LEFT JOIN cabang c ON u.KodeCabang = c.KodeCabang
      WHERE (u.UserID="` + req.body.UserID + `" AND u.Pass="` + md5(post.Pass) + `") 
      OR (u.Username="` + post.UserID + `" AND u.Pass="` + md5(post.Pass) + `")`;
      
   let setDevice = `UPDATE user SET Device = "`+req.body.Device+`" 
      WHERE UserID = "`+post.UserID+`" OR Username = "`+post.UserID+`"`;
   query = mysql.format(query, table);
   conn.query(query, function (error, rows) {
      if (error) {
         if (error) throw error;
      } else {

         if (rows.length > 0) {
            conn.query(setDevice); 

            let Ambil = rows[0];
            let UID = Ambil.UserID;
            let Nama = Ambil.Nama;

            let Role = Ambil.RoleID;
            const token = jwt.generateAccessToken(
               { Username: Ambil.Username, UserID: Ambil.UserID, Role: Ambil.RoleID, KodeCabang: Ambil.KodeCabang }, 31536000);
            res.json({
               Message: "OK", Role, UID, Nama, token: token,
               Cabang: Ambil.KodeCabang + " / " + Ambil.NamaCabang
               , GroupID : Ambil.GroupID
            });
         } else {
            conn.query(query3, function (error, rows) {
               if (error) {
                  if (error) throw error;
               } else {
                  if (rows.length == 1) {
                     let DvcID = rows[0];
                     let DvID = DvcID.DeviceID;
                     if (rows.length == 1 && (DvID == "" || DvcID.UserID == "SB1TEST001")) {
                        conn.query(setDevice); 
                        conn.query(query2, (err) => {
                           let Ambil = rows[0];
                           let UID = Ambil.UserID;
                           let Role = Ambil.RoleID;
                           let Nama = Ambil.Nama;
                           if (err) throw err;
                           const token = jwt.generateAccessToken(
                              { Username: Ambil.Username, UserID: Ambil.UserID, Role: Ambil.RoleID, KodeCabang: Ambil.KodeCabang }, 31536000);
                           res.json({
                              Message: "OK", Role, UID, Nama, token: token,
                              Cabang: Ambil.KodeCabang + " / " + Ambil.NamaCabang
                              , GroupID : Ambil.GroupID
                           });
                        });
                     } else {
                        res.json({
                           Error: true,
                           Message:
                              "Device Tidak Sesuai, Segera Hubungi Admin Jika Ganti Device",
                        });
                     }
                  } else {
                     res.json({
                        Error: true,
                        Message: "Username atau Password Salah",
                     });
                  }
               }
            });
         }
      }
   });
}

// exports.getUser = (req, res) => {
//     res.json({
//         user:req.user
//     })
// }
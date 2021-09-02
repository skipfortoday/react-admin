const conn = require('../../config/database.js')
const md5 = require("md5");
const mysql = require("mysql");
const jwt = require('../../middleware/jwt.js');
const helper = require('../../helper.js')
const fs = require('fs');
const path = require('path');

exports.getMutasiPegawai = (req, res) => {
    let sql = `
    SELECT m.*, 
        CONCAT(c.KodeCabang, " - ", c.NamaCabang) CabangAsal,
        CONCAT(ct.KodeCabang, " - ", ct.NamaCabang) CabangTujuan,
        CONCAT(u.UserID, " - ", u.Nama) Pegawai,
        DATE_FORMAT(m.CreatedAt,"%d/%m/%Y") Tanggal
    FROM mutasipegawai m
    LEFT JOIN cabang c ON c.KodeCabang = m.KodeCabangAsal
    LEFT JOIN cabang ct ON ct.KodeCabang = m.KodeCabangTujuan
    LEFT JOIN user u ON u.UserID = m.UserID`;

    conn.query(sql, (err, rows)=>{
        if (err) {
            throw err;
        } else {
            res.send(rows)
        }
    })
}

exports.postMutasiPegawai = (req, res) => {
    // res.send(req.body)
    let CreatedBy = req.user.AdminID
    let UserID = req.body.pegawai.value
    let KodeCabangAsal = req.body.kodeCabangAsal.value
    let KodeCabangTujuan = req.body.kodeCabangTujuan.value
    
    let sql = `UPDATE user SET KodeCabang = '`+KodeCabangTujuan+`' 
    WHERE UserID = '`+UserID+`'`;

    conn.query(sql, function(err, rows) {
        if (err) {
            throw err;
        } else {
            let sql = `
            INSERT INTO mutasipegawai(
                UserID, KodeCabangAsal, KodeCabangTujuan, Status, CreatedAt, CreatedBy
            ) VALUES(
                '`+UserID+`', '`+KodeCabangAsal+`', '`+KodeCabangTujuan+`', 'APROVED',
                NOW(), `+CreatedBy+`
            )`;
            
            conn.query(sql, function (err, rows) {
                if (err) {
                    throw err;
                } else {
                    res.send({status:true, message:"Mutasi Pegawai Berhasil"})
                }
            })
        }
    })
}

exports.login = (req, res) => {
    let data = {
        Password: md5(req.body.Password),
        Username: req.body.AdminID ? req.body.AdminID : req.body.Username,
    };


    let query = "SELECT * FROM ?? WHERE ??=? AND ??=? AND ( ??=? OR ??=?)";
    let table = [
        "admin", 
        "Password", data.Password, 
        "Username", data.Username, 
        "KodeCabang", req.headers.kodecabang,
        "KodeCabang", "PST"
    ];

    query = mysql.format(query, table);
    //console.log(query)
    conn.query(query, function (err, rows) {
        if (err) {
            throw err;
        } else {
            if (rows.length == 1) {
                conn.query("UPDATE admin SET LastLogin = CURRENT_TIME() WHERE AdminID = '"+rows[0].AdminID+"'");
                const token = jwt.generateAccessToken(
                    { Username: rows[0].Username, AdminID: rows[0].AdminID, Role:rows[0].RoleAdmin, KodeCabang: rows[0].KodeCabang }, 60*60*24*30); //60*60*24*30
                res.json({ 
                    AdminID: rows[0].AdminID, 
                    Username: rows[0].Username, 
                    RoleAdmin: rows[0].RoleAdmin, 
                    message: "OK", 
                    Login: true,
                    token:token
                });
            } else {
                res.json({ message: "Username Passoword Salah", Login: false });
            }
        }
    });
}

const readdirAsync = (path) => {
    return new Promise(function (resolve, reject) {
      fs.readdir(path, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

exports.allUser = async (req, res) => {
    let cabang = req.headers.kodecabang;
    conn.query(`CALL MenampilkanUser('`+ cabang +`')`, async (err, rows) => {
        if (err) throw err;
        let user = rows[0];

        if(cabang == 'all'){
            let userFps = ["noempty"];
            let files = await readdirAsync(__dirname+"/../../fp/");
            Promise.all(files.map((file) => {
                if (path.extname(file) == '.fpt') {
                    userFps.push(path.basename(file).replace(".fpt", ""));
                }
            }));
            // console.log(userFps)
            let i = 0;
            Promise.all(user.map((val, key)=>{
                if(userFps.includes(val.UserID)) i = key;
                user[key].FPServer = userFps.includes(val.UserID);
            }));
            
            res.send(user);
        }else{
            res.send(user);
        }

    });
}

exports.detailUser = (req, res) => {
    conn.query(
        `CALL MenampilkanDetailUser('` + req.params.id + `')`,
        function (err, rows) {
          if (err) throw err;
          let user = rows[0];
          let detailuser = user[0];
          res.send(detailuser);
        }
    );
}

exports.newUser = (req, res) => {

    let qNo = `SELECT IFNULL(RIGHT(MAX(UserID),3)+1,1) nextNo
    FROM user
    WHERE KodeCabang = '${req.body.KodeCabang}'
    AND GroupID = '${req.body.GroupID}'`;
    
    let tglAwalKontrak = req.body.TglAwalKontrakPertama == 'undefined' || req.body.TglAwalKontrakPertama == '' ? null : "'"+req.body.TglAwalKontrakPertama+"'";
    let tglMulaiCuti = req.body.TglAwalKontrakPertama == 'undefined' || req.body.TglAwalKontrakPertama == '' ? null : "'"+helper.addOneYear(req.body.TglAwalKontrakPertama)+"'";
    conn.query(
        qNo,
        function(err, rows){
            let nextNo = rows[0].nextNo+"";
            //console.log(nextNo);
            while(nextNo.length < 3){
                nextNo = "0"+nextNo;
            }
            let UserID = req.body.KodeCabang+req.body.GroupID+nextNo;
            let data = {
                Nama: req.body.Nama,
                UserID: UserID,
                Pass: 'e10adc3949ba59abbe56e057f20f883e',
            };
            let sql =
                `CALL MenambahUser (
                '` + UserID +`',
                '` + data.Pass + `',
                '` + req.body.Nama + `',
                '` + req.body.Alamat +`',
                '` + req.body.TglLahir +`',
                '` + req.body.HP + `',
                '` + req.body.TglMasuk + `',
                ` + tglMulaiCuti +`,
                ` + tglAwalKontrak + `,
                '` +  req.body.GroupID +`',
                '` + req.body.KodeCabang + `',
                '` + req.body.Status + `',
                '` + req.body.TampilkanLembur + `',
                '` + req.body.RoleID +`',
                '` +req.body.Posisi +`',
                '` + req.body.TampilkanTerlambat + `',
                `+ req.body.BisaWFH+`
            )`;
            conn.query(sql, (err, results) => {
                if (err) throw err;
                res.send(JSON.stringify(data));
            });

        }
    );
    

    
    
}

exports.editUser = (req, res) => {
    let data = {
        Nama: req.body.Nama,
        UserID: req.body.UserID,
    };

    let tglKeluar = req.body.TglKeluar == 'undefined' || req.body.TglKeluar == '' ? null : "'"+req.body.TglKeluar+"'";
    let tglAwalKontrak = req.body.TglAwalKontrakPertama == 'undefined' || req.body.TglAwalKontrakPertama == '' ? null : "'"+req.body.TglAwalKontrakPertama+"'";
    let tglMulaiCuti = req.body.TglAwalKontrakPertama == 'undefined' || req.body.TglAwalKontrakPertama == '' ? null : "'"+helper.addOneYear(req.body.TglAwalKontrakPertama)+"'";
    let sql =`CALL EditUser (
        '` + req.params.id + `',
        '` + req.body.Nama + `',
        '` + req.body.Alamat + `',
        '` + req.body.TglLahir + `',
        '` + req.body.HP + `',
        '` + req.body.TglMasuk + `',
        ` + tglMulaiCuti + `,
        ` + tglAwalKontrak + `,
        '` + req.body.GroupID + `',
        '` + req.body.KodeCabang + `',
        '` + req.body.Status + `',
        '` + req.body.TampilkanLembur + `',
        '` + req.body.RoleID + `',
        '` + req.body.Posisi + `',
        '` + req.body.TampilkanTerlambat +`',
        ` + tglKeluar +`,
        `+req.body.BisaWFH+`
    )`;
    
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.deleteUser = (req, res) => {
    let sql = `DELETE FROM user WHERE UserID="` + req.params.id + `"`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}

exports.resetDevice = (req, res) => {
    let data = {
        UserID: req.params.id,
      };
    let sql = `UPDATE user SET DeviceID="" WHERE UserID="` + req.params.id + `"`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.resetPassword = (req, res) => {
    let data = {
        UserID: req.params.id,
        Pass: 'e10adc3949ba59abbe56e057f20f883e',
    };
    let sql = `UPDATE user SET Pass="` + data.Pass + `" WHERE UserID="` + req.params.id + `"`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}
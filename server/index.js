const express = require("express");
const moment = require("moment");
const multer = require("multer");
let cors = require("cors");
let md5 = require("md5");
const bodyParser = require("body-parser");
const app = express();
// const mysql = require("mysql");
const mysql = require('mysql');
const { request } = require("express");
let session = require("express-session");
const fs = require('fs')

const util = require('util');
const helper = require('./helper.js');

// Disk Upload File
const path = require("path");

// parse application/json
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(
   session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
   })
);
app.use(bodyParser.json());
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);
const conn = require("./config/database");
const { mapSeries } = require("async");
const e = require("express");

const asyncQuery = util.promisify(conn.query).bind(conn);

// var morgan = require('morgan')
// var rfs = require('rotating-file-stream') // version 2.x
// // create a rotating write stream
// var accessLogStream = rfs.createStream('access.log', {
//   interval: '1d', // rotate daily
//   path: path.join(__dirname, 'log')
// })

// // setup the logger
// app.use(morgan('tiny', { stream: accessLogStream }))



var log4js = require('log4js');

log4js.configure({
   appenders: { cheese: { type: "file", filename: "express.log" } },
   categories: { default: { appenders: ["cheese"], level: "error" } }
});

var logger = log4js.getLogger('cheese');
// logger.setLevel('DEBUG');
// app.use(log4js.connectLogger(logger, {level: log4js.levels.DEBUG}));
//const logger = log4js.getLogger("cheese");
app.use(log4js.connectLogger(logger, { level: 'error' }));

app.get('/xxx', function (req, res) {
   let a = b + "xx";
   res.send("OK")
   // logger.error("Cheese is too ripe!");
   // conn.query("SELECT * FROM xxx", (err, rows)=>{

   //   //res.send(rows);
   // })
})

app.get("/api/laporandetail2/:id", (req, res) => {
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

app.get("/api/lp/:id", (req, res) => {
   conn.query(`CALL getID('` + req.params.id + `')`, function (err, rows) {
      if (err) throw err;
      let scan = rows[0];
      res.send(JSON.stringify(scan));
   });
});

///////////// API OPTION USER /////////
app.get("/api/optuser", (req, res) => {
   conn.query(`CALL optUser('` + req.headers.kodecabang + `')`, function (err, rows) {
      if (err) throw err;
      let user = rows[0];
      res.send(user);
   });
});

///////////// API OPTION GROUP  /////////
app.get("/api/optgroup", (req, res) => {
   conn.query(`CALL optGroup('` + req.headers.kodecabang + `')`, function (err, rows) {
      if (err) throw err;
      let group = rows[0];
      res.send(group);
   });
});

///////////// API OPTION GROUP  /////////
app.get("/api/optTerlambat", (req, res) => {
   conn.query(`CALL optTerlambat('` + req.headers.kodecabang + `')`, function (err, rows) {
      if (err) throw err;
      let group = rows[0];
      res.send(group);
   });
});

///////////// API OPTION CABANG  /////////
app.get("/api/optcabang", (req, res) => {
   conn.query(`CALL optCabang`, function (err, rows) {
      if (err) throw err;
      let Cabang = rows[0];
      res.send(Cabang);
   });
});

///////////// API ON DUTY /////////
app.get("/api/onduty", (req, res) => {
   conn.query(`CALL OnDutyRoster('` + req.headers.kodecabang + `')`, function (err, rows) {
      if (err) throw err;
      let Cabang = rows[0];
      res.send(Cabang);
   });
});

const storage1 = multer.diskStorage({
   destination: path.join(__dirname + '/fp'),
   filename: function (req, file, cb) {
      cb(null, req.body.UserID + ".fpt");
   }
});

const upload1 = multer({
   storage: storage1
}).single('file');

app.post("/api/uploadfp", (req, res) => {

   upload1(req, res, err => {
      if (err) throw err
      res.send("ok");
   });

});

app.post("/api/proses", async (req, res) => {

   let arrNama = [];
   let tglAwal = "";
   let tglAkhir = "";
   if (Array.isArray(req.body.Nama)) {
      arrNama = req.body.Nama;
      tglAwal = req.body.TanggalScan;
      tglAkhir = req.body.TanggalScanSampai;
   } else {
      arrNama.push(req.body.Nama);
      tglAwal = req.body.TglAwal;
      tglAkhir = req.body.TglAkhir;
   }

   let resStr = ``;
   let arrX = [];
   await Promise.all(arrNama.map(async (data, kx) => {

      let post = {
         UserID: data.value,
         TglAwal: tglAwal,
         TglAkhir: tglAkhir,
      };

      let sql2 = `
      SELECT Tanggal 
      FROM tmptanggal 
      WHERE 
        Tanggal NOT IN (
          SELECT TanggalScan 
          FROM attlog 
          WHERE UserID ="`+ post.UserID + `"
          AND TanggalScan BETWEEN "`+ post.TglAwal + `" AND "` + post.TglAkhir + `" -- 2021-03-24 Ali: saya tambah line ini agar mempercepat query kalau data sudah besar nantinya.
        ) 
        AND Tanggal BETWEEN "`+ post.TglAwal + `" AND "` + post.TglAkhir + `"`;


      const rows = await asyncQuery(sql2);
      if (rows.length > 0) {
         await Promise.all(rows.map(async function (data1, key) {
            //qq += `CALL ProsesAbsensi('` + post.UserID + `','` + moment.parseZone(data1.Tanggal).format('YYYY-MM-DD') + `');`;
            var qq = `CALL ProsesAbsensi('` + post.UserID + `','` + moment.parseZone(data1.Tanggal).format('YYYY-MM-DD') + `');`;
            var proses = await asyncQuery(qq);
            resStr += JSON.stringify(proses);
         }));
      }

      let sql3 = `CALL MencariTanggalLupaScanPulang('` + post.UserID + `','` + post.TglAwal + `','` + post.TglAkhir + `')`;

      const lupaScan = await asyncQuery(sql3);
      if (lupaScan[0].length > 0) {
         var qq = ``;
         await Promise.all(lupaScan[0].map(async function (data2) {
            var qq = `CALL ProsesAbsensiLupaScanPulang('` + post.UserID + `','` + moment.parseZone(data2.TanggalScan).format('YYYY-MM-DD') + `');`;
            var lupaScanProses = await asyncQuery(qq);
            resStr += JSON.stringify(lupaScanProses);
         }));
      }

      if (kx == arrNama.length - 1) {
         var mc = (resStr.match(new RegExp('"affectedRows":1', "g")) || []).length;
         var mx = (resStr.match(new RegExp('"affectedRows":0', "g")) || []).length;
         res.send(JSON.stringify({ successCount: mc, failCount: mx, }));
      }
   }));
});

// Api untuk proses absensi
app.post("/api/pilihizin", async (req, res) => {
   let ArrayID = req.body.Nama;
   var startDay = new Date(req.body.TanggalScan);
   var endDay = new Date(req.body.TanggalScanSampai);
   var responseObj = {
      successCount: 0,
      failCount: 0,
      failMessage: "",
      successMessage: "OK"
   };
   var dayArray = [];
   for (var day = startDay; day <= endDay; day.setDate(day.getDate() + 1)) {
      dayArray.push(helper.formatTglYmd(day));
      console.log(helper.formatTglYmd(day));
   }

   await Promise.all(ArrayID.map(async (data) => {
      let body = {
         UserID: data.value,
         TanggalScan: req.body.TanggalScan,
         TanggalScanSampai: req.body.TanggalScanSampai,
         Status: req.body.Status,
         Keterangan: req.body.Keterangan,
      };


      await Promise.all(dayArray.map(async (day) => {
         let qq = `CALL InputIzinLiburMassal(
        '`+ body.UserID + `',
        '`+ day + `',
        '`+ body.Status.value + `',
        '`+ body.Keterangan + `'
      )`;
         let proses = await asyncQuery(qq);
         let results = JSON.parse(JSON.stringify(proses[0]))[0];
         // console.log(results);
         if (results.status == 0) {
            responseObj.failCount += 1;
            responseObj.failMessage += results.StatusAction + ", ";
         } else {
            responseObj.successCount += 1;
         }
      }));
   }));
   res.json(responseObj);

});

app.get("/api/history/:Nama&:TglAwal&:TglAkhir", (req, res) => {
   let sql = `
  SELECT 
    id,
    DATE_FORMAT(TglEntry, "%Y-%m-%d %H:%i:%s") TglEntry,
    Nama,
    CONCAT(IFNULL(OldShift,"0"), " -> ", IFNULL(NewShift,"0")) Shift,
    DATE_FORMAT(TanggalScan, "%Y-%m-%d") TglAbsen,
    CONCAT(IFNULL(DATE_FORMAT(OldScanMasuk,"%H:%i:%s"),"00:00:00")," -> ", IFNULL(DATE_FORMAT(NewScanMasuk,"%H:%i:%s"),"00:00:00")) ScanMasuk,
    CONCAT(IFNULL(DATE_FORMAT(OldScanPulang,"%H:%i:%s"),"00:00:00")," -> ", IFNULL(DATE_FORMAT(NewScanPulang,"%H:%i:%s"),"00:00:00")) ScanPulang,
    CONCAT(IFNULL(OldStatus,""), " -> ", IFNULL(NewStatus,"")) Status,
    CONCAT(IFNULL(OldKeterangan,""), " -> ", IFNULL(NewKeterangan,"")) Keterangan,
    UserEntry editBy
  FROM attlog_log
  WHERE 
    (UserID = '`+ req.params.Nama + `' OR '` + req.params.Nama + `' = 'all')
    AND TanggalScan >= '`+ req.params.TglAwal + `'
    AND TanggalScan <= '`+ req.params.TglAkhir + `'
    AND KodeCabang = '`+ req.headers.kodecabang + `'
  ORDER BY TanggalScan DESC
  `;

   conn.query(sql, function (err, rows) {
      if (err) throw err;
      res.send(rows);
   });
});

// set config
app.post("/api/setconfig", (req, res) => {
   let kodecabang = req.body.KodeCabang.toUpperCase();
   let plainPassword = req.body.Password;
   let md5Password = md5(kodecabang + "@@" + plainPassword);
   let sql = `SELECT KodeCabang, NamaCabang 
  FROM cabang 
  WHERE KodeCabang = '`+ kodecabang + `'
  AND Password = '`+ md5Password + `'
  `;
   console.log(sql);
   conn.query(
      sql,
      (err, results) => {
         if (err) throw err;
         if (results.length > 0) {
            res.json({
               status: true,
               KodeCabang: results[0].KodeCabang,
               NamaCabang: results[0].NamaCabang
            })
         } else {
            res.json({ status: false })
         }
      }
   )
});

require("./routes.js")(app);
//Server listening

app.get("/testdownload", (req, res) => {
   // res.send("ok")
   res.sendFile(__dirname + "/fp/SB1MIT005.fpt");
})

app.get("/downloadfp", (req, res) => {
   let id = req.query.id;
   res.sendFile(__dirname + "/fp/" + id + ".fpt")
})

app.delete("/api/deletefingerprint/:id", (req, res) => {
   let UserID = req.params.id;
   let path = __dirname + "/fp/" + UserID + ".fpt";

   if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
         if (err) {
            // if (err) throw err;
            res.send("ok")
         }
         res.send("ok")
      })
   }

})


app.get("/api/pegawai", (req, res) => {
   let kodeCabang = req.headers.kodecabang;
   let q = `
   SELECT 
      u.UserID, 
      u.Nama, 
      c.KodeCabang, 
      c.NamaCabang,
      g.GroupID KodeGroup,
      g.Jabatan,
      DATE_FORMAT(u.TglMasuk, "%Y-%m-%d") TglMasuk
   FROM user u 
   LEFT JOIN cabang c ON c.KodeCabang = u.KodeCabang
   LEFT JOIN tblgrupjabatan g ON g.GroupID = u.GroupID AND g.KodeCabang = u.KodeCabang
   WHERE u.KodeCabang = '${kodeCabang}'
   AND (u.TglKeluar IS NULL OR CURRENT_DATE() < u.TglKeluar)
  `;

  conn.query(q, (err, result)=>{
     res.send(result)
  })

})

app.listen(3009, () => {
   console.log("Server started on port 3009...");
});
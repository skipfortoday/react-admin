const conn = require('../../config/database.js')

exports.reportBulan = (req, res) => {
    conn.query(
        `CALL AppReportPerbulan('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let user = rows[0];
            let detailuser = user[0];
            res.send(detailuser);
        }
    );
}

exports.reportTahun = (req, res) => {
    conn.query(
        `CALL AppRekapPertahun('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let user = rows[0];
            let detailuser = user[0];
            res.send(detailuser);
        }
    );
}

exports.listScanPerHari = (req, res) => {
    const KodeCabang = req.user.KodeCabang;

    conn.query(
        `CALL ListScanPerhari('` + KodeCabang + `')`,
        function (err, rows) {
            if (err) throw err;
            let scan = rows[0];
            res.send(scan);
        }
    );
}

exports.lp = (req, res) => {
    conn.query(
        `CALL getID('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let scan = rows[0];
            res.send(JSON.stringify(scan));
        }
    )
}

exports.laporan2 = (req, res) => {
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

            if (strDatangID == "") strDatangID = "0";

            let sql =
                `SELECT *, 
            CONCAT(JamKeluar, ' (',KodeCabangKeluar,')')  JamKeluar,
            CONCAT(JamKembali, ' (',KodeCabangKembali,')')  JamKembali,
            IF(
                JamKembali IS NULL, DATE_FORMAT(JamKeluar, "%H:%i"), 
                CONCAT(DATE_FORMAT(JamKeluar, "%H:%i"),' - ', 
                DATE_FORMAT(JamKembali, "%H:%i"))
            ) AS KelKan, 
            CONCAT('Total = ',IF(JamKembali IS NULL, '', DATE_FORMAT(TIMEDIFF(JamKembali,JamKeluar), "%H:%i"))) AS Durasi , 
            CONCAT('Ket. : ',IFNULL(Keterangan,'')) AS Ket, 
            CONCAT('Ket. Kembali : ',IFNULL(KeteranganKembali,'')) AS KetKembali 
     
            FROM tblkeluarkantor WHERE DatangID IN(` +
                strDatangID +
                `) `;

            conn.query(sql, (err, results) => {
                if (err) throw err;
                results.map(function (data, key) {
                    data["k"] = "Keluar Kantor";
                    newArray[data.DatangID]["detail"].push(data);
                });
                res.send(newArray);
            });
        }
    );
}

exports.appLaporan = (req, res) => {
    conn.query(
        `CALL AppMenampilkanScan('` + req.params.id + `')`,
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
            //console.log(newArray)

            if (strDatangID == "") strDatangID = "0";

            let sql =
                `SELECT *, 
            CONCAT(JamKeluar, ' (',KodeCabangKeluar,')')  JamKeluar,
            CONCAT(JamKembali, ' (',KodeCabangKembali,')')  JamKembali,
            IF(
                JamKembali IS NULL, DATE_FORMAT(JamKeluar, "%H:%i"), 
                CONCAT(DATE_FORMAT(JamKeluar, "%H:%i"),' - ', 
                DATE_FORMAT(JamKembali, "%H:%i"))
            ) AS KelKan, 
            CONCAT('Total = ',IF(JamKembali IS NULL, '', DATE_FORMAT(TIMEDIFF(JamKembali,JamKeluar), "%H:%i"))) AS Durasi , 
            CONCAT('Ket. : ',IFNULL(Keterangan,'')) AS Ket, 
            CONCAT('Ket. Kembali : ',IFNULL(KeteranganKembali,'')) AS KetKembali 
     
            FROM tblkeluarkantor WHERE DatangID IN(` +
                strDatangID +
                `) `;

            conn.query(sql, (err, results) => {
                if (err) throw err;
                results.map(function (data, key) {
                    data["k"] = "Keluar Kantor";
                    newArray[data.DatangID]["detail"].push(data);
                });
                var array = [];
                for (var v in newArray) {
                    array.push(newArray[v]);
                }
                //console.log(newArray);
                res.send(newArray);
            });
        }
    );
}

exports.listPengumuman = (req, res) => {
    let KodeCabang = req.user.KodeCabang;
    conn.query(`CALL appListPengumuman('`+KodeCabang+`', '`+req.user.UserID+`','')`, function (err, rows) {
        if (err) throw err;
        let news = rows;
        res.send(news[0]);
    });
}

exports.cariPengumuman = (req, res) => {
    let KodeCabang = req.user.KodeCabang;
    let key = req.params.key;
    conn.query(`CALL appListPengumuman('`+KodeCabang+`', '`+req.user.UserID+`', '`+key+`')`, 
        function (err, rows) {
        if (err) throw err;
        let news = rows;
        res.send(news[0]);
    });
}

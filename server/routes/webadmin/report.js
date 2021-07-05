const conn = require('../../config/database.js')

exports.laporanTidakLengkap = (req, res) => {
    conn.query(
        `CALL ReportAbsenTidakLengkap(
            '`+req.params.id+`',
            '`+req.params.TglAwal+`',
            '`+req.params.TglAkhir+`',
            '`+req.params.Nama+`'
        )`,
        function(err, rows){
            if(err) throw err;
            res.send(rows[0]);
        }
    )
}

// table header laporan
exports.headerLaporan = (req, res) => {
    conn.query(
        `CALL HeaderLaporan('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let user = rows[0];
            let detailuser = user[0];
            res.send(detailuser);
        }
    );
}

// table body laporan
exports.laporanDetail = (req, res) => {
    //console.log(req.params);
    conn.query(
        `CALL HeaderLaporan('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let user = rows[0];
            let detailuser = user[0];
            //res.send(detailuser);
            conn.query(
                `CALL LaporanPertanggal (
                    '` + req.params.id + `',
                    '` + req.params.TglAwal + `',
                    '` + req.params.TglAkhir + `'
                )`,

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

                    if (strDatangID === '') strDatangID = '0'; // supaya tidak error kalau tidak ada data
                    // res.send(strDatangID);

                    let sql =
                        `SELECT *,  
                    IF(JamKembali IS NULL, 
                        CONCAT(KodeCabangKeluar,' ',DATE_FORMAT(JamKeluar, "%H:%i")), 
                        CONCAT(
                            KodeCabangKeluar,' ', DATE_FORMAT(JamKeluar, "%H:%i"),' - ', 
                            KodeCabangKembali,' ', DATE_FORMAT(JamKembali, "%H:%i")
                        )
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
                            newArray[data.TanggalScan]["detail"].push(data);
                        });
                        //res.send(newArray);
                        conn.query(
                            `CALL ReportPertanggal (
                                '` + req.params.id + `',
                                '` + req.params.TglAwal + `',
                                '` + req.params.TglAkhir + `'
                            )`,
                            function (err, rows) {
                                if (err) throw err;
                                let rek = rows[0];
                                let det = rek[0];
                                // res.send(JSON.stringify(newArray);
                                res.send({header:detailuser, body:newArray, footer:det});
                            }
                        );
                    });
                }
            );
        }
    );


}

// table footer laporan
exports.laporanRekap = (req, res) => {
    conn.query(
        `CALL ReportPertanggal (
            '` + req.params.id + `',
            '` + req.params.TglAwal + `',
            '` + req.params.TglAkhir + `'
        )`,
        function (err, rows) {
            if (err) throw err;
            let rek = rows[0];
            let det = rek[0];
            res.send(det);
        }
    );
}
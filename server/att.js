const conn = require('/home/lviors/absensi/config/database.js')
const util = require('util');

exports.scanMasuk = (req, res) => {
    const ip = req.headers.ip;
    const kodeIP = ip.split(".")[2];

    //sementara wildcard jika belum ada headers mac
    let mac = req.headers.mac == undefined ? 'ios' : req.headers.mac;
    //let mac = req.headers.mac;
    mac = 'ios';

    let sudahAbsen = `SELECT DatangID FROM attlog WHERE UserID = '` + req.body.UserID + `' 
        AND TanggalScan = CURRENT_DATE()`;
    conn.query(sudahAbsen, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.send({message:"Sudah absen", status:false})
        } else {
            let qq = `SELECT KodeCabang,NamaCabang, IF(wfh.UserID IS NULL,0,1) wfh 
            FROM accesspoint 
            LEFT JOIN wfh ON wfh.UserID = '`+req.body.UserID+`'
            WHERE (IP = '` + kodeIP + `' OR wfh.UserID IS NOT NULL)
            AND (MacAddress = '`+ mac + `' OR '` + mac + `' = 'ios')
            `;
            // console.log(qq)
            conn.query(
                qq,
                function (err, rows) {
                    if (err) res.json({ message: err.sqlMessage, site: null, wifi: false });

                    if (rows.length === 0) {
                        // IP tidak valid
                        res.json({ status: false, message: "Tidak Terkoneksi WiFi Absensi.", site: null, wifi: false })
                    } else {
                        var KodeCabang = rows[0].KodeCabang;
                        var site = rows[0].KodeCabang + " / " + rows[0].NamaCabang;
                        // sementara karena ujicoba belum menggunakan IP yang berbeda2, 
                        // KodeCabang = req.body.KodeCabang;
                        let CekBio = req.body.CekBio == true ? '1' : '0';
                        let Auth = req.body.Auth == true ? '1' : '0';;
                        let CekMasukHP = CekBio + Auth;
                        let CaraMasuk = "HP";
                        if(rows[0].wfh == 1) CaraMasuk = CaraMasuk+"WFH";

                        if (KodeCabang.toLowerCase() !== req.body.KodeCabang.toLowerCase()) {
                            res.json({ status: false, message: "QR Code Salah.", site: site, wifi: true })
                        } else {
                            let sql = `
                                CALL ProsesMasuk (
                                    '` + req.body.UserID + `',
                                    '` + req.body.TanggalScan + `',
                                    '` + req.body.ScanMasuk + `',
                                    '` + req.body.Shift + `',
                                    '` + KodeCabang.toUpperCase() + `',
                                    '`+CaraMasuk+`',
                                    '`+ CekMasukHP + `'  
                                )`;
                            conn.query(sql, (err, results) => {
                                if (err) res.json({ message: err.sqlMessage });
                                let result = results[0][0];
                                let response = {
                                    status: result.status > 0 ? true : false,
                                    message: result.message,
                                    data: {
                                        UserID: result.UserID,
                                        jamMasuk: result.jamMasuk,
                                        jamMasukMax: result.jamMasukMax,
                                        jamScan: result.jamScan,
                                        DatangID: result.DatangID
                                    },
                                    site: site,
                                    wifi: true
                                };
                                res.send(JSON.stringify(response));
                            });
                        }

                    }
                }
            )
        }
    })


}

exports.setScanMasukKeterangan = (req, res) => {
    let sql = `
        CALL InputKetTerlambat (
            '`+ req.params.id + `',
            '`+ req.body.Keterangan + `'
        )`;

    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify());
    });
}

exports.scanPulang = (req, res) => {
    const ip = req.headers.ip;
    const kodeIP = ip.split(".")[2];

    //sementara wildcard jika belum ada headers mac
    let mac = req.headers.mac == undefined ? 'ios' : req.headers.mac;
    //let mac = req.headers.mac;
    mac = 'ios';

    conn.query(
        `SELECT KodeCabang,NamaCabang 
        FROM accesspoint 
        LEFT JOIN wfh ON wfh.UserID = '`+req.user.UserID+`'
        WHERE (IP = '` + kodeIP + `' OR wfh.UserID IS NOT NULL)
        AND (MacAddress = '`+ mac + `' OR '` + mac + `' = 'ios')
        `,
        function (err, rows) {
            if (err) res.json({ message: err.sqlMessage, site: null, wifi: false });

            if (rows.length === 0) {
                // IP tidak valid
                res.json({ status: false, message: "Tidak Terkoneksi WiFi Absensi", site: null, wifi: false })
            } else {
                const KodeCabang = rows[0].KodeCabang;
                var site = rows[0].KodeCabang + " / " + rows[0].NamaCabang;

                let sql = `SELECT IFNULL(k.KodeCabangKembali, a.KodeCabang) lokasi
                FROM attlog a
                LEFT JOIN tblkeluarkantor k ON k.DatangID = a.DatangID
                WHERE
                a.DatangID = '`+ req.params.id + `'
                AND (
                    k.KeluarID = (
                        SELECT MAX(KeluarID)
                        FROM tblkeluarkantor
                        WHERE DatangID = a.DatangID
                    ) 
                    OR k.KeluarID IS NULL
                )`;
                conn.query(sql, (err, results) => {
                    if (err) throw err;
                    var lokasiLastMasuk = results[0].lokasi;
                    if (lokasiLastMasuk.toLowerCase() == KodeCabang.toLowerCase()) {
                        let sql =
                            `CALL ProsesPulang (
                            '` + req.params.id + `',
                            '` + req.body.ScanPulang + `',
                            '` + req.body.KetPulang + `',
                            '` + KodeCabang + `'
                        )`;

                        conn.query(sql, (err, results) => {
                            if (err) throw err;
                            let result = results[0][0];
                            let response = {
                                status: result.status > 0 ? true : false,
                                message: result.message,
                                site: site,
                                wifi: true
                            }

                            res.json(response)
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "Pulang harus di lokasi masuk terakhir. Saat ini di " + lokasiLastMasuk.toUpperCase(),
                            site: site,
                            wifi: true
                        })
                    }
                })
            }
        }
    )
}

exports.keluarKantor = (req, res) => {
    const ip = req.headers.ip;
    const kodeIP = ip.split(".")[2];

    //sementara wildcard jika belum ada headers mac
    let mac = req.headers.mac == undefined ? 'ios' : req.headers.mac;
    //let mac = req.headers.mac;
    mac = 'ios';
    //console.log(req.headers);

    conn.query(
        `SELECT KodeCabang 
        FROM accesspoint 
        WHERE IP = '` + kodeIP + `'
        AND (MacAddress = '`+ mac + `' OR '` + mac + `' = 'ios')
        `,
        function (err, rows) {
            if (err) res.json({ message: err.sqlMessage });

            if (rows.length === 0) {
                // IP tidak valid
                let response = {
                    status: false,
                    message: "Tidak Terkoneksi WiFi Absensi."
                }
                res.json(response);
            } else {
                const KodeCabang = rows[0].KodeCabang;

                // cek untuk memastikan keluar kantor dari cabang dimana dia scan masuk / kembali kantor terakhir
                let sql = `SELECT IFNULL(k.KodeCabangKembali, a.KodeCabang) lokasi
                FROM attlog a
                LEFT JOIN tblkeluarkantor k ON k.DatangID = a.DatangID
                WHERE
                a.DatangID = `+ req.body.DatangID + `
                AND (k.KeluarID = (
                    SELECT MAX(KeluarID)
                    FROM tblkeluarkantor
                    WHERE DatangID = a.DatangID
                ) OR k.KeluarID IS NULL)`;
                conn.query(sql, (err, results) => {
                    if (err) throw err;
                    var lokasiLastMasuk = results[0].lokasi;
                    if (lokasiLastMasuk.toLowerCase() == KodeCabang.toLowerCase()) {
                        let sql =
                            `CALL ProsesKeluarKantor (
                            '` + req.body.DatangID + `',
                            '` + req.body.JamKeluar + `',
                            '` + req.body.Keterangan + `',
                            '` + KodeCabang + `'
                        )`;

                        conn.query(sql, (err, results) => {
                            if (err) throw err;
                            let result = results[0][0];

                            let response = {
                                status: result.status > 0 ? true : false,
                                message: result.message
                            }
                            res.json(response)
                        });
                    } else {
                        let response = {
                            status: false,
                            message: "Keluar kantor harus di lokasi masuk terakhir. Saat ini Anda di " + lokasiLastMasuk.toUpperCase()
                        }
                        res.json(response)
                    }
                });

            }
        }
    )
}

exports.kembaliKantor = (req, res) => {
    const ip = req.headers.ip;
    const kodeIP = ip.split(".")[2];

    //sementara wildcard jika belum ada headers mac
    let mac = req.headers.mac == undefined ? 'ios' : req.headers.mac;
    //let mac = req.headers.mac;
    mac = 'ios';

    conn.query(
        `SELECT KodeCabang 
        FROM accesspoint 
        WHERE IP = '` + kodeIP + `'
        AND (MacAddress = '`+ mac + `' OR '` + mac + `' = 'ios')
        `,
        function (err, rows) {
            if (err) res.json({ message: err.sqlMessage });

            if (rows.length === 0) {
                // IP tidak valid
                let response = {
                    status: false,
                    message: "Tidak Terkoneksi WiFi Absensi."
                }
                res.json(response)
            } else {
                const KodeCabang = rows[0].KodeCabang;
                const sql = `
                    CALL ProsesKembaliKantor (
                        '` + req.params.id + `',
                        '` + req.body.JamKembali + `',
                        '` + req.body.KeteranganKembali + `',
                        '` + KodeCabang + `'
                    )`;

                conn.query(sql, (err, results) => {
                    if (err) throw err;
                    let result = results[0][0];

                    let response = {
                        status: result.status > 0 ? true : false,
                        message: result.message
                    }

                    res.json(response)
                });
            }
        }
    )
}

exports.getKeluarKantor = (req, res) => {

    conn.query(
        `CALL MengambilKeluarID ('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let datang = rows[0];
            res.send(datang);
        }
    );

}

exports.istirahatKeluar = (req, res) => {
    const ip = req.headers.ip;
    const kodeIP = ip.split(".")[2];

    //sementara wildcard jika belum ada headers mac
    let mac = req.headers.mac == undefined ? 'ios' : req.headers.mac;
    //let mac = req.headers.mac;
    mac = 'ios';

    conn.query(
        `SELECT KodeCabang 
        FROM accesspoint 
        WHERE IP = '` + kodeIP + `'
        AND (MacAddress = '`+ mac + `' OR '` + mac + `' = 'ios')
        `,
        function (err, rows) {
            if (err) res.json({ message: err.sqlMessage });

            if (rows.length === 0) {
                // IP tidak valid
                res.json({ message: "Istirahat keluar gagal, pastikan device terkoneksi dengan Wifi Absensi" })
            } else {
                let sql = `CALL ProsesIstirahatKeluar(
                    '` + req.params.id + `',
                    '` + req.body.IstirahatKeluar + `',
                    '` + req.body.KetIstirahatKeluar + `'
                )`;

                conn.query(sql, (err, results) => {
                    if (err) throw err;
                    res.send(JSON.stringify(results));
                });
            }
        }
    );

}

exports.istirahatKembali = (req, res) => {
    const ip = req.headers.ip;
    const kodeIP = ip.split(".")[2];

    //sementara wildcard jika belum ada headers mac
    let mac = req.headers.mac == undefined ? 'ios' : req.headers.mac;
    //let mac = req.headers.mac;
    mac = 'ios';

    conn.query(
        `SELECT KodeCabang 
        FROM accesspoint 
        WHERE IP = '` + kodeIP + `'
        AND (MacAddress = '`+ mac + `' OR '` + mac + `' = 'ios')
        `,
        function (err, rows) {
            if (err) res.json({ message: err.sqlMessage });

            if (rows.length === 0) {
                // IP tidak valid
                res.json({ message: "Kembali istirahat gagal, pastikan device terkoneksi dengan Wifi Absensi" })
            } else {
                let sql = `CALL ProsesIstirahatKembali (
                    '` + req.params.id + `',
                    '` + req.body.IstirahatKembali + `',
                    '` + req.body.KetIstirahatKembali + `'
                )`;
                conn.query(sql, (err, results) => {
                    if (err) throw err;
                    res.send(JSON.stringify(results));
                });
            }
        }
    )
}

exports.getDatangID = (req, res) => {
    conn.query(
        `CALL MengambilDatangID ('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            if (rows[0].length > 0) {
                let response = JSON.parse(JSON.stringify(rows[0]));
                response[0]['status'] = true;
                res.json(response[0]);
            } else {
                let sql = `SELECT Now() as Waktu`;
                conn.query(sql, (err, results) => {
                    if (err) res.send(JSON.stringify(err));
                    let response = JSON.parse(JSON.stringify(results));
                    response[0]['status'] = true;
                    res.json(response[0]);
                });
            }
        }
    );
}

exports.getTime = (req, res) => {

    // check app version dulu
    // sementara karena masih development belum ada params appversion dari app, jadi saya wildcard kan dlu, 
    // .. nanti kalau sudah direlease yang baru sudah ada param appversion, tidak pakai wildcard lagi
    let appversion = req.headers.appversion == undefined ? 'ooo' : req.headers.appversion;
    // let appversion = req.headers.appversion;

    let kodeIP = '';
    if (req.headers.ip == 'null') {
        kodeIP = -1;
    } else {
        const ip = req.headers.ip;
        kodeIP = ip.split(".")[2];
    }

    //sementara wildcard jika belum ada headers mac
    let mac = req.headers.mac == undefined ? 'ios' : req.headers.mac;
    //let mac = req.headers.mac;
    mac = 'ios';
    
    let qq = `CALL getAppTime(
        '`+ req.params.id + `',
        '`+ appversion + `',
        '`+ kodeIP + `',
        '`+ mac + `'
    )`;
    console.log(qq)
    conn.query(
        qq,
        (err, results) => {
            if (err) res.json({ message: err.sqlMessage });
            let response = results[0][0];
            response.status = response.status == 1 ? true : false;
            response.obsolete = response.obsolete == 1 ? true : false;
            res.json(response);
        }
    );
}

exports.addLog = async (req, res) => {
    // console.log(req.body)
    let logs = Array.isArray(req.body.logs) ? req.body.logs : JSON.parse(req.body.logs);
    let arrlogs = [];
    await Promise.all(logs.map((val, key) => {
        arrlogs.push(val.replace(' - unsynced', ''));
    }));

    let values = '("' + arrlogs.join('"),("') + '")';
    await Promise.all(values.replace(/ - unsynced/g, ""))

    let q = 'INSERT INTO logs VALUES ' + values + '; ';
    conn.query(q, (err, rows) => {
        //if (err) throw err;
        if (err) res.send({ status: false, affectedRows: 0, message: err.sqlMessage });
        else
            res.send({ status: true, affectedRows: rows.affectedRows, message: rows.affectedRows + ' inserted' });

    })

}
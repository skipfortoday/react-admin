const conn = require('../../config/database.js')
const moment = require("moment")
const util = require('util')
const asyncQuery = util.promisify(conn.query).bind(conn);

exports.masukManual = (req, res) => {
    let parsing = {
        Tanggal: moment.parseZone(moment()).format('YYYY-MM-DD'),
        ScanMasuk: moment.parseZone(moment()).format('HH:mm:ss'),
        UserID: req.body.UserID,
        Nama: req.body.NamaUser
    }
    let ket = req.body.Keterangan == undefined ? '' : req.body.Keterangan;
    let caraMasuk = parseInt(req.body.IsFP) == 1 ? 'FP': 'MNL';
    let sql =
        `CALL ProsesMasukManual (
        '` + req.body.UserID +`',
        '` + parsing.Tanggal +`',
        '` + parsing.ScanMasuk + `',
        '` + req.body.Shift + `',
        '` + ket +`',  
        '` + req.headers.kodecabang +`',
        '` + caraMasuk+`' 
    )`;
    // console.log(sql);
    // res.send("ok")
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0][0]);
    });
}

exports.syncToServer = async (req, res) => {
    let attlogs = req.body.attlogs;
    let ids = []
    let id;
    
    Promise.all(attlogs.map(async(item)=> {
        id = 0;
        if(item.Status == 0){
            let data = {
                Tanggal: item.TanggalScan,
                ScanMasuk: item.ScanMasuk,
                UserID: item.UserID,
                Nama: item.Nama,
                ket: item.Keterangan,
                caraMasuk:'FP',
                Shift:item.Shift,
            }

            let sql =
                `CALL ProsesMasukManual (
                '` + data.UserID +`',
                '` + data.Tanggal +`',
                '` + data.ScanMasuk + `',
                '` + data.Shift + `',
                '` + data.ket +`',  
                '` + req.headers.kodecabang +`',
                '` + data.caraMasuk+`' 
            )`;
            
            const masuk = await asyncQuery(sql);
            id = masuk[0][0].DatangID;
            if(id) ids.push(id)
        }
        // console.log(item.ScanPulang !== null && item.StatusPulang === 0 && id !== 0)
        if(item.ScanPulang !== null && item.StatusPulang === 0 && id !== 0){
            let data = {
                ScanPulang: item.ScanPulang,
                UserID: item.UserID,
                KetPulang:item.KetPulang,
            }
            let sql =
                `CALL ProsesPulang (
                  '` + id + `',
                  '` + data.ScanPulang + `',
                  '` + data.KetPulang + `',
                  '` + req.headers.kodecabang + `'
                )`;
            const pulang = await asyncQuery(sql);
            console.log(pulang)
        }
    }))
    console.log(ids)
    
    // let strId = 0;
    // if(ids.length>0) ids.join(",")
    // let sql = `
    //     SELECT 
    //         UserID, TanggalScan, DatangID, Nama, 
    //         ScanMasuk, ScanPulang, KodeCabang, KodeCabangPulang, Keterangan, KetPulang
    //     FROM attlog
    //     WHERE DatangID IN (`+strId+`)
    // `;
    // const rows = await asyncQuery(sql);
    res.send("OK SERVER")
}

exports.pulangManual = (req, res) => {
    let parsing = {
        ScanPulang: moment.parseZone(moment()).format('HH:mm:ss'),
        UserID: req.body.UserID,
        Nama: req.body.NamaUser
    }
    let sql =
        `CALL ProsesPulang (
          '` + req.params.id + `',
          '` + parsing.ScanPulang + `',
          '` + req.body.KetPulang + `',
          '` + req.headers.kodecabang + `'
        )`;
        // res.send(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(parsing));
    });
}

exports.keluarManual = (req, res) => {
    let parsing = { KeluarKantor: moment.parseZone(moment()).format('HH:mm:ss'), UserID: req.body.UserID, Nama: req.body.NamaUser }
    let sql =
        `CALL ProsesKeluarKantor (
        '` + req.body.DatangID +`',
        '` + parsing.KeluarKantor +`',
        '` + req.body.KeteranganKeluar +`',
        '` + req.headers.kodecabang +`'
        )`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(parsing));
    });
}

exports.kembaliManual = (req, res) => {
    let parsing = { KeluarKantor: moment.parseZone(moment()).format('HH:mm:ss'), UserID: req.body.UserID, Nama: req.body.NamaUser }
    let sql =
        `CALL ProsesKembaliKantor (
        '` + req.params.id + `',
        '` + parsing.KeluarKantor + `',
        '` + req.body.KeteranganKembali + `',
        '` + req.headers.kodecabang + `'
        )`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(parsing));
    });
}

exports.istirahatManual = (req, res) => {
    let parsing = { KeluarKantor: moment.parseZone(moment()).format('HH:mm:ss'), UserID: req.body.UserID, Nama: req.body.NamaUser }
    let sql =
        `CALL ProsesIstirahatKeluar(
        '` + req.params.id + `',
        '` + parsing.KeluarKantor + `',
        '` + req.body.KetIstirahatKeluar + `'
        )`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(parsing));
    });
}

exports.istirahatKembaliManual = (req, res) => {
    let parsing = { KeluarKantor: moment.parseZone(moment()).format('HH:mm:ss'), UserID: req.body.UserID, Nama: req.body.NamaUser }
    let sql =
        `CALL ProsesIstirahatKembali (
            '` + req.params.id + `',
            '` + parsing.KeluarKantor + `',
            '` + req.body.KetIstirahatKembali + `'
        )`;
    conn.query(sql, (err, results) => {
    if (err) throw err;
        res.send(JSON.stringify(parsing));
    });
}

exports.cekUserAfterFinger = (req, res) => {
    let id = req.params.id;
    let action = req.params.action;
    let q = `CALL CekUserAfterFinger('`+id+`','`+action+`', '`+req.headers.kodecabang+`')`;
    //console.log(q);
    conn.query(q, (err, result) => {
        if (err) throw err;
        res.send(result[0][0]);
    })
}

exports.optUserMasukManual = (req, res) => {
    conn.query(`CALL optUserMasukManual('`+req.headers.kodecabang+`')`, function (err, rows) {
        if (err) throw err;
        let user = rows[0];
        res.send(user);
    });
}

exports.optUserPulangManual = (req, res) => {
    conn.query(`CALL optUserPulangManual('`+req.headers.kodecabang+`')`, function (err, rows) {
        if (err) throw err;
        let user = rows[0];
        res.send(user);
    });
}

exports.optUserKeluarManual = (req, res) => {
    conn.query(`CALL optUserKeluarManual('`+req.headers.kodecabang+`')`, function (err, rows) {
        if (err) throw err;
        let user = rows[0];
        res.send(user);
    });
}

exports.optUserKembaliManual = (req, res) => {
    conn.query(`CALL optUserKembaliManual('`+req.headers.kodecabang+`')`, function (err, rows) {
        if (err) throw err;
        let user = rows[0];
        res.send(user);
    });
}

exports.optUserIstirahatKeluarManual = (req, res) => {
    conn.query(`CALL optUserIstirahatKeluarManual('`+req.headers.kodecabang+`')`, function (err, rows) {
        if (err) throw err;
        let user = rows[0];
        res.send(user);
    });
}

exports.optUserIstirahatKembaliManual = (req, res) => {
    conn.query(`CALL optUserIstirahatKembaliManual('`+req.headers.kodecabang+`')`, function (err, rows) {
        if (err) throw err;
        let user = rows[0];
        res.send(user);
    });
}
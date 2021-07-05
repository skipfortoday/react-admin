const conn = require('../../config/database.js')
const util = require('util');
const asyncQuery = util.promisify(conn.query).bind(conn);


exports.checkBelumLengkapToday = async (req, res) => {
    let UserIDs = [];
    let result = { status:false, message:""};
    if(req.body.UserIDs.length > 0){
        let i = 0;
        await Promise.all(req.body.UserIDs.map(async (data) => {
            UserIDs.push("'"+data.UserID+"'");
            // UserIDs += "'"+data.UserID+"'";
            // if(i>0 && i<req.body.UserIDs.length) UserIDs+",";
            i++;
        }));

        let q = `SELECT UserID, Nama 
            FROM attlog WHERE UserID IN(`+UserIDs.join(",")+`) 
            AND TanggalScan = CURRENT_DATE() `;
        let checks = await asyncQuery(q);
        // console.log(q)
        let msgs = [];
        if(checks.length > 0){
            result.status = true;
            await Promise.all(checks.map(async (item, i)=>{
                msgs.push(item.UserID +" - "+item.Nama);
                // result.message += item.UserID +" - "+item.Nama;
                // if(i>0 && i<checks.length) result.message += ",";
            }));
            result.message = msgs.join(", ");
        }

    }

    // console.log(UserIDs)
    res.send(result)
}

exports.getIzin = (req, res) => {
    conn.query(`CALL MenampilkanIzin('` + req.headers.kodecabang + `')`, function (err, rows) {
        if (err) throw err;
        let izin = rows[0];
        res.send(izin);
    });
}

exports.izinSolo = (req, res) => {
    conn.query(
        `CALL MenampilkanAbsensiPerOrang(
            '` + req.params.id + `',
            '` + req.params.TglAwal + `',
            '` + req.params.TglAkhir + `'
        )`,
        function (err, rows) {
            if (err) throw err;
            let izin = rows[0];
            res.send(izin);
        }
    );
}

exports.newIzin = (req, res) => {
    let data = {
        TanggalScan: req.body.TanggalScan,
        TanggalScanSampai: req.body.TanggalScanSampai,
        UserID: req.body.UserID,
        Status: req.body.Status.value,
        Keterangan: req.body.Keterangan,
    };
    let sql =
        `CALL InputIzinPerorang (
          '` + req.body.UserID + `',
          '` + req.body.TanggalScan + `',
          '` + req.body.TanggalScanSampai + `',
          '` + req.body.Status.value + `',
          '` + req.body.Keterangan + `',
          `+ req.body.editJam + `,
          '` + req.body.Shift.value + `',
          '` + req.body.ScanMasuk + `',
          '` + req.body.ScanPulang + `'
        )`;

    conn.query(sql, (err, results) => {
        if (err) throw err;
        //console.log(JSON.stringify(results[0]));
        res.send(JSON.stringify(results[0]));
    });
}

exports.updateIzin = (req, res) => {
    let data = {
        UserID: req.body.UserID,
        TanggalScan: req.body.TanggalScan,
        TanggalScanSampai: req.body.TanggalScanSampai,
        Status: req.body.Status.value,
        Keterangan: req.body.Keterangan,

        EditJam: req.body.editJam,
        ADMIN: req.body.ADMIN,
        Shift: req.body.Shift == undefined ? null : req.body.Shift.value,
        ScanMasuk: req.body.ScanMasuk,
        ScanPulang: req.body.ScanPulang
    };

    let sql = `CALL UpdateIzinAbsensiPerOrang(
        '` + req.body.UserID + `',
        '` + req.body.TanggalScan + `',
        '` + req.body.TanggalScanSampai + `',
        '` + req.body.Status.value + `',
        '` + req.body.Keterangan + `',
        ` + req.body.editJam + `,
        '` + req.body.ADMIN + `',
        '` + data.Shift + `',
        '` + req.body.ScanMasuk + `',
        '` + req.body.ScanPulang + `'
      )`;
    //  console.log(sql)
    conn.query(
        sql,
        function (err, rows) {
            if (err) throw err;
            res.send(JSON.stringify(rows[0]));
        }
    );
}

exports.getIzinId = (req, res) => {
    conn.query(
        `CALL MenampilkanDetailIzin('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let izin = rows[0];
            let detailizin = izin[0];
            res.send(detailizin);
        }
    );
}

exports.getDetailAbsensi = (req, res) => {
    conn.query(
        `CALL MenampilkanDetailAbsensi('` + req.params.id + `')`,
        function (err, rows) {
            if (err) throw err;
            let izin = rows[0];
            let detailizin = izin[0];
            detailizin.editJam = false;
            res.send(detailizin);
        }
    );
}

exports.newIzinGroup = (req, res) => {
    let sql =
        `CALL InputIzinPergroup (
            '` + req.body.GroupID + `',
            '` + req.body.TanggalScan + `',
            '` + req.body.Status + `',
            '` + req.body.Keterangan + `'
        )`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}

exports.deleteIzin = (req, res) => {
    let sql = `DELETE FROM attlog WHERE DatangID="` + req.params.id + `"`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}
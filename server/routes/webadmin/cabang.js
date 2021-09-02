const conn = require('../../config/database.js')
const md5 = require("md5")

exports.allCabang = (req, res) => {
    let sql = "SELECT * FROM cabang";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}

exports.detailCabang = (req, res) => {
    conn.query(
        `SELECT * FROM cabang Where KodeCabang="` + req.params.id + `"`,
        function (err, rows) {
            if (err) throw err;
            let cabang = rows[0];
            res.send(cabang);
        }
    );
}

exports.newCabang = (req, res) => {
    let data = {
        KodeCabang: req.body.KodeCabang,
        NamaCabang: req.body.NamaCabang,
        Alamat: req.body.Alamat,
        NoTelp: req.body.NoTelp,
        GeneralManagerID: req.body.GeneralManagerID,
        hrdID: req.body.hrdID,
        IP: req.body.IP,
        MaxAccLupaAbsen: req.body.MaxAccLupaAbsen
    };

    if (req.body.Password != '') {
        data.Password = md5(req.body.KodeCabang.toUpperCase()+"@@"+req.body.Password);
    }

    let sql = "INSERT INTO cabang SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.editCabang = (req, res) => {
    let data = {
        KodeCabang: req.body.KodeCabang,
        NamaCabang: req.body.NamaCabang,
    };

    let sql =
        `UPDATE cabang 
        SET NamaCabang = "` + req.body.NamaCabang + `", 
            Alamat = "` + req.body.Alamat + `", 
            NoTelp = "` + req.body.NoTelp + `", 
            GeneralManagerID = "` + req.body.GeneralManagerID + `", 
            hrdID = "` + req.body.hrdID + `" ,
            IP = "` + req.body.IP + `" ,
            MaxAccLupaAbsen = "`+req.body.MaxAccLupaAbsen+`"
            `;


    if (req.body.Password != '') {
        sql += ` , Password = "` + md5(req.body.KodeCabang.toUpperCase()+"@@"+req.body.Password) + `" `;
    }
    sql += ` WHERE KodeCabang = "` + req.params.id + `"`;

    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.hapusCabang = (req, res) => {
    let sql = `DELETE FROM cabang WHERE KodeCabang = "` + req.params.id + `"`;
    // console.log(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}
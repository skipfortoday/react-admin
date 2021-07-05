const conn = require('../../config/database.js')
const moment = require("moment")
const md5 = require("md5")

exports.allAdmin = (req, res) => {
    let sql = `
    SELECT AdminID, Username, KodeCabang,  
    DATE_FORMAT(TanggalCreate, "%d-%m-%Y") as TanggalCreate 
    FROM admin 
    WHERE RoleAdmin ='1'
    AND AdminID = '`+req.user.AdminID+`' OR '`+req.user.Role+`' = '99'
    `;

    // console.log(req.user);

    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}

exports.detailAdmin = (req, res) => {
    conn.query(
        `SELECT AdminID, Username, KodeCabang,
        DATE_FORMAT(TanggalCreate, "%Y-%m-%d") as TanggalCreate 
        FROM admin Where AdminID="` + req.params.id + `"`,
        function (err, rows) {
            if (err) throw err;
            let cabang = rows[0];
            res.send(cabang);
        }
    );
}

exports.newAdmin = (req, res) => {
    let data = {
        Username: req.body.Username,
        Password: md5(req.body.Password),
        KodeCabang: req.body.KodeCabang.value,
        RoleAdmin: "1",
        TanggalCreate: moment.parseZone(moment()).format('YYYY-MM-DD'),
    };
    let sql = "INSERT INTO admin SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.editAdmin = (req, res) => {
    console.log(req.body)
    let data = {
        AdminID: req.body.AdminID,
        Username:req.body.Username,
        Password: md5(req.body.Password),
    };
    let sql =
        `UPDATE admin 
        SET Username =  "` + data.Username + `" ,
        Password="` + data.Password + `" 
        WHERE AdminID="` + req.params.id + `" 
        AND KodeCabang = "`+ req.body.KodeCabang.value + `"`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.deleteAdmin = (req, res) => {
    let sql = `DELETE FROM admin WHERE AdminID="` + req.params.id + `"`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}

exports.listPeriode = (req, res) => {
    //let sql = `SELECT * FROM periode WHERE KodeCabang = "`++`"`
    res.send("ok");
}
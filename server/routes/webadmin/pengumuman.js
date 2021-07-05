const conn = require('../../config/database.js')
const moment = require("moment")
const util = require('util');
const asyncQuery = util.promisify(conn.query).bind(conn);
const fs = require('fs')

exports.all = (req, res) => {
    let KodeCabang = req.headers.kodecabang;
    let q = `CALL listPengumuman(
            "` + KodeCabang + `",
            "`+req.query.page+`",
            "`+req.query.perpage+`",
            "`+req.query.mode+`"
        )`;
    conn.query(
        q,
        function (err, rows) {
            if (err) throw err;
            let news = rows;
            res.send(news);
            // res.send(req.user);
        }
    );
}

var multer = require('multer');
var path = require('path');
//set storage engine

const storage = multer.diskStorage({
    destination: path.join(__dirname + '/../../public/images/'),
    filename: function (req, file, cb) {
        cb(null, 'news' + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('file');

exports.save = async (req, res) => {
    upload(req, res, err => {
        if (err) throw err
        let linkGambar = req.file ? req.file.filename : null;
        let startDate = req.body.StartDate == 'undefined' || req.body.StartDate == '' ? null : '"'+req.body.StartDate+'"';
        let endDate = req.body.EndDate == 'undefined' || req.body.EndDate == '' ? null : '"'+req.body.EndDate+'"';

        if(parseInt(req.body.id) == 0){
            let q = 'INSERT INTO news(';
            q += 'KodeAuto, Judul, Isi, ';
            q += 'LinkGambar, ';
            q += 'TglPosting, UserPosting, ';
            q += 'StartDate, EndDate, ';
            q += 'Aktif, '; 
            q += 'Pinned, '; 
            q += '`Group`, '; 
            q += 'KodeCabang)';
            
            q += 'VALUE (';
            q += '"'+req.body.KodeAuto+'", "'+req.body.Judul+'", "'+req.body.Isi+'", ';
            q += '"'+linkGambar+'", ';
            q += 'NOW(), "'+req.user.Username+'", ';
            q += ' '+startDate+', '+endDate+', ';
            q += '"'+req.body.Aktif+'", ';
            q += '"'+req.body.Pinned+'", ';
            q += '"'+req.body.Group+'", ';
            q += '"'+req.body.KodeCabang+'" );';
            
            conn.query(q, (err, rows) => {
                // if (err) res.send({status:false, message:"Gagal menambahkan pengumuman"});
                // else
                if (err) throw err;
                res.send({status:true, message:"Sukses menambahkan pengumuman baru"});
            })
        }else{
            let sq = "SELECT LinkGambar FROM news WHERE id = "+req.body.id+";";
            // console.log(startDate);
            startDate = startDate =='"null"' ? null : startDate;
            endDate = endDate =='"null"' ? null : endDate;
            // console.log(startDate);
            conn.query(sq, (err, rows) => {
                if(rows.length>0){
                    let pathUrl = path.join(__dirname + '/../../public/images/');
                    if(rows[0].LinkGambar && linkGambar){
                        let savedLink = pathUrl+rows[0].LinkGambar;
                        fs.unlink(savedLink, (err) => {
                            if (err) {
                                if (err) throw err;
                            }
                            //file removed
                        });
                    }

                    let qu = 
                    'UPDATE news ';
                    qu += 'SET ';
                    qu += 'KodeAuto = "'+req.body.KodeAuto+'", ';
                    qu += 'Judul = "'+req.body.Judul+'", ';
                    qu += 'Isi = "'+req.body.Isi+'", ';
                    if(linkGambar) qu += 'LinkGambar = "'+linkGambar+'", ';
                    qu += 'TglEdit = NOW() ,';  
                    qu += 'UserEdit = "'+req.user.Username+'", ';
                    qu += 'StartDate  = '+ startDate +', ';
                    qu += 'EndDate = '+ endDate +', ';
                    qu += 'Aktif = "'+req.body.Aktif+'", ';
                    qu += 'Pinned = "'+req.body.Pinned+'", ';
                    qu += '`Group` = "'+req.body.Group+'", ';
                    qu += 'KodeCabang = "'+req.body.KodeCabang+'" ';
                    qu += 'WHERE id = '+req.body.id+';';
                    conn.query(qu, (err, rows) => {
                        if (err) throw err;
                        // if (err) res.send({status:false, message:"Gagal mengupdate pengumuman"});
                        res.send({status:true, message:"Sukses mengupdate pengumuman"});
                    })
                }else{
                    res.send({status:false, message:"Gagal mengupdate pengumuman"});
                }
            })
        }
    });
}

exports.detail = (req, res) => {
    let q = `
        SELECT * , 
        DATE_FORMAT(StartDate, "%Y-%m-%d") StartDate,
        DATE_FORMAT(EndDate, "%Y-%m-%d") EndDate,
        DATE_FORMAT(TglPosting, "%Y-%m-%d %H:%i:%s") TglPosting,
        DATE_FORMAT(TglEdit, "%Y-%m-%d %H:%i:%s") TglEdit,
        CONCAT('https://absensi.lviors.com/public/images/', LinkGambar) LinkGambar,
        IF(Aktif = 'true', true , false) Aktif,
        IF(Pinned = 'true', true , false) Pinned
        FROM news
        WHERE id = "`+ req.params.id + `"
    `;
    conn.query(
        q,
        (err, rows) => {
            if (err) throw err;
            let news = rows;
            res.send(news[0]);
        }
    )
}

exports.lsGroup = async (req, res) => {
    let q = `
    SELECT
        DISTINCT 
        GroupID value, 
        Jabatan label,
        false isChecked
    FROM tblgrupjabatan
    WHERE 
        KodeCabang = "`+ req.headers.kodecabang + `" OR "` + req.params.id + `" = 99
    `;

    const qgroup = await asyncQuery(q);
    let lsGroups = [];
    if (qgroup.length > 0) {
        lsGroups = qgroup;
        if (parseInt(req.params.detail)) {
            let q = "SELECT `Group` FROM news WHERE id = " + req.params.detail + ";";
            const rows2 = await asyncQuery(q);
            if (rows2.length > 0) {
                let groups = [];
                let strGroup = rows2[0].Group;

                if (strGroup) {
                    const regex = /-/g;
                    groups = strGroup.replace(regex, "").split(",");
                }


                await Promise.all(lsGroups.map(async (item, i) => {
                    if (groups.includes(item.value)) {
                        lsGroups[i].isChecked = 1;
                    }
                }));
            }
        }
    }
    res.send(lsGroups);
}

exports.lsCabang = async (req, res) => {
    let q = `
    SELECT 
        KodeCabang value, 
        NamaCabang label,
        false isChecked,
        IF(("`+ req.params.id + `" = 99 OR KodeCabang = "` + req.headers.kodecabang + `" ), false, true) disabled
    FROM cabang
    `;

    const rows = await asyncQuery(q);
    let lsCabang = [];
    if (rows.length > 0) {
        lsCabang = rows;
        if (parseInt(req.params.detail)) {
            let q = `
            SELECT KodeCabang
            FROM news WHERE id = "`+ req.params.detail + `"`;
            const rows2 = await asyncQuery(q);
            if (rows2.length > 0) {
                let cabangs = [];
                let strKode = rows2[0].KodeCabang;

                if (strKode) {
                    strKode = strKode + "";
                    const regex = /-/g;
                    cabangs = strKode.replace(regex, "").split(",");
                }


                await Promise.all(lsCabang.map(async (item, i) => {
                    if (cabangs.includes(item.value)) {
                        lsCabang[i].isChecked = 1;
                    }
                }));
            }

        }
    }
    res.send(lsCabang);
}
const conn = require('../../config/database.js')

exports.allGroup = (req, res) => {
    let sql = "SELECT * FROM tblgrupjabatan WHERE KodeCabang = '" + req.headers.kodecabang + "'";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}

exports.newGroup = (req, res) => {
    let data = {
        GroupID: req.body.GroupID,
        Jabatan: req.body.Jabatan,
        AdaOff: req.body.AdaOff,
        CekJamKembali: req.body.CekJamKembali,
        RuleTerlambatBertingkat: req.body.RuleTerlambatBertingkat,
        JamDatang: req.body.JamDatang,
        MaxJamDatang: req.body.MaxJamDatang,
        JamPulang: req.body.JamPulang,
        MinJamLembur: req.body.MinJamLembur,
        JamMulaiLembur: req.body.JamMulaiLembur,
        RpPotonganTerlambat: req.body.RpPotonganTerlambat,
        JamDatangSiang: req.body.JamDatangSiang,
        MaxJamDatangSiang: req.body.MaxJamDatangSiang,
        JamPulangSiang: req.body.JamPulangSiang,
        JamMulaiLemburSiang: req.body.JamMulaiLemburSiang,
        MinJamLemburSiang: req.body.MinJamLemburSiang,
        HariLibur: req.body.HariLibur,
        RpPotonganTerlambatKembali: req.body.RpPotonganTerlambatKembali,
        RpPotonganTidakMasuk: req.body.RpPotonganTidakMasuk,
        RpLemburPerJam: req.body.RpLemburPerJam,
        JamDatangSore: req.body.JamDatangSore,
        MaxJamDatangSore: req.body.MaxJamDatangSore,
        JamPulangSore: req.body.JamPulangSore,
        MinJamLemburSore: req.body.MinJamLemburSore,
        JamMulaiLemburSore: req.body.JamMulaiLemburSore,
        JamMulaiPagi: req.body.JamMulaiPagi,
        MaxJamKembali: req.body.MaxJamKembali,
        JamMulaiSiang: req.body.JamMulaiSiang,
        MaxJamKembaliSiang: req.body.MaxJamKembaliSiang,
        JamMulaiSore: req.body.JamMulaiSore,
        MaxJamKembaliSore: req.body.MaxJamKembaliSore,
    };

    let sql =
        `CALL MenambahkanGrupKaryawan (
          '` + req.body.GroupID + `',
          '` + req.body.Jabatan + `',
          '` + req.body.AdaOff + `',
          '` + req.body.CekJamKembali + `',
          '` + req.body.RuleTerlambatBertingkat + `',
          '` + req.body.JamDatang + `',
          '` + req.body.MaxJamDatang + `',
          '` + req.body.JamPulang + `',
          '` + req.body.MinJamLembur + `',
          '` + req.body.JamMulaiLembur + `',
          '` + req.body.RpPotonganTerlambat + `',
          '` + req.body.JamDatangSiang + `',
          '` + req.body.MaxJamDatangSiang + `',
          '` + req.body.JamPulangSiang + `',
          '` + req.body.JamMulaiLemburSiang + `',
          '` + req.body.MinJamLemburSiang + `',
          '` + req.body.HariLibur + `',
          '` + req.body.RpPotonganTerlambatKembali + `',
          '` + req.body.RpPotonganTidakMasuk + `',
          '` + req.body.RpLemburPerJam + `',
          '` + req.body.JamDatangSore + `',
          '` + req.body.MaxJamDatangSore + `',
          '` + req.body.JamPulangSore + `',
          '` + req.body.MinJamLemburSore + `',
          '` + req.body.JamMulaiLemburSore + `',
          '` + req.body.JamMulaiPagi + `',
          '` + req.body.MaxJamKembali + `',
          '` + req.body.JamMulaiSiang + `',
          '` + req.body.MaxJamKembaliSiang + `',
          '` + req.body.JamMulaiSore + `',
          '` + req.body.MaxJamKembaliSore + `',
          '` + req.headers.kodecabang + `'
        )`;

    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ 'results': results, 'data': data }));
    });
}

exports.editGroup = (req, res) => {
    let sql =
        `CALL EditGroupKaryawan (
        '` + req.body.GroupID + `',
        '` + req.body.Jabatan + `',
        '` + req.body.AdaOff + `',
        '` + req.body.CekJamKembali + `',
        '` + req.body.RuleTerlambatBertingkat + `',
        '` + req.body.JamDatang + `',
        '` + req.body.MaxJamDatang + `',
        '` + req.body.JamPulang + `',
        '` + req.body.MinJamLembur + `',
        '` + req.body.JamMulaiLembur + `',
        '` + req.body.RpPotonganTerlambat + `',
        '` + req.body.JamDatangSiang + `',
        '` + req.body.MaxJamDatangSiang + `',
        '` + req.body.JamPulangSiang + `',
        '` + req.body.JamMulaiLemburSiang + `',
        '` + req.body.MinJamLemburSiang + `',
        '` + req.body.HariLibur + `',
        '` + req.body.RpPotonganTerlambatKembali + `',
        '` + req.body.RpPotonganTidakMasuk + `',
        '` + req.body.RpLemburPerJam + `',
        '` + req.body.JamDatangSore + `',
        '` + req.body.MaxJamDatangSore + `',
        '` + req.body.JamPulangSore + `',
        '` + req.body.MinJamLemburSore + `',
        '` + req.body.JamMulaiLemburSore + `',
        '` + req.body.JamMulaiPagi + `',
        '` + req.body.MaxJamKembali + `',
        '` + req.body.JamMulaiSiang + `',
        '` + req.body.MaxJamKembaliSiang + `',
        '` + req.body.JamMulaiSore + `',
        '` + req.body.MaxJamKembaliSore + `',
        '` + req.headers.kodecabang + `'
    )`;

    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ 'results': results, 'data': { 'GroupID': req.body.GroupID, 'Jabatan': req.body.Jabatan } }));
    });
}


exports.detailGroup = (req, res) => {
    conn.query(
        `SELECT * FROM tblgrupjabatan WHERE GroupID="` + req.params.id + `" 
        AND KodeCabang = "`+ req.headers.kodecabang + `"`,
        function (err, rows) {
            if (err) throw err;
            let group = rows[0];
            res.send(group);
        }
    );
}

exports.deleteGroup = (req, res) => {
    let sql = `DELETE FROM tblgrupjabatan WHERE GroupID="` + req.params.id + `"`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}

exports.getTerlambatBertingkat = (req, res) => {
    conn.query(
        `SELECT * 
        FROM tblruleterlambatbertingkat 
        WHERE GroupID = "` + req.params.id + `"
        AND KodeCabang = '`+ req.headers.kodecabang + `'
        `,
        function (err, rows) {
            if (err) throw err;
            res.send(rows);
        }
    );
}

exports.getTerlambatBertingkat2 = (req, res) => {
    conn.query(
        `SELECT * 
        FROM tblruleterlambatbertingkat 
        WHERE RuleTerlambatBertingkatID = "` + req.params.id + `"`,
        function (err, rows) {
            if (err) throw err;
            detail = rows[0];
            res.send(detail);
        }
    );
}

exports.salinTerlambatBertingkat = (req, res) => {
    let data = {
        GroupID: req.body.GroupID,
        RuleID: req.body.RuleID
    };

    let cGroupID = data.RuleID[0].GroupID;
    var arrValues = [];
    var arrGroups = [];
    data.GroupID.map(function (item) {
        if (item.value !== cGroupID) {
            data.RuleID.map(function (rule) {
                let GroupID = item.value;
                let Shift = rule.Shift;
                let MaxJamDatang = rule.MaxJamDatang;
                let RpPotonganTerlambat = rule.RpPotonganTerlambat;
                let str = "('" + GroupID + "','" + Shift + "','" + MaxJamDatang + "','" + RpPotonganTerlambat + "','" + req.headers.kodecabang + "')";
                arrValues.push(str);
            });
            arrGroups.push(item.value);

        }
    });
    let joinArrGroup = arrGroups.join("','");
    let qdel = "DELETE FROM tblruleterlambatbertingkat WHERE GroupID IN('" + joinArrGroup + "');";

    let qinsert = "INSERT INTO tblruleterlambatbertingkat(GroupID,Shift,MaxJamDatang, RpPotonganTerlambat, KodeCabang) VALUES " + arrValues.join() + ";";
    conn.query(qdel, (err, results) => {
        if (err) throw err;
        conn.query(qinsert, (err, results) => {
            if (err) throw err;
            res.send(true);
        });
    });
}

exports.newTerlambatBertingkat = (req, res) => {
    let data = {
        GroupID: req.body.GroupID,
        Shift: req.body.Shift,
        MaxJamDatang: req.body.MaxJamDatang,
        RpPotonganTerlambat: req.body.RpPotonganTerlambat,
        KodeCabang:req.headers.kodecabang
    };
    let sql = "INSERT INTO tblruleterlambatbertingkat SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.editTerlambatBertingkat = (req, res) => {
    let data = {
        GroupID: req.body.GroupID,
        Shift: req.body.Shift,
        MaxJamDatang: req.body.MaxJamDatang,
        RpPotonganTerlambat: req.body.RpPotonganTerlambat,
    };
    let sql =
        `UPDATE tblruleterlambatbertingkat 
        SET 
            MaxJamDatang = "` + req.body.MaxJamDatang + `", 
            RpPotonganTerlambat = "` + req.body.RpPotonganTerlambat +`" 
        WHERE 
            RuleTerlambatBertingkatID="` + req.params.id + `"`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
}

exports.hapusTerlambatBertingkat = (req, res) => {
    let sql = `DELETE FROM tblruleterlambatbertingkat WHERE RuleTerlambatBertingkatID="` + req.params.id + `"`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
}
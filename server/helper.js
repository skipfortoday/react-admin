const formatTglYmd = (tgl) => {
    const td = new Date(tgl);
    let
        Y = td.getFullYear(),
        m = td.getMonth() + 1, // getMonth() dimulai dari 0, 
        d = td.getDate();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;

    const Ymd = Y + "-" + m + "-" + d;
    return Ymd;
}

function addOneYear(tgl) {
    if(tgl == undefined) return null;
    
    var d = new Date(tgl);
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var newTgl = new Date(year + 1, month, day);

    return formatTglYmd(newTgl);
}

exports.formatTglYmd = formatTglYmd;
exports.addOneYear = addOneYear;
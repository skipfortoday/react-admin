import React from 'react'

export const formatTglYmd = (tgl) => {
    const td = new Date(tgl);
    let 
        Y = td.getFullYear(),
        m = td.getMonth()+1, // getMonth() dimulai dari 0, 
        d = td.getDate();
    if(m < 10) m = "0"+m;
    if(d < 10) d = "0"+d;
    
    const Ymd = Y+"-"+m+"-"+d;
    return Ymd;
}

export const formatTglYmdHis = (tgl) => {
    
}
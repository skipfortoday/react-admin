import { GET_LIST_HISTORY, SET_FILTER_HISTORY, DEL_LIST_HISTORY } from '../actions/historyAction';

const formatTgl =(td) =>{
    var Y = td.getFullYear(),
        m = td.getMonth(),
        d = td.getDate();
        // H = td.getHours(),
        // i = td.getMinutes(),
        // s = td.getSeconds();

    if(m < 10) m+=1;
    if(m < 10) m = "0"+m;
    if(d < 10) d = "0"+d;

    return  Y+"-"+m+"-"+d;
}

let initialState = {
    getListHistory: false,
    errorListHistory: false,

    defNama: {
        value: 'all',
        label: 'Semua Karyawan'
    },
    defTglAwal: formatTgl(new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()-30
    )),
    defTglAkhir: formatTgl(new Date()),

};


const History = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_HISTORY:
            return {
                ...state,
                getListHistory: action.payload.data,
                errorListHistory: action.payload.errorMessage,
            };

        case SET_FILTER_HISTORY:
            return {
                ...state,
                defNama: action.payload.Nama,
                defTglAwal: action.payload.TglAwal,
                defTglAkhir: action.payload.TglAkhir,
            };

        case DEL_LIST_HISTORY:
            return {
                ...state,
                getListHistory: action.payload.data,
                errorListHistory: action.payload.errorMessage,
            }

        default:
            return state;
    }
}

export default History;
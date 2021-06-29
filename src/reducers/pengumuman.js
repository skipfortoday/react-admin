import { GET_DETAIL_PENGUMUMAN, GET_LIST_PENGUMUMAN, LIST_CB_CABANG, LIST_CB_GROUP, SAVE_PENGUMUMAN } from '../actions/pengumumanAction';
import { formatTglYmd } from '../containers/formatTgl';


let initialState = {
    getListPengumuman:false,
    errorGetListPengumuman:false,
    filterPengumuman:false,
    listCbCabang:false,
    listCbGroup:false,
    getDetailPengumuman:false,
    errorGetDetailPengumuman:false,

    resSavePengumuman:false,
    errrorResSavePengumuman:false,
    isLoading:true
}

const Pengumuman = (state = initialState, action) => {
    switch (action.type) {
        
        case SAVE_PENGUMUMAN:
            return {
                ...state,
                resSavePengumuman: action.payload.data,
                errrorResSavePengumuman: action.payload.errorMessage,
            };

        case GET_DETAIL_PENGUMUMAN:
            return {
                ...state,
                getDetailPengumuman: action.payload.data,
                errorGetDetailPengumuman: action.payload.errorMessage,
                isLoading:false
            };
        
        
        case LIST_CB_GROUP:
            return {
                ...state,
                listCbGroup: action.payload.data,
            };
        
        case LIST_CB_CABANG:
            return {
                ...state,
                listCbCabang: action.payload.data,
            };

        case GET_LIST_PENGUMUMAN:
            console.log(action.payload)
            if(action.payload.data == false){
                return {
                    ...state,
                    isLoading:false    
                }
            }

            return {
                ...state,
                getListPengumuman: action.payload.data[0],
                filterPengumuman: action.payload.data[1][0],
                errorGetListPengumuman: action.payload.errorMessage,
                isLoading:false
            };


        default:
            return state;
    }
}

export default Pengumuman;
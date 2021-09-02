import { SET_OFFLINE_MODE } from "../actions/globalAction";

let initialState = {
    offlineMode : false,
}

const Globals = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case SET_OFFLINE_MODE:
            return {
                ...state,
                offlineMode: action.payload.offlineMode,
            }
            default:
                return state;
        }
    }
    
export default Globals;
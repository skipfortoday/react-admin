import { combineReducers } from 'redux'
import users from './users'
import Group from './group'
import Izin from './izin'
import Laporan from './laporan'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    Laporan, Izin, Group, users, 
    form: formReducer
})
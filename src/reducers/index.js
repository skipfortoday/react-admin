import { combineReducers } from 'redux'
import users from './users'
import Group from './group'
import Izin from './izin'
import Laporan from './laporan'
import Cabang from './cabang.js'
import Opt from './opt.js'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    Cabang,Laporan, Izin, Group, users, Opt,
    form: formReducer
})
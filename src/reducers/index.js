import { combineReducers } from 'redux'
import users from './users'
import Group from './group'
import Izin from './izin'
import Laporan from './laporan'
import Cabang from './cabang.js'
import TerlambatBertingkat from './terlambatbertingkat.js'
import Opt from './opt.js'
import Admin from './admin.js'
import Manual from './manual.js'
import Login from './login.js'
import History from './history.js'
import Pengumuman from './pengumuman.js'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    Cabang,Laporan, Izin, Group, users, Opt, Login,Admin,TerlambatBertingkat,Manual,History,Pengumuman,
    form: formReducer
})
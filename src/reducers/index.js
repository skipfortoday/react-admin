import { combineReducers } from 'redux'
import users from './users'
import Group from './group'
import Izin from './izin'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    Izin, Group, users, 
    form: formReducer
})
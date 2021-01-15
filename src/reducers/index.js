import { combineReducers } from 'redux'
import users from './users'
import Group from './group'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    Group, users, 
    form: formReducer
})
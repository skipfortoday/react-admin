import { combineReducers } from 'redux'
import users from './users'
import JamKerja from './JamKerja'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    users,JamKerja,
    form: formReducer
})
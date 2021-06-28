import UserReducer from './User'
import SettingsReducer from './Settings'
import message from './Message'
import { combineReducers } from 'redux'


export default combineReducers({user:UserReducer,settings:SettingsReducer,Message:message})
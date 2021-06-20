// import { combineReducers } from "redux";
import Type from 'src/ReduxStore/bin/CONSTANT'
const defaultState={
    loggedIn:false,
    uid:null,
    displayName:null,
    profileImage:null,
    fullName:null
}

const user=(state=defaultState,action)=>{
    if ( action.type===Type.logInUser){
        return {...state,...action.payload}
    }
    if ( action.type===Type.logOutUser){
        return {...defaultState}
    }
    return state
}



export default user
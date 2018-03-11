import { combineReducers } from 'redux';
import {RECEIVE_USERDATA, RECEIVE_USERINFO} from '../actions';

function userInfo(state = [], action){
  switch(action.type){
    case RECEIVE_USERINFO:
      return action.userInfo;
    default:
      return state;
  }
}

const rootReducer = combineReducers({userInfo});

export default rootReducer;

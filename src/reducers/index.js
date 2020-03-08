import {combineReducers} from 'redux';
import SchedulesReducer from './schedulesReducer';

export default combineReducers({
  schedules: SchedulesReducer
});
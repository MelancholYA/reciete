import { combineReducers } from 'redux';
import meals from './meals';
import orders from './orders';

export default combineReducers({
	meals,
	orders,
});

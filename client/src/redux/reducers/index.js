import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import  dashboardReducer  from './dashboardReducer';
import  userReducer  from './userReducer';
import { reducer as reduxFormReducer } from 'redux-form';




export default combineReducers({
  routing: routerReducer,
  dashboardReducer, 
  userReducer,
  form: reduxFormReducer
})

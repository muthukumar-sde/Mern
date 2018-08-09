import RC from '../constants';

const initialState = {
    users: [],
    getUser:'',
    message : ''
  }

  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case RC.ADD_USER:
        return {
          ...state,
          status: action.status, 
          isAlert : action.isAlert,       
          message: action.result,
          
        }
      case RC.EDIT_USER:
        return {
          ...state,
          status: action.status,
          isAlert: action.isAlert, 
          message: action.result,
        }
        case RC.DELETE_USER:
        return {
          ...state,
          status: action.status, 
          isAlert : action.isAlert,       
          message: action.result,
        }
      case RC.USERS_LIST:
        return {
          ...state,
          status: action.status,
          users: action.result,
          count: action.count,
        }
      case RC.FETCH_ONE_USER:
        return {
          ...state,
          status: action.status,
          getUser: action.result,
        }
      case RC.LOGIN:
        return {
          ...state,
          status: action.status,
          authenticated: action.result
        }
      case RC.LOGOUT:
        return {
          ...state,
          status: action.status,
          authenticated: action.result
        }
      case RC.CHECK_EMAIL_EXIST:
        return {
          ...state,
          status: action.status,
          message: action.result
        }
      default:
        return state
      }
  }
  
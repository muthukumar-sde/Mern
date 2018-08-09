import RC from '../constants';

const initialState = {
    dashboard: [],
  }

  export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
      case RC.DASHBOARD:
        return {
          ...state,
          status: action.status,
          dashboard: action.result
        }
      default:
        return state
      }
  }
# Usage with React and Reduc
Mern Stack 
We will use React to build our simple todo app.

## Installing React Redux

```
npm install --save react-redux react-router-redux redux-thunk axios

## React Redux connection 
#### `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
    
registerServiceWorker();
```

#### `src/store.js`

```js
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './redux/reducers';

export const history = createHistory();
const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
  ];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );
  
const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );
  
export default store;
```

#### `src/redux/config.js`

```js
const config ={
    serverUrl : 'http://localhost:8080'
}

export default config;
```

#### `src/redux/constants.js`

```js
const constants ={
    DASHBOARD : 'DASHBOARD',
}

export default constants;
```

#### `src/redux/actions/dashboardAction.js`

```js
import RC from '../constants';
import config from '../config';
import axios from 'axios';
const PORT = config.serverUrl;

export function dashboardStatus(status, result='', error){  
    return {
        type : RC.DASHBOARD,
        status,
        result,
        error
    }
}

export const  dashboard =  (wel)=>{
    return (dispatch)=>{
        dispatch(dashboardStatus("LOADING"));      
        axios({  
            method: 'GET',
            url: `${PORT}/api/dashboard`,
            headers: {
                'Content-Type': 'application/json'
              }
          })
        .then((response)=> {
           dispatch(dashboardStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }

}
```

#### `src/redux/reducers/index.js`

```js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import  dashboardReducer  from './dashboardReducer';


export default combineReducers({
  routing: routerReducer,
  dashboardReducer
})
```

#### `src/redux/reducers/dashboardReducer.js`

```js
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
```

#### `src/views/Dashboard/Dashboard.js`

```js
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { dashboard } from '../../redux/actions/dashboardAction';


const mapStateToProps = (state) => {
  return {
    dashboardResult: state.dashboardReducer.dashboard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    dashboard: (wel)=>{
      dispatch(dashboard(wel))
    },
  } 
}

const Dashboard = class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      welcome : ''
    }
  }
  componentDidMount(){
    this.props.dashboard('Welcome');
  }
  componentWillReceiveProps(nextprops){ 
    this.setState({
      welcome: nextprops.dashboardResult
    })
  }

  render() {
    return (      
        <div className="container-fluid" style={{height:'750px'}}>
            <h1>{this.state.welcome} </h1>   
        </div>    
      )
  }
}

const DashboardConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardConnected
```

#### `src/App.js`

```js
import React, { Component } from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated : false
    }   
  }

  render() {
    return (
      <div>
            <BrowserRouter>
              <Switch>    
                <Route path="/" component={Dashboard} /> 
              </Switch>
            </BrowserRouter>
      </div>
    );
  }
}

export default App;
```

Read the [complete source code for this tutorial](ExampleTodoList.md) to better internalize the knowledge you have gained. Then, head straight to the [advanced tutorial](../advanced/README.md) to learn how to handle network requests and routing!

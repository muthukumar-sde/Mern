import React, { Component } from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import Full from './containers/Full';
import Login from './views/Login/Login';  

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated : false
    }
    this._localAuthentication = this._localAuthentication.bind(this);   
  }

  _localAuthentication(token) {
    if(token){
     this.setState({isAuthenticated : true}) 
    }
  }

  componentDidMount(){
    if(localStorage.getItem('id_token')){   
      this.setState({isAuthenticated: true})
    }
  }

  render() {
    return (
      <div>
        {
          !this.state.isAuthenticated ? (
            <Login _localAuthentication={this._localAuthentication} ></Login>
          ):(
            <BrowserRouter>
              <Switch>    
                <Route path="/" component={Full} /> 
              </Switch>
            </BrowserRouter>
          )
        }
      </div>
    );
  }
}

export default App;

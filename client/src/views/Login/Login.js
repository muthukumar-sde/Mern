import React, { Component } from 'react';
import {connect} from 'react-redux';
import { login } from '../../redux/actions/userAction'  

const mapStateToProps = (state) => {
  return {
    authenticated: state.userReducer.authenticated  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    login: (username,password)=>{
      dispatch(login(username,password))
    }
  } 
}

class Login extends Component {     
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg : ''
    } 
  }

  handleSubmit(e) {   
    console.log("2")
    e.preventDefault();    
    var filter =  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(this.state.username === ""){
      this.setState({errorMsg: "Please enter email address"})
    }else if (!filter.test(this.state.username)) {   
      this.setState({errorMsg: "Please provide a valid email address"})   
    }else{
      this.props.login(this.state.username, this.state.password) 
    } 
      
  }

  componentWillReceiveProps(newprops){
    console.log("1")
    console.log(newprops.authenticated) 
    if(newprops.authenticated.success){
      localStorage.setItem('id_token', newprops.authenticated.token)
      this.props._localAuthentication(true, newprops.authenticated)
    }else{
      this.setState({errorMsg: newprops.authenticated.message}) 
    }
  }

  render() {  
    return ( 
      <div id="loginbox" >  	  
        <form id="loginform"  onSubmit={this.handleSubmit.bind(this)} className="form-vertical" style={{marginTop:'35%'}}>
            <div className="control-group normal_text">
              <h3><img src="assets/img/logo.png" alt="Logo" /></h3>
            </div>
            { this.state.errorMsg ? <div className="error center">{this.state.errorMsg}</div> : null }
            <div className="control-group">
              <div className="controls">
                  <div className="main_input_box">
                    <span className="add-on bg_lg"><i className="icon-user"> </i></span>                    
                    <input type="text"
                      value={this.state.username}
                      onChange={(e) => {
                        this.setState({username: e.target.value})
                      }}
                      name="username"
                      className="form-control" placeholder="Username"/>
                  </div>
              </div>
            </div>
            <div className="control-group">
              <div className="controls">
                  <div className="main_input_box">
                    <span className="add-on bg_ly"><i  className="icon-lock"></i></span>                    
                    <input type="password"
                      name="password"
                      value={this.state.password}   
                      onChange={(e) => {
                        this.setState({password: e.target.value})
                      }}
                      className="form-control" placeholder="Password"/>
                  </div>
              </div>
            </div>
            <div className="form-actions">            
              <span className="pull-right">
              <button type="submit" className="btn btn-success" >Login</button>
              </span>
              
            </div>
        </form>      
      </div>
    );
  }
}


const LoginConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginConnected
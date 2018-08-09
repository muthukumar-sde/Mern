import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import _ from 'lodash';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Dashboard from '../views/Dashboard/Dashboard';
import Members from '../views/Members/Members';
import Users from '../views/Users/Users';
import AddMembers from '../views/Members/AddMembers';
class Full extends Component {
  render() {   
     let crtPath = this.props.location.pathname; 
    var breadcrumb = [];
    var crtsplit  = crtPath.split("/"); 
    var pathSet='';
     crtsplit.map((bread, i)=>{ 
       if(i==0){pathSet = pathSet + bread;}
       else{
        pathSet = pathSet +'/'+ bread;
       }
       var capsletter = bread.split(/(?=[A-Z])/).join(" ");  
      var lable = capsletter.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      breadcrumb.push({'path': pathSet, 'lable': lable})
  })
    return (
      <div className="app">     
        <Header />
        <Sidebar />
        <div id="content" style={{height: '800px'}}>        
        <div id="content-header">
          <div id="breadcrumb"> 
            {
            breadcrumb.map((bread, i)=>{   
            return(<Link 
              to={bread.path}
              key={i}
              title={i===0?"Go to Home":"Go to "+bread.lable}
              className="tip-bottom">{i===0?<i className="icon-home"></i>:null}
              {i===0?'Home':bread.lable}
              </Link>)  
            })
            }            
          </div>
        </div>
          <main>
            <Switch>   
              <Route exact path="/dashboard" component={Dashboard} />    
              <Route exact path="/members" component={Members} /> 
              <Route exact path="/members/addMembers" component={AddMembers} /> 
              <Route exact path="/users" component={Users} /> 
              <Redirect from="/" to="/dashboard"/>    
            </Switch> 
          </main>
          </div> 
        <Footer />      
      </div>
    );
  }
}

export default Full;

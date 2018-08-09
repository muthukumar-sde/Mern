import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  
  render() {  
    return (
      <div id="sidebar"><a href="" className="visible-phone"><i className="icon icon-home"></i></a>
        <ul>
          <li><NavLink to="/dashboard"><i className="icon icon-home"></i> <span>Dashboard</span></NavLink> </li>
          <li><NavLink to="/members"><i className="icon icon-group"></i> <span>Members</span></NavLink> </li>  
          <li><NavLink to="/users"><i className="icon icon-group"></i> <span>Uses</span></NavLink> </li>  
        
        </ul>
      </div>   
    )
  }
}

export default Sidebar;

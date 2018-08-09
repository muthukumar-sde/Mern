import React, { Component } from 'react';
import {connect} from 'react-redux';
import { logout } from '../redux/actions/userAction' 

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch)=>{
  return {
    logout(){
      dispatch(logout())
    }
  }
}
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <header>
       <div id="header">
       <h1><a href="/">Velan MERN</a></h1>
        </div>
        <div id="user-nav" className="navbar navbar-inverse">
          <ul className="nav">
            {/* <li className="dropdown" id="profile-messages" ><a title="" href="" data-toggle="dropdown" data-target="#profile-messages" className="dropdown-toggle"><i className="icon icon-user"></i>  <span className="text">Welcome User</span><b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li><a href=""><i className="icon-user"></i> My Profile</a></li>
                <li className="divider"></li>
                <li><a href=""><i className="icon-check"></i> My Tasks</a></li>
                <li className="divider"></li>
                <li><a href="login.html"><i className="icon-key"></i> Log Out</a></li>
              </ul>
            </li>
            <li className="dropdown" id="menu-messages"><a href="" data-toggle="dropdown" data-target="#menu-messages" className="dropdown-toggle"><i className="icon icon-envelope"></i> <span className="text">Messages</span> <span className="label label-important">5</span> <b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li><a className="sAdd" title="" href=""><i className="icon-plus"></i> new message</a></li>
                <li className="divider"></li>
                <li><a className="sInbox" title="" href=""><i className="icon-envelope"></i> inbox</a></li>
                <li className="divider"></li>
                <li><a className="sOutbox" title="" href=""><i className="icon-arrow-up"></i> outbox</a></li>
                <li className="divider"></li>
                <li><a className="sTrash" title="" href=""><i className="icon-trash"></i> trash</a></li>
              </ul>
            </li> */}
            {/* <li className=""><a title="" href=""><i className="icon icon-cog"></i> <span className="text">Settings</span></a></li> */}
            <li className=""><a title="" href=""  onClick={()=>{
                      this.props.logout()
                      setTimeout(() => {
                        window.location.reload();
                      }, 100)                 
                    }}><i className="icon icon-share-alt"></i> <span className="text">Logout</span></a></li>
          </ul>
        </div>
        {/* <div id="search">
          <input type="text" placeholder="Search here..." />
          <button type="submit" className="tip-bottom" title="Search"><i className="icon-search icon-white"></i></button>
        </div> */}      
      </header>
    )
  }
}

const HeaderConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderConnected

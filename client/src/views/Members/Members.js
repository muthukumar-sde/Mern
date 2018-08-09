import React, { Component } from 'react';
import { Link } from 'react-router-dom';  

class Members extends Component {
  render() {
    return (     
        <div className="container-fluid">
         <div className="row-fluid">
          <div className="span12">
          <div className="widget-box">
              <div className="widget-title"> <span className="icon"><i className="icon-th"></i></span>
                <h5>Members Details</h5>
                <div className="pull-right pad-top"><Link to={'/members/addMembers'} className="btn btn-primary">Add Member</Link></div>
              </div>
              <div className="widget-content nopadding">
              Members Details
              </div>
            </div>
          </div>
         </div> 
        </div>     
      )
  }
}

export default Members;

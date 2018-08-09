import React, { Component } from 'react';
import {connect} from 'react-redux';
import { dashboard } from '../../redux/actions/dashboardAction'


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
    // console.log(nextprops.dashboardResult)
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

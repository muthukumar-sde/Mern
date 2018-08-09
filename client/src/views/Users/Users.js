import React, { Component } from 'react';
import Pusher from 'pusher-js';
import Adduser from './AddUser';
import EditUser from './EditUser';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
import { addUser, editUser, usersList, fetchOneUser, deleteUser } from '../../redux/actions/userAction'  
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
var pusher = new Pusher('325385c3016e317bfa77', {
  cluster: 'ap2',
  encrypted: true
});



const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,  
    count: state.userReducer.count, 
    getUser: state.userReducer.getUser,
    isAlert : state.userReducer.isAlert,
    message : state.userReducer.message      
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    addUser: (formData)=>{
      dispatch(addUser(formData))
    },
    editUser: (formData)=>{
      dispatch(editUser(formData))
    },
    resetForm: (formName)=>{
      dispatch(reset(formName))
    },
    usersList : (filters)=>{   
      dispatch(usersList(filters))
    },
    fetchOneUser : (userId)=>{   
      dispatch(fetchOneUser(userId))
    },
    deleteUser : (userId)=>{   
      dispatch(deleteUser(userId))
    }
  } 
}

const Users = class Users extends Component {

  constructor(props){
    super(props)
    this.state = {
      users : [],
      totalUsers : 0,
      pages : null,
      loading : false,
      pageSize : 5,
      editUser : {},
      editAccess : false,    
    }

   
    this._addUserSubmit  = this._addUserSubmit.bind(this);
    this._editUserSubmit  = this._editUserSubmit.bind(this);
    this.editUsers  = this.editUsers.bind(this);
    this.deleteUsers  = this.deleteUsers.bind(this);
    this._fetchData  = this._fetchData.bind(this);
    this._alertSuccess  = this._alertSuccess.bind(this);
  }

  _addUserSubmit(formData){
    console.log('values',formData)
    this.setState({loading: true}) 
    this.props.addUser(formData)

  }

  _alertSuccess(message){
    Alert.success(message, {
      position: 'top-right',
      effect: 'genie',
    });
  }
  _checkSuccess(){
    alert('fdfdf')
  }
  _editUserSubmit(formData){
    console.log('editvalues',formData)
     this.setState({loading: true}) 
     this.props.editUser(formData)

  }

  _fetchData(state, instance) {     
    this.setState({loading: true, pageSize : state.pageSize}) 
    this.props.usersList({
        page: state.page,
        pageSize: state.pageSize,
        sorted: state.sorted,
        filtered: state.filtered
      });
  }
  componentDidMount(){
    var channel = pusher.subscribe('user-channel');
    channel.bind('user-event', (data) => {      
      Alert.success(data.message, {
        position: 'top-right',
        effect: 'genie',
      });
      this.props.usersList();      
    });
  }
  componentWillReceiveProps(nextProps){    
    if(nextProps.users){ 
      this.setState({
        users : nextProps.users,
        totalUsers: nextProps.count
      },()=>{       
        var pages =  Math.ceil(this.state.totalUsers/this.state.pageSize)
        this.setState({
          pages : pages,
          loading : false 
        })              
        this.props.resetForm('addUserForm')        
      })
    }
    if(this.props.getUser !== nextProps.getUser){
      this.setState({editAccess : true},()=>{
        this.setState({        
          editUser : nextProps.getUser
        })
      })
    }   
  
    if((this.props.isAlert !== nextProps.isAlert)&&(nextProps.message.message)){ 
      console.log(nextProps.message.message)
      console.log(this.props)
      console.log(this.state)
      this.setState({editAccess : false},()=>{this._alertSuccess(nextProps.message.message)})
    }   
  }
  editUsers(userId){    
    this.props.fetchOneUser(userId);
  }

  deleteUsers(userId){
    this.props.deleteUser(userId);
  }

  render() {
    var columns = [{
      Header: 'Full Name',
      accessor: 'fullName', 
      filterable : true
    },
    {
      Header: 'Email',
      accessor: 'email',
      filterable : true
    },
    {
      Header: 'Company',
      accessor: 'companyInfo', 
      filterable : true
    },{
      Header: 'Actions',
      accessor: '',
      sortable: false,
      Cell: props => (
        <div>       
        <button type="button"  className="btn btn-primary btn-mini"
         onClick={()=>{
          this.editUsers(props.original._id)
        }}>Edit</button>
        |
        <button type="button"  className="btn btn-danger btn-mini"
         onClick={()=>{
          this.deleteUsers(props.original._id)
        }}>Delete</button>
        </div>
      ),
      Footer: (
        <span>
          <strong>Total Users : {this.state.totalUsers}</strong>
        </span>
      )
      
    }]

    return (      
        <div className="container-fluid">
         <div className="row-fluid">
          <div className="span6">
            <div className="widget-box">
                <div className="widget-title"> <span className="icon"><i className="icon-th"></i></span>
                  <h5>{!this.state.editAccess ? 'Add' : 'Edit'} User</h5>                 
                </div>
                <div className="widget-content nopadding">
                {!this.state.editAccess ? (
                <Adduser onSubmit={this._addUserSubmit}></Adduser>
                ):(
                <EditUser onSubmit={this._editUserSubmit} editUser={this.state.editUser}></EditUser>
                )}
                </div>
              </div>
          </div>
          <div className="span6">
            <div className="widget-box">
                <div className="widget-title"> <span className="icon"><i className="icon-th"></i></span>
                  <h5>User list</h5>
                </div>
                <div className="widget-content nopadding">             
                  <ReactTable
                    defaultPageSize ={this.state.pageSize}
                    data={this.state.users}
                    columns={columns}                    
                    className="-striped -highlight" 
                    onFetchData={this._fetchData} 
                    pages={this.state.pages}  
                    loading={this.state.loading} 
                    pageSizeOptions= {[5, 10]}                  
                    minRows = {3} 
                    manual   
                    defaultFiltered= {this.state.filtered}
                  />
                </div>
              </div>
          </div>
         </div>
         <Alert stack={{limit: 1}} timeout={2000} />     
        </div> 
      )
  }
}


const UsersConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)

export default UsersConnected
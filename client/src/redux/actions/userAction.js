import { push } from 'react-router-redux'
import RC from '../constants';
import config from '../config';
import axios from 'axios';
const PORT = config.serverUrl;
export function getAuthToken() {
    if(localStorage.getItem('id_token')) {
     return localStorage.getItem('id_token')
    } else {
     return '';
    }
}


export function loginStatus(status, result='', error){  
    return {
        type : RC.LOGIN,
        status,
        result,
        error
    }
}
export const  login =  (username, password)=>{
    // console.log(username, password)   
    return (dispatch)=>{
        dispatch(loginStatus("LOADING"));     
        axios({  
            method: 'post',
            url: `${PORT}/api/users/login`,
            headers: {
                'Content-Type': 'application/json'
              },
            data: {username, password}
          })
        .then((response)=> {          
         dispatch(loginStatus("SUCCESS", response.data))
               
        })
        .catch((error)=> {
          console.log(error.response);
        });
    }
}

export function logoutStatus(status, result, error) {
    return {
      type: RC.LOGOUT,
      status,
      result,
      error
    }
  }
  
  export const logout = ()=>{   
    return (dispatch)=>{
      dispatch(logoutStatus("LOADING", null))
      localStorage.removeItem('id_token')
      dispatch(logoutStatus("SUCCESS", null))
      dispatch(push(`/`))
    }
  }


export function addUserStatus(status, isAlert, result='', error){  
    return {
        type : RC.ADD_USER,
        status,
        isAlert,
        result,
        error
    }
}


export const  addUser =  (formData)=>{
    console.log(formData)   
    return (dispatch)=>{
        dispatch(addUserStatus("LOADING"));     
        axios({  
            method: 'post',
            url: `${PORT}/api/users/addUser`,
            headers: {
                'Content-Type': 'application/json'
              },
            data: formData
          })
        .then((response)=> {
            console.log(response.data);            
        dispatch(addUserStatus("SUCCESS",true, response.data))
        dispatch(usersList());    
        })
        .catch((error)=> {
        console.log(error);
        });
    }
}

export function editUserStatus(status, isAlert, result='', error){  
    return {
        type : RC.EDIT_USER,
        status,
        isAlert,
        result,        
        error
    }
}


export const  editUser =  (formData)=>{
    console.log(formData)   
    return (dispatch)=>{
        dispatch(editUserStatus("LOADING"));     
        axios({  
            method: 'post',
            url: `${PORT}/api/users/editUser`,
            headers: {
                'Content-Type': 'application/json'
              },
            data: formData
          })
        .then((response)=> {
            console.log(response.data);            
        dispatch(editUserStatus("SUCCESS", true, response.data))
        dispatch(usersList());    
        })
        .catch((error)=> {
        console.log(error);
        });
    }
}

export function deleteUserStatus(status,  isAlert, result='', error){  
    return {
        type : RC.DELETE_USER,
        status,
        isAlert,
        result,        
        error
    }
}


export const  deleteUser =  (userId)=>{   
    return (dispatch)=>{
        dispatch(deleteUserStatus("LOADING"));     
        axios({  
            method: 'DELETE',
            url: `${PORT}/api/users/deleteUser/${userId}`,
            headers: {
                'Content-Type': 'application/json'
              }
           })
        .then((response)=> {            
        dispatch(deleteUserStatus("SUCCESS", true, response.data))
        dispatch(usersList());    
        })
        .catch((error)=> {
        console.log(error);
        });
    }
}

export function usersListStatus(status, result='', count, error){  
    return {
        type : RC.USERS_LIST,
        status,
        result,
        count,
        error
    }
}
export const  usersList = (filters)=>{  
    return (dispatch)=>{
        dispatch(usersListStatus("LOADING"));     
        axios({  
            method: 'POST',
            url: `/api/users`,
            data: filters,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  getAuthToken()
              }
          })
        .then((response)=> {       
        dispatch(usersListStatus("SUCCESS", response.data.users, response.data.count))
        })
        .catch((error)=> {
        console.log(error);
        });
    }
}

export function fetchOneUserStatus(status, result='', error){  
    return {
        type : RC.FETCH_ONE_USER,
        status,
        result,
        error
    }
}
export const  fetchOneUser = (userId)=>{
    return (dispatch)=>{
        dispatch(fetchOneUserStatus("LOADING"));     
        axios({  
            method: 'GET',
            url: `/api/users/fetchOneUser/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  getAuthToken()
              }
          })
        .then((response)=> {           
           dispatch(fetchOneUserStatus("SUCCESS", response.data))
        })
        .catch((error)=> {
          console.log(error);
        });
    }
}

export function checkEmailExistsStatus(status, result='', count, error){  
    return {
        type : RC.CHECK_EMAIL_EXIST,
        status,
        result,
        error
    }
}
export const  checkEmailExists = (email)=>{  
    console.log(email) 
    return (dispatch)=>{
        dispatch(checkEmailExistsStatus("LOADING"));     
        axios({  
            method: 'GET',
            url: `/api/users/userByEmail`,
            params: email,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  getAuthToken()
              }
          })
        .then((response)=> {  
            console.log(response)     
            return Promise.resolve()
            // return response
            // setTimeout(() => {
            //     return Promise.resolve(response)
            //   }, 1000)
        })     
    }
}
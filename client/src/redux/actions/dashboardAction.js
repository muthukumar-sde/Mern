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
                'Content-Type': 'application/json',
                'Authorization':  getAuthToken()
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
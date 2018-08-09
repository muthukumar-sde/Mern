import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// import _ from 'lodash';

//Input render
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="control-group">
    <label className="control-label">{label} :</label>
    <div className="controls  controls-row">
      <input {...input} placeholder={label} type={type} className="span8"/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

//form Validations
const required = value => value ? undefined : 'Required'
const emptySpace = (value) =>{
  if(value.trim() === ""){
    return 'Empty space not allowed!';    
  }
  else if(value && /[ ]{2,}/.test(value)){
    return "Field cannot contain more then one space";
  }
} 
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

const asyncValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/users/userByEmail?email=`+values.email)
     .then(response => response.json())
      .then(json => {
        console.log(json)
        if(json.result){
          reject({ email: 'Email is Already taken' })
        }else{
          resolve()
        }
      })
   })
}

const AddMembers = class AddMembers extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
    render(){
      const { handleSubmit, pristine, reset, submitting} = this.props    
      return (      
        <div className="container-fluid">
         <div className="row-fluid">
          <div className="span12">
          <div className="widget-box">
              <div className="widget-title"> <span className="icon"><i className="icon-th"></i></span>
                <h5>Add Member </h5>               
              </div>
              <div className="widget-content nopadding">
              <form  onSubmit={handleSubmit}  className="form-horizontal">
            <Field name="memberName" type="text" label='First Name'
              component={renderField} 
              validate={[ required, emptySpace ]}
            />
            <Field name="email" type="email"
              component={renderField} label="Email"
              validate={email}
            />           
            <Field name="phone" type="text" label='Phone'
            component={renderField} 
            validate={[ required ]}
            />              
            <Field name="company" type="text" label='Company info'
                component={renderField}
              />
          <div className="form-actions">             
          <button type="submit"  className="btn btn-success" disabled={pristine || submitting}>Submit</button>{'  '}
          <button type="button"  className="btn btn-warning" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
          </form>
              </div>
            </div>
          </div>
         </div> 
        </div>     
        )
    }
  }

export default reduxForm({
  form: 'AddMembersForm',
  asyncValidate,
  asyncBlurFields: ["email"],
  enableReinitialize: true
})(AddMembers)

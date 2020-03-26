import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import './Form.css';

// validating name and email with Yup
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is a required field."),
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup
    .string()
    .required('Password is required'),
  terms: Yup
    .boolean()
    .oneOf([true], "please agree to terms of use"),
});

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formData).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  const validateChange = event => {
    Yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0]
        });
      });
  };
 
  const handleChange = event => {
    event.persist();
    const newFormData = {
      ...formData,
      [event.target.name]:
        event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then(res => {
        setUsers([
          ...users,
          res.data
        ])
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);

        // reset form if successful
        setFormData({
          name: "",
          email: "",
          password: "",
          terms: ""
        });
      })
      .catch(err => console.log(err.response));
    setFormData({ 
      name: '',
      email: '',
      password: '',
      terms: ''
    });
  };
  
  return(
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Name: 
          <input 
            type='text' 
            name='name' 
            value={formData.name} 
            placeholder='full name' 
            onChange={handleChange} 
          />
        </label>
        {
          errors.name.length > 0 ? 
          <p className="error">{errors.name}</p> 
          : 
          null
        }
        <label htmlFor='email'>
          Email: 
          <input 
            type='text' 
            name='email' 
            value={formData.email} 
            placeholder='email' 
            onChange={handleChange} 
          />
        </label>
        {
          errors.name.length > 0 ? 
          <p className="error">{errors.email}</p> 
          : 
          null
        }
        <label htmlFor='password'>
          Password: 
          <input 
            type='text' 
            name='password' 
            value={formData.password} 
            onChange={handleChange} 
          />
        </label>
        {
          errors.name.length > 0 ? 
          <p className="error">{errors.password}</p> 
          : 
          null
        }
        <label htmlFor='terms'>
          Terms of Service:
          <input
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange} 
          />
        </label>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    </div>
  );
}

export default Form;
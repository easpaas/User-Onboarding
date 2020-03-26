import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import './Form.css';

// validating name and email with Yup
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is a required field."),
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address.")
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
    terms: ''
  });

  const [post, setPost] = useState([]);


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        {/* {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null} */}
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
        {/* TODO errors for email here */}
        <label htmlFor='password'>
          Password: 
          <input 
            type='text' 
            name='password' 
            value={formData.password} 
            onChange={handleChange} 
          />
        </label>
        <label htmlFor='terms'>
          Terms of Service:
          <input
            name="terms"
            type="checkbox"
            checked={false}
            onChange={handleChange} 
          />
        </label>
        <input 
          type='submit' 
          value='Submit' 
        />
      </form>
    </div>
  );
}

export default Form;
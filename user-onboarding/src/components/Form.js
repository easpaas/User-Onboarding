import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

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
      password: ''
    });
  };
  
  return(
    <div className=''>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Name: 
          <input type='text' name='name' value={formData.name} placeholder='full name' onChange={handleChange} />
        </label>
        <label htmlFor='email'>
          Email: 
          <input type='text' name='email' value={formData.email} placeholder='email' onChange={handleChange} />
        </label>
        <label htmlFor='password'>
          Password: 
          <input type='text' name='password' value={formData.password} onChange={handleChange} />
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
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Form;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {FaLock} from 'react-icons/fa'
import {signup, signin} from '../../actions/auth'
import './styles.css'

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
})
  const [isSignup, setIsSignup] = useState(false)

  const onSwitch = () => {
    setIsSignup(preValue => !preValue)
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup){
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
    console.log(formData);
  }

  return (
    <div className='auth-main'>
      <div className='auth-paper'>
        <div className='auth-avatar'>
          <FaLock size={25} />
        </div>
        <p className='auth-heading'>{isSignup ? 'Sign Up' : 'Sign In'}</p>
        <form className='auth-form' onSubmit={handleSubmit}>
          {
            isSignup && (
              <>
                <input name='firstName' value={formData.firstName} placeholder='First Name' type='text' onChange={handleChange} />
                <input name='lastName' value={formData.lastName} placeholder='Last Name' type='text' onChange={handleChange}  />
              </>
          )}
          <input name='email' value={formData.email} placeholder='Email' type='email' onChange={handleChange} />
          <input name='password' value={formData.password} placeholder='Password' type='password' onChange={handleChange} />
          { isSignup && <input name='confirmPassword' value={formData.confirmPassword} placeholder='Confirm Password' type='password' onChange={handleChange} />}
          <button type='submit' className='auth-btn'>{isSignup ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button className='switch-button' onClick={onSwitch}>{isSignup? 'already have an account? signin' : `don't have an account? signup`}</button>
      </div>
    </div>
  )
}

export default Auth
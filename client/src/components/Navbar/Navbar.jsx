import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import image from '../../images/night.jpg'
import defaultImage from '../../images/default.jpg'
import {Link} from 'react-router-dom'
import './styles.css'
import { LOGOUT } from '../../constants/actionTypes'

const Navbar = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    console.log(user);

    const logout = () => {
        dispatch({type: LOGOUT})
        navigate('/')
        setUser(null)
    }

    useEffect(() => {
      const token = user?.token
      if(token){
        const decodeToken = decode(token)
        if(decodeToken.exp*1000 < new Date().getTime()){
            logout()
        }
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    

  return (
    <div className='appBar'>
        <div className='left-side'>
            <img className='image' src={image} alt='night'/>
            <p className='heading'>ShareWev</p>
        </div>
        <div className='right-side'>
            {user ? (
                <div className='profile'>
                    <img className='avatar' alt={user?.result?.name} src={(user?.result?.imageUrl) || defaultImage} />
                    <p className='username'>{user?.result?.name}</p>
                    <button className='logout' onClick={logout}>Logout</button>
                </div>
            ) : (
                <Link className='link' to='/auth'>
                    <button className='signin'>SignIn</button>
                </Link>
            )}
        </div>
    </div>
  )
}

export default Navbar
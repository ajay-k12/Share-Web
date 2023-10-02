import React, { useEffect, useState } from 'react'
import image from './images/night.jpg'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'
import './index.css'

const App = () => {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div className='main-container'>
      <div className='appBar'>
        <img className='image' src={image} alt='night'/>
        <p className='heading'>ShareWev</p>
      </div>
      <div className='container'>
        <div className='posts'>
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className='post-form' >
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  )
}

export default App

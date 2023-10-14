import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import './styles.css'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])
  return (
    <div className='container'>
        <div className='posts'>
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className='post-form' >
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
    </div>
  )
}

export default Home
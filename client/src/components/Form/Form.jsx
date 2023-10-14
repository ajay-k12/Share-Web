import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts'
import './styles.css'

const Form = ({currentId, setCurrentId}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  const dispatch = useDispatch()
  const post = useSelector((state) => currentId ? state.posts.find((post) => post._id===currentId) : null)

  const handleChange = (e) => {
    setPostData({...postData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
   if(post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentId){
      dispatch(updatePost({...postData, name: user?.result?.name}, currentId))
    }
    else{
      dispatch(createPost({...postData, name: user?.result?.name}))
    }
    handleClear()
  }

  const handleClear = () => {
    setCurrentId(null)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  // if(!user?.result?.name){
  //   return (
  //     //show a card telling please login
  //   )
  // }

  return (
    <div className='paper'>
    <p className='form-title'>{currentId ? 'Edit' : 'Write'} a Post</p>
      <form autoComplete='off' noValidate className='root form' onSubmit={handleSubmit}>
        <input
         name='title' 
         label='Title'
         value={postData.title}
         onChange={handleChange}
         placeholder='Title'
        />
        <input
         name='message' 
         label='Message'
         value={postData.message}
         onChange={handleChange}
         placeholder='Message'
        />
        <input
         name='tags' 
         label='Tags'
         value={postData.tags}
         onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
         placeholder='Tags'
        />
        <div className='fileInput'>
          <FileBase
            type='file'
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
          />
        </div>
        <button 
          disabled={!postData.creator && !postData.title && !postData.message && !postData.tags}
          className='btn' 
          type='submit'
        >
          Submit
        </button>
        <button 
        type='button'
          className='btn'
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
    </div>
  )
}

export default Form
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts.js'
import {FaRegHeart, FaRegTrashAlt, FaRegEdit} from 'react-icons/fa'
import defaultImage from '../../../images/default.jpg'
import moment from 'moment'
import './styles.css'

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch()
  
  const handleDelete = () => {
    dispatch(deletePost(post._id))
  }

  return (
    <>
    <div className='card'>
      <div className='top-section'>
        <div className='overlay'>
          <p className='creator-name'>{post.creator}</p>
          <p className='created-at'>{moment(post.createdAt).fromNow()}</p>
        </div>
        <div className='overlay2'>
          <button className='overlay2-button' onClick={() => setCurrentId(post._id)}>
            <FaRegEdit style={{color: 'white', fontSize: '25px'}} />
          </button>
        </div>
      </div>
      <div className='post-card'>
        <img className='media' src={post.selectedFile ? post.selectedFile : defaultImage} alt={post.title} />
        <div className='details'>
          <p className='tags'>{post?.tags?.map((tag) => `#${tag} `)}</p>
          <p className='title'>{post.title}</p>
          <p className='message'>{post.message.length > 40 ? `${post.message.slice(0, 40)}....` : post.message}</p>
        </div>
      </div>
      <div className='cardActions'>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <button onClick={() => dispatch(likePost(post._id))}>
            <FaRegHeart style={{color: 'white', fontSize: '25px'}} />
          </button>
          <p className='like-count'>{post.likeCount} likes</p>
        </div>
        <div>
          <button onClick={handleDelete}>
            <FaRegTrashAlt style={{color: 'white', fontSize: '25px'}} />
          </button>
        </div>
      </div>
    </div>
    <hr className='horizontal' />
    </>
  )
}

export default Post
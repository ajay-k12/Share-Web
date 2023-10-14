import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, likePost } from '../../../actions/posts.js'
import {FaRegHeart, FaRegTrashAlt, FaRegEdit, FaHeart} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import defaultImage from '../../../images/default.jpg'
import moment from 'moment'
import './styles.css'

const Post = ({post, setCurrentId}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleDelete = () => {
    dispatch(deletePost(post._id))
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  // const Likes = () => {
  //   if (post.likes.length > 0) {
  //     return post.likes.find((like) => like === (user?.result?._id))
  //       ? (
  //         <><FaHeart style={{color: 'red', fontSize: '25px'}} />{post.likes.length > 2 ? <p className='like-count'>You and {post.likes.length - 1} others</p> : <p className='like-count'>{post.likes.length} Like{post.likes.length > 1 ? 's' : ''}</p> }</>
  //       ) : (
  //         <><FaRegHeart style={{color: 'white', fontSize: '25px'}} /><p className='like-count'>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</p></>
  //       );
  //   }
  //   return <><FaRegHeart style={{color: 'white', fontSize: '25px'}} /><p className='like-count'>Like</p></>;
  // };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?._id))
        ? (
          <FaHeart style={{color: 'red', fontSize: '25px'}} />
        ) : (
          <FaRegHeart style={{color: 'white', fontSize: '25px'}} />
        );
    }
    return <FaRegHeart style={{color: 'white', fontSize: '25px'}} />
  };

  const Counts = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?._id))
        ? (
          <>{post.likes.length > 2 ? <p className='like-count'>You and {post.likes.length - 1} others</p> : <p className='like-count'>{post.likes.length} Like{post.likes.length > 1 ? 's' : ''}</p> }</>
        ) : (
          <><p className='like-count'>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</p></>
        );
    }
    return <p className='like-count'>Like</p>;
  };

  return (
    <>
    <div className='card'>
      <div className='top-section'>
        <div className='overlay'>
          <p className='creator-name'>{post?.name}</p>
          <p className='created-at'>{moment(post.createdAt).fromNow()}</p>
        </div>
        {(user?.result?._id === post.creator) &&
        <div className='overlay2'>
          <button className='overlay2-button' onClick={() => setCurrentId(post._id)}>
            <FaRegEdit style={{color: 'white', fontSize: '25px'}} />
          </button>
        </div>
        }
      </div>
      <div className='post-card' onClick={openPost}>
        <img className='media' src={post.selectedFile ? post.selectedFile : defaultImage} alt={post.title} />
        <div className='details'>
          <p className='tags'>{post?.tags?.map((tag) => `#${tag} `)}</p>
          <p className='title'>{post.title}</p>
          <p className='message'>{post.message.length > 40 ? `${post.message.slice(0, 40)}....` : post.message}</p>
        </div>
      </div>
      <div className='cardActions'>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <button disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </button>
          <Counts />
        </div>
        {(user?.result?._id === post.creator) &&
        <div>
          <button onClick={handleDelete}>
            <FaRegTrashAlt style={{color: 'white', fontSize: '25px'}} />
          </button>
        </div>
        }
      </div>
    </div>
    <hr className='horizontal' />
    </>
  )
}

export default Post
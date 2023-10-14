import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../../actions/posts'
import defaultImage from '../../images/default.jpg'
import moment from 'moment'
import './styles.css'
import BounceLoader from 'react-spinners/BounceLoader'

const PostDetails = () => {
  const {post, posts} = useSelector((state) => state.posts)
  console.log(posts);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  console.log('post : ',post);
  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  if(!post) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}><BounceLoader color='white' /></div>
  return (
    <div className='details-main-container'>
        <div className='details-container'>
            <div className='left-side-det'>
                <img className='det-img' src={post?.selectedFile ? post.selectedFile : defaultImage} alt={post?.title} />
            </div>
            <div className='right-side-det'>
                <p className='det-title'>{post?.title}</p>
                <p className='det-tags'>{post?.tags?.map((tag) => `#${tag} `)}</p>
                <p className='det-message'>{post?.message}</p>
                <p className='det-name'><strong>Created by:</strong> {post?.name}</p>
                <p className='det-time'>{moment(post?.createdAt).fromNow()}</p>
            </div>
        </div>
    </div>
  )
}

export default PostDetails
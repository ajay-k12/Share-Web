import React from 'react'
import Post from './Post/Post'
import {useSelector} from 'react-redux'
import BounceLoader from 'react-spinners/BounceLoader'
import './styles.css'

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts)

  if(!posts.length) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '200px', marginTop: '250px'}}><BounceLoader color='white' /></div>
  return (
      <div className='post-conatainer'>
        { posts.map((post) => (
          <div key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </div>
        ))}
      </div>
  )
}

export default Posts
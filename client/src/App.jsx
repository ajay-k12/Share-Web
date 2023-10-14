import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import './index.css'
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <div className='main-container'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Navigate to='/posts' />}  />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route path='/auth' exact element={user ? <Navigate to='/posts'/> : <Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

import {Routes,Route} from 'react-router'
import { useContext, useEffect, useState } from 'react';
import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import RamadanPostForm from './components/RamadanPostForm/RamadanPostForm';
import RamadanPost from './components/RamadanPost/RamadanPost'
import * as ramadanService from './services/ramadanPostService'
import { UserContext } from './contexts/UserContext';


const App = () => {
  const {user} = useContext(UserContext)

  const [ramadanPosts, setRamadanPosts]= useState([])
  const [ramadanPostToUpdate, setRamadanPostToUpdate]= useState(null)

  useEffect(()=>{
    const getAllRamadanPosts = async()=>{
      try {
        const data = await ramadanService.index()
        setRamadanPosts(data)
      } catch (err) {
      }
    }
    if (user) getAllRamadanPosts()
  },[user])


  const updateRamadanPost = (ramadanPost) =>{
    setRamadanPosts([...ramadanPosts,ramadanPost])
  }

  const findRamadanPostsToUpdate = (ramadanPostId)=>{
    const foundRamadanPost = applications.find(ramadanPost=>ramadanPost._id===ramadanPostId)
    setRamadanPostToUpdate(foundRamadanPost)
  }
  
  const deleteRamadanPost = (ramadanPostId)=>{
    const newRamadanPostList = applications.filter(ramadanPost=>ramadanPost._id !==ramadanPostId)
    setRamadanPosts(newRamadanPostList)
  }
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path='/' element={user ? <Dashboard ramadanPosts={ramadanPosts} /> : <Landing />} /> */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/ramadanPost/new' element={<RamadanPostForm updateRamadanPost={updateRamadanPost} />} />
        <Route path="/ramadan/:ramadanPostId" element={<RamadanPost />} />
        <Route path='/ramadanPost/:ramadanPostId' element={<RamadanPost deleteRamadanPost={deleteRamadanPost} findRamadanPostsToUpdate={findRamadanPostsToUpdate} />} />
        <Route path='/ramadanPost/:ramadanPostId/update' element={<RamadanPostForm  ramadanPostToUpdate={ramadanPostToUpdate} updateRamadanPost={updateRamadanPost} />} />
      </Routes>
    </>
  );
};

export default App;


import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Login from './component/Login';
import AlbumList from './component/AlbumList';
import PhotoList from './component/PhotoList';
import { AuthProvider } from './component/AuthContext';

//import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Login/>}/>
            <Route path='/album/list' element={<AlbumList/>}/>
            <Route path='/album/detail' element={<PhotoList/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

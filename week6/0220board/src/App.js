import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './component/layout.js'
import Home from './component/home.js'
import Posts from './board/posts.js';
import Todos from './board/todos.js';
import Users from './board/users.js';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='board/posts' element={<Posts/>}/>
          <Route path='board/todos' element={<Todos/>}/>
          <Route path='board/users' element={<Users/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

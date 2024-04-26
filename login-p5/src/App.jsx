/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import './App.css'
import { useEffect, useState } from 'react'
import Signup from './Signup'

function App() {
  const [loggedIn, setLoggedIn] = useState(false) // para controlar si el suario esta logeado o no
  const [email, setEmail] = useState('') // para almacenar el email del usuario

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
// src/App.jsx
import { useState } from 'react'
import Login from './pages/Login'
import Katalog from './pages/Katalog'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return loggedIn
    ? <Katalog onLogout={() => setLoggedIn(false)} />
    : <Login onLogin={() => setLoggedIn(true)} />
}

export default App

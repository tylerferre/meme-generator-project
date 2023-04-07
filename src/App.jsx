import { useState } from 'react'
import Meme from './components/Meme'
import Navbar from './components/Navbar'
import PrevMemes from './components/PrevMemes'

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Meme/>
      <PrevMemes/>
    </div>
  )
}

export default App

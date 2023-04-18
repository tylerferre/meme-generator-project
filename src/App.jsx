import { useState } from 'react'
import Meme from './components/Meme'
import Navbar from './components/Navbar'
import PrevMemes from './components/PrevMemes'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Meme/>
      <PrevMemes/>
      <Footer/>
    </div>
  )
}

export default App
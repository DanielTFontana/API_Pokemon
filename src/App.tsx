import { useState } from 'react'
import './App.css'
import { ClosedDex } from './Components/PokedexClosed'
import { OpenDex } from './Components/OpenPokeDex'
import { Card } from './Components/OpenPokeDex/Card' 
import { ListPoke } from './Components/OpenPokeDex/List'

function App() {

  return (
    <div >
   <OpenDex/>
    </div>
  )
}

export default App

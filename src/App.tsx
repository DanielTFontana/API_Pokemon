import { useState } from 'react'
import './App.css'
import { ClosedDex } from './Components/PokedexClosed'
import { OpenDex } from './Components/OpenPokeDex'
import { Card } from './Components/OpenPokeDex/Card' 
import { ListPoke } from './Components/OpenPokeDex/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
    <OpenDex card={<Card/>} list={<ListPoke/>}></OpenDex>
    </div>
  )
}

export default App

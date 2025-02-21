import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let Counter = 0
  function addValue(){
    Counter ++
    console.log(Counter);
    
  }
  function removeValue(){
    Counter --
    console.log(Counter);
    
  }
  return (
    <div>
      <h1>Counter : {Counter}</h1>
      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}> Remove Value</button>

    </div>
  )
}

export default App

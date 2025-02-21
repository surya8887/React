import { useCallback, useEffect, useRef } from "react"
import { useState } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // password Generator Function 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*-_+=[]{}~`"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, characterAllowed, numberAllowed, setPassword])

  // --> useRef Hooks 
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() =>
    passwordGenerator(), [length, numberAllowed, characterAllowed, setPassword])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-3 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-2">
        <input type="text"
          className='overline-none w-full py-1 px-3'
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-2 py-0.5 shrink-0'
          >Copy</button>
      </div>

      <div className="flex gap-2 text-sm">
        <input type="range"
          id='rangeInput'
          min={8}
          max={100}
          value={length}
          onChange={(e) => { setLength(e.target.value) }}
          className='cursor-pointer'
        />
        <label htmlFor="rangeInput">Length({length})</label>
        <input type="checkbox" name="" id="numberInput"
          defaultChecked={numberAllowed}
          onChange={(e) => {
            setNumberAllowed((prev) => !prev)
          }}
        />
        <label htmlFor="numberInput">Number</label>

        <input type="checkbox" name="" id="characterInpur"
          defaultChecked={characterAllowed}
          onChange={
            (e) => {
              setCharacterAllowed((prev) => !prev)
            }
          }
        />
        <label htmlFor="characterInpur">Character</label>
      </div>
    </div>

  )
}

export default App

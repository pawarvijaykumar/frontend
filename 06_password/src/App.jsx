import { useState,useCallback,sueEffec,useRef, useEffect } from "react"

function App() {
  const [length, setLenght] = useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState(false);
  //refernce hook
  
  const passwordRef=useState

  const passwwordGenerator=useCallback(()=>{//usecalback means the memorize the value
    let pass=""
    let str=
    "QWERTYUIOPPOIUYTREWQASDFGHJKLMNBVCXZqwertyuioplkjhgfdsazxcvbnm"
    if(numberAllowed)str+="0123456789"
    if(charAllowed)str+="!@#$%^&*()_+{}"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(char)
    
  }
  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])//its used becuse optimization
const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0.999);
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwwordGenerator()
},[length,numberAllowed,charAllowed,passwwordGenerator])//if any changed the in this function reruned

return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange--500">
      <h1 className="text-4xl text-center text-white">password-generator</h1>
      <div className="flex shadow rounde-lg overflow-hidden mb-4">
        </div>
      
        <input 
        type="text"
        value={password}
        className="outline-none w=-full py-1 px3"
        placeholder="password"
        readOnlyref={passwordRef}>
        
        </input>
        <button
        onClick={copyPasswordToClipboard}
        className="outline-none bg-blue-700 text-what px- py-0.5 shrink-0"
        >copy
        </button>

      </div>
      <div
      className="flex text-sm gap-x-2"
      className="flex items-center gap-x-1">
      <input
      type="range"
      min={60}
      max={100}
      value={length}
      className="cursor-pointer"
      onChange={(e)=>{setLenght(e.target.value)}}
      />
      <label>
        Length:{length}
      </label>
      </div>
      <div
        className="flex item-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}
          />

        
        
      </div>

     

      
   
  )
}

export default App
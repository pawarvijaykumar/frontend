import { useState } from 'react'//its  a hooks libries
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const[counter,setCounter]=useState(15)//means increase-->15,16
  //let counter=3
  const addValue=()=>{
    console.log("clicked",counter);
    //counter=counter+1;  
    setCounter(counter+1)//(counter) 
  }
  const removeValue=()=>{
    console.log("clicked",counter);
    setCounter(counter-1);//its remove the when u click values
  }                                                                                              
  
  return(
    <>
    <h2>hi king</h2>
    <h1>counter values:{counter}</h1>
    <button onClick={addValue}>addValue{counter}</button>
     <br />
     <button onClick={removeValue}>removeValue{counter}</button>
     <p>fotter:{counter}</p>
    </>
  )
}
export default App

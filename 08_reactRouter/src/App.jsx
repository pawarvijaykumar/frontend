import { useState } from 'react'
import About from "./components/About/About.jsx";   // ye check kar
import Home from "./components/home/home.jsx";     
import Layout from "./Layout.jsx";                   // ye sahi hai (already ./)
import { RouterProvider } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className='bg-green-600 p-4'>king</h2>
    </>
  )
}

export default App

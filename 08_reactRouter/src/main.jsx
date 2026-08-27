import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './components/About/About.jsx' 
import Home from './components/home/home.jsx'

import Layout from './Layout.jsx'
import { RouterProvider } from 'react-router-dom'
const router =ctrateBrowserRouter([
  {
    path:'/',
    Element:<Layout/>,
    children:[
      {
        path:"",
        Element:<Home/>,
      },
      {
        path:"",
        Element:<About/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)

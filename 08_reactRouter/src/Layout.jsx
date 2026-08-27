import React from "react"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/footer"
import { Outlet } from "react-router-dom"


//Outlet-->means is bottom and top funtion does not change chage only thaat function only

function Layout(){
  return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>

    </>
  )

}

export default Layout
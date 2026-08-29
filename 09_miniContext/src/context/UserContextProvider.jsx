import React, { Children, useState } from "react";
import UserContext from ".UserContext.js"; 

const UserContextProvider=({Children})=>{
  const [user,SetUser]=useState("")
  return(
    <UserContext.Provider value={{user,SetUser}}>
      {Children}
      </UserContext.Provider>

  )
}
export default UserContextProvider
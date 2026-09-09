import React from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/authSlice";
import { logout } from "../../appwrite/auth.js";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    logout().then(() => {
      dispatch(logoutAction());
    });
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
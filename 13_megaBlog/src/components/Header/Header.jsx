import React from "react";
import {Container,Logo,LogoutBtn} from '../index'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";



function Header() {
  return (
    <Header className="bg-gray-800 text-white p-4">
      <h1>My Blog Header</h1>
    </Header>
  );
}

export default Header;
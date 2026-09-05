import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice"; // agar Redux use kar rahe ho
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()//means of this line is if you get userr sesion then u do lofin otherwise logout
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  );
}

export default App;
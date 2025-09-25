import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Products from "./pages/Products";
import AddListingModal from "./components/AddListingModal";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminPanel from "./pages/AdminPanel";
import "./styles/style.css";
import "./styles/auth.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setAuthChecked(true);
  }, []);

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  if (!authChecked) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Yükleniyor...</p>;
  }

  return (
    <>
      {!isAuthPage && (
        <Header
          user={user}
          onsignin={(data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
          }}
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }}
          onAddListing={() => setModalAddOpen(true)}
        />
      )}

      <Routes>
        {/* Anasayfa → adminse AdminPanel, değilse Slider+Products */}
        <Route
          path="/"
          element={
            user && user.role === "admin" ? (
              <AdminPanel />
            ) : (
              <>
                <Slider />
                <Products />
              </>
            )
          }
        />

        {/* Auth sayfaları */}
        <Route
          path="/signin"
          element={
            <SignIn
              onsignin={(data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
              }}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              onsignin={(data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
              }}
            />
          }
        />
      </Routes>

      {modalAddOpen && <AddListingModal onClose={() => setModalAddOpen(false)} />}

      {!isAuthPage && <Footer />}
    </>
  );
}

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { Header } from "./components/header/Header.jsx";
import { Home } from "./components/Home.jsx";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [language, setLanguage] = useState("GR");

  const location = useLocation();

  // Hide elements when screen is small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        document.querySelectorAll(".hide-small").forEach((element) => {
          element.classList.add("hide");
        })
      }
      else {
        document.querySelectorAll(".hide-small").forEach((element) => {
          element.classList.remove("hide");
        })
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);


  return (
    <div className="App d-flex justify-content-center">
      <Header
        showSidebar={showSidebar} setShowSidebar={setShowSidebar}
        language={language} setLanguage={setLanguage}/>
      <Sidebar
        showSidebar={showSidebar} setShowSidebar={setShowSidebar}
        language={language}/>
      <div className="main-wrapper">
        <Routes>
            <Route path="/" element={
                <Home language={language}/>
            }></Route>
            <Route path="contact" element={
                <Contact language={language}/>
            }></Route>
        </Routes>
        <Footer language={language}/>
      </div>
    </div>
  );
}

export default App;

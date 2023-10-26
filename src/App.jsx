import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import { Contact } from "./components/Contact.jsx";
import { Header } from "./components/Header.jsx";
import { Home } from "./components/Home.jsx";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App d-flex justify-content-center">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="contact" element={<Contact/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

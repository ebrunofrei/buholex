// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #F6F5F1 0%, #e8eaee 100%)",
      minHeight: "100vh"
    }}>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;

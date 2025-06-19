import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{
        minHeight: "70vh",
        margin: "32px auto 0 auto",
        border: "5px solid #bda99b",  // Marco marrón suave
        borderRadius: 20,
        boxShadow: "0 8px 38px #baa06e16",
        maxWidth: 1280,
        background: "rgba(255,255,255,0.85)",
        padding: "32px 16px 0 16px"
      }}>
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{
        minHeight: "70vh",
        padding: "32px 12px 0 12px",
        maxWidth: 980,
        margin: "0 auto"
      }}>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;

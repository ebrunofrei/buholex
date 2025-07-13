// src/layout.jsx
import React from "react";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

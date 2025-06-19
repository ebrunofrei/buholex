// src/components/SocialBar.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export default function SocialBar() {
  return (
    <div style={{
      display: "flex", gap: "1.5rem", justifyContent: "center", margin: "25px 0"
    }}>
      <a href="https://www.facebook.com/novalexperu" target="_blank" rel="noopener noreferrer"><FaFacebookF size={28} color="#4267B2" /></a>
      <a href="https://wa.me/51922038280" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={28} color="#25d366" /></a>
      <a href="https://www.instagram.com/novalexperu" target="_blank" rel="noopener noreferrer"><FaInstagram size={28} color="#e4405f" /></a>
      <a href="https://x.com/novalexperu" target="_blank" rel="noopener noreferrer"><FaXTwitter size={28} color="#000" /></a>
      <a href="https://www.linkedin.com/company/novalexperu" target="_blank" rel="noopener noreferrer"><FaLinkedin size={28} color="#0077b5" /></a>
    </div>
  );
}

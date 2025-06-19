import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export default function SocialBar() {
  return (
    <div style={{
      display: "flex",
      gap: "1.2rem",
      justifyContent: "center",
      margin: "0.6rem 0"
    }}>
      <a href="https://www.facebook.com/novalexperu" target="_blank" rel="noopener noreferrer"><FaFacebookF size={26} color="#CEB067" /></a>
      <a href="https://wa.me/51922038280" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={26} color="#CEB067" /></a>
      <a href="https://www.instagram.com/novalexperu" target="_blank" rel="noopener noreferrer"><FaInstagram size={26} color="#CEB067" /></a>
      <a href="https://x.com/novalexperu" target="_blank" rel="noopener noreferrer"><FaXTwitter size={26} color="#CEB067" /></a>
      <a href="https://www.linkedin.com/company/novalexperu" target="_blank" rel="noopener noreferrer"><FaLinkedin size={26} color="#CEB067" /></a>
    </div>
  );
}

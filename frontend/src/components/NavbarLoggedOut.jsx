import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarLoggedOut = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        backgroundColor: "black",
        color: "white",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Left 50% - Logo */}
      <div
        style={{
          width: "50%",
          fontWeight: "bold",
          fontSize: "48px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        GENIE-AI
      </div>

      {/* Right 50% - Navigation */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
          Home
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Agents
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/how-it-works")}>
          How it works
        </span>
        <button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid white",
            padding: "6px 12px",
            fontSize: "24px",
            borderRadius: "32px",
            width: "200px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid white",
            padding: "6px 12px",
            fontSize: "24px",
            borderRadius: "32px",
            width: "200px",
            cursor: "pointer",
          }}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default NavbarLoggedOut;

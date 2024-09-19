
import React, { useState } from "react";
import "./Navbar.css";
export default function Navbar() {
  
    return (
      <>
          
          <nav className="nav-menu active">
            <ul className="nav-menu-items">
              <li className="navbar-toggle">
                asd
              </li>
            </ul>
            <div className="nav-menu-items-bottom">
            <button onClick={() => { /* add functionality for this button */ }} className="add-agent-button">Add Agent</button>
           </div>
          </nav>
      </>
    );
  }
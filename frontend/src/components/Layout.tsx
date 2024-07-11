import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // Import the CSS file
import Navbar from "../navbar/Navbar"; // Adjust the path as needed
interface LayoutProps {
    children: React.ReactNode;
  }
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;


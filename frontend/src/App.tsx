import React from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import { PublicRouter } from "./routers/PublicRouter";


const App: React.FC = () => (
  <>
    <Navbar />
    <PublicRouter />
    
    
  </>
);

export default App;


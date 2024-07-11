import React from "react";
import "./App.css";

import { PublicRouter } from "./routers/PublicRouter";
import Navbar from "./components/Navbar";


const App: React.FC = () => (
  <>
    <Navbar />
    <PublicRouter />
    
    
  </>
);

export default App;
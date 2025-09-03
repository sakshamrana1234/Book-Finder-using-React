import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);
  return (
    
      <div className="root">
          <Header />
         <main className="main_content">
         <Outlet/>  
        </main>
        
          <Footer/>
            </div>
      
    
  );
}

export default App;

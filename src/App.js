import "./App.css";
import React from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Content from './components/content/content';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Content/>
      <Footer />
    </div>

  );
}

export default App;

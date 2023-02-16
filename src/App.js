import "./App.css";
import React, {useState} from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Content from './components/content/content';


export const states = {
  grant_permission: "Grant NFC permission",
  bring_phone: "Bring your phone close to the Tag!",
  token_identified: "Token Identified",
  error: "Argh! Cannot read data from the NFC tag. Try again?",
  errorRead: "Argh! Cannot read data from the NFC tag. Try another one?",
  not_available: "Feature not available for your device",
  failed_data_load: "Failed to load data",
  invalid_token: "Token is invalid"
};

function App() {

  const [status, setStatus] = useState(states.grant_permission);
  const [tokenID, setTokenID] = useState(null);
  const [popOpen, setPopOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  
  return (
    <div className="App">
      <Navbar
        setStatus= {setStatus}  
        setTokenID={setTokenID}
        setData={setData}
        tokenID={tokenID}
      />
      <Content 
          status={status}
          setStatus= {setStatus}
          tokenID={tokenID}
          setTokenID={setTokenID}
          popOpen={popOpen}
          setPopOpen={setPopOpen}
          loading={loading}
          setLoading={setLoading}
          data={data}
          setData={setData}
      />
      <Footer />
    </div>

  );
}

export default App;

import React from "react";
import "./content.css";
import { useState, useEffect } from "react";

function Content() {
  const [, setTagDetected] = useState(false);
  const [imageSrc, setImageSrc] = useState("./assets/3.png");
  const [status, setStatus] = useState("Tap to Verify");
  const [verify, setVerify] = useState("Verify");

  useEffect(() => {
    const handleNfcTagDetection = (event) => {
      setTimeout(() => {
        setTagDetected(true);
        setImageSrc("./assets/gucci.png");
        setStatus("Verified!!");
        setVerify("Product detected and verified!");
      }, 2000);
    };

    async function handleClick() {
      if ("NDEFReader" in window) {
        alert("NDEFReader is supported");
        const ndef = new window.NDEFReader();

        await ndef.scan();

        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          window.body = message;
        });
      }
    }

    window.addEventListener("click", handleClick);

    // Add event listener for NFC tag detection
    // Replace 'nfc' with the appropriate event name for your use case
    window.addEventListener("click", handleNfcTagDetection);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("click", handleNfcTagDetection);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="content">
      <h1>{status}</h1>
      <div className="img">
        <img src={imageSrc} className="image" alt="" />
      </div>
      <button>{verify}</button>
      {/* {tagDetected && (
              <p className='detected'>Product detected and verified!</p>
            )} */}
    </div>
  );
}

export default Content;

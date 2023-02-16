import React from "react";
import "./content.css";
import { useState, useEffect } from "react";

function Content() {
  // const [, setTagDetected] = useState(false);
  const [imageSrc, setImageSrc] = useState("./assets/3.png");
  const [status, setStatus] = useState("Tap to Verify");
  // const [verify, setVerify] = useState("Verify");
  const [tokenID, setTokenID] = useState(null)

  useEffect(() => {

    let NDEF;
    if ("NDEFReader" in window) {
      // eslint-disable-next-line no-undef
      NDEF = new NDEFReader();
      NDEF.scan().then(() => {
        setStatus('Bring your phone close to the Tag!')
      })

      NDEF.addEventListener("reading", (event) => {
        // event.preventDefault();
        // alert(event.preventDefault)
        const message = event.message;
        const records = message.records;

        const record = records[0];
        if (record == null) {
          setStatus('Argh! Cannot read data from the NFC tag. Try again?')
          return;
        }
        const textDecoder = new TextDecoder(record.encoding);
        const text = textDecoder.decode(record.data);

        setStatus('Token Identified');
        setTokenID(text);
      });

      NDEF.addEventListener("readingerror", () => {
        setStatus('Argh! Cannot read data from the NFC tag. Try another one?')
      });
    }

  }, [])

  return (
    <div className="content">

      <div className="img">
        <img src={imageSrc} className="image" alt="" />
      </div>
      <div>
      <h1>{status}</h1>
        {
        tokenID && <p class="token-display">
          {tokenID}
        </p>
        }
      </div>
    
    </div>
  );
}

export default Content;

// <button
//   onClick={async () => {
//     if ("NDEFReader" in window) {
//       // eslint-disable-next-line no-undef
//       const NDEF = new NDEFReader();

//       await NDEF.scan();
//       setStatus('Bring your phone close to the Tag!')

//       NDEF.addEventListener("reading", (event) => {
//         // event.preventDefault();
//         // alert(event.preventDefault)
//         const message = event.message;
//         const records = message.records;

//         const record = records[0];
//         if (record == null) {
//           setStatus('Argh! Cannot read data from the NFC tag. Try again?')
//           return;
//         }
//         const textDecoder = new TextDecoder(record.encoding);
//         const text = textDecoder.decode(record.data);

//         setStatus(text);
//       });

//       NDEF.addEventListener("readingerror", () => {
//         setStatus('Argh! Cannot read data from the NFC tag. Try another one?')
//       });
//     }
//   }}
// >
//   // {verify}
// </button>
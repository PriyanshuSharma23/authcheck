import React from "react";
import "./content.css";
import { useEffect } from "react";
import Spline from "@splinetool/react-spline";
import {states} from "../../App.js";
import {useSwipeable} from "react-swipeable"


function Content({ status, setStatus, tokenID, setTokenID, popOpen, setPopOpen, loading, setLoading, data, setData }) {

  const handlers = useSwipeable({
    onSwipedUp: (eventData) => {
      setPopOpen(true);
    },
    onSwipedDown: (e) => {
      setPopOpen(false);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
    
  function initializeNFC() {
    let NDEF;

    if ("NDEFReader" in window) {
      // eslint-disable-next-line no-undef
      NDEF = new NDEFReader();

      try {
        NDEF.scan().then(() => {
          setStatus("Bring your phone close to the Tag!");
        });

        NDEF.addEventListener("reading", async (event) => {
          if (tokenID) return;

          event.preventDefault();
          // alert(event.preventDefault)
          const message = event.message;
          const records = message.records;

          const record = records[0];
          if (record == null) {
            setStatus(states.error);
            return;
          }

          try {
            const textDecoder = new TextDecoder(record.encoding);
            const text = textDecoder.decode(record.data);
            setStatus("Token Identified");
            setTokenID(text);
          } catch (e) {
            setStatus(states.errorRead);
          }

        });

        NDEF.addEventListener("readingerror", () => {
          setStatus(states.errorRead);
        });
      } catch (e) {
        // if e is a SecurityError, the user didn't grant the website access to the NFC device
        setStatus(states.grant_permission);
      }
    } else {
      setStatus(states.not_available)
    }
  }

  
  useEffect(() => {
    if (!tokenID) return;
    console.log(tokenID);
    const URL = `https://nftinfo.pjmathematician.repl.co/nft_info?token=${tokenID}`
    setLoading(true);

    fetch(URL, {
      method: "GET"
    })
      .then(res => res.json())
      .then(d => {
        if ("message" in d && d.message === 'Suck my balls') {
          setStatus(states.invalid_token)
          setTokenID(null);
          return;
        }
        setData(d)
        console.log(d);
        setPopOpen(true);
      })
      .catch(e => {
        setStatus(states.failed_data_load + `\n ${e}`)
      }).finally(() => {
        setLoading(false);
        
      })

      

  }, [tokenID]);

  useEffect(() => {
    initializeNFC();
  }, []);

  return (
    <>
      <div className="content">
        <div className="bound">
          {loading ? (
            <Loader />
          ) : (
            <Spline scene="https://prod.spline.design/SiEJafoPjaKunbQH/scene.splinecode" />
          )}
        </div>
        <div>
          <h1 className="status">
            {status.includes("Feature") ? (
              <p className="error">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.2em"
                  width="1.2em"
                  xmlns="http://www.w3.org/2000/svg"
                  style= {{marginRight: '0.5rem'}}
                >
                  <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                  <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                </svg>
                {status}
              </p>
            ) : (
              status
            )}
          </h1>

          {status === states.grant_permission && (
            <button
              onClick={async () => {
                initializeNFC();
              }}
              style={{
                marginTop: "1rem",
              }}
            >
              Grant
            </button>
          )}

          {tokenID && <a href={`https://ghostnet.tzkt.io/${tokenID}/operations/`} className="token-display">token: {tokenID}</a>}
        </div>
      </div>
      {data != null && <div {...handlers} className={`popup ${popOpen ? "open-popup" : ""}`}>
        <h1 className="brandname">{data.product_brand}</h1>
        <p className="product-name">{data.product_name}</p>
        <small>Owner Wallet: <br />{data.owner_wallet}</small>

        <div
          style={{
            height: "20px",
          }}
        ></div>

        <div className="center">
          <img
            src={data.nft_url}
            alt={data.product_name}
            className="product-image"
          />
        </div>

        <div
          style={{
            height: "20px",
          }}
        ></div>

        <p className="product-description">{data.product_description}</p>
        {/* Cross Button */}
        <svg
          stroke=""
          fill=""
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
          className="cross-btn"
          onClick={() => {
            console.log("Changed", popOpen);
            setPopOpen(false);
          }}
        >
          <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
        </svg>
      </div>}
    </>
  );
}

function Loader() {
  return (
    <div className="spinner-box">
      <div className="leo-border-1">
        <div className="leo-core-1"></div>
      </div>
      <div className="leo-border-2">
        <div className="leo-core-2"></div>
      </div>
    </div>
  );
}

export default Content;

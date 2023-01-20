import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import Popup from "./popup";

function App() {
  const [image, setImage] = useState([]);
  const [index, setIndex] = useState(0);
  const [popUp, setPopup] = useState(false);
  const [social, setSocial] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  async function fetchData() {
    let result = await fetch("https://augmentik.onrender.com/getData", {
      method: "GET",
    });
    result = await result.json();
    result = result.data;
    console.log(result);
    setImage(result.images);
    setSocial(result.social);
    setDataLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   // if (showLinks) {
  //   //   linksContainerRef.current.style.height = "200px";
  //   // } else {
  //   //   linksContainerRef.current.style.height = "0px";
  //   // }
  //   console.log(linksContainerRef.current);
  // }, [showLinks]);

  function img_carousel(start) {
    return (
      <>
        {image.map((element, ind) => {
          if (start >= ind) return;
          return (
            <div>
              <div className="img-card">
                <img src={`${element.url}`} alt="" />
              </div>
            </div>
          );
        })}
      </>
    );
  }

  function toggleIndex(value) {
    if (index + value < 0 || index + value >= image.length) {
      return;
    }
    setIndex(index + value);
    console.log(index);
  }
  function socialIcons() {
    return (
      <>
        <ul className="social-menu">
          {social.map((element, ind) => {
            return (
              <li className="menu-item">
                <a href={`https://${element.url}`} target="_blank">
                  <img
                    src={`/images/${element.platform}.png`}
                    alt=""
                    className="social-icon"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  // console.log(img_carousel());

  return (
    dataLoaded && (
      <>
        <Popup trigger={popUp} setTrigger={setPopup}></Popup>
        <div className="home">
          <div className="img-gradient">
            <img src={`${image[index].url}`} alt="" className="home-bg-img" />
          </div>
          <div className="header">
            <div className="logo-container">
              <h2>Sri Lanka</h2>
              <button
                onClick={() => setShowLinks(!showLinks)}
                className="menu-btn"
              >
                <span class="material-symbols-outlined">menu</span>
              </button>
            </div>

            <div className="nav-container">
              <div
                className={showLinks ? "nav-menu nav-menu-mobile" : "nav-menu"}
              >
                <ul>
                  <li>home</li>
                  <li>discover</li>
                  <li>history</li>
                  <li>events</li>
                  <li>blogs</li>
                  <li onClick={() => setPopup(true)}>Contact Us</li>
                  <li className="social-btn">
                    Socials
                    {socialIcons()}
                  </li>
                </ul>
              </div>

              {/* {<div className="search-bar">
                <input type="text" placeholder="search" />
               <img src="/images/search-icon.png" alt="" height="10px">
            </div>} */}
            </div>
          </div>
          <div className="main">
            <div className="text-column">
              <h1>
                welcome
                <br />
                to sri lanka
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                consequatur reprehenderit odit dolorem quia ex sint molestiae.
                Cum, ad! Reprehenderit facere eligendi blanditiis nisi labore
                fuga consequuntur, ullam quae unde itaque quam asperiores
                officiis. Expedita facilis aliquid possimus qui animi cum,
                architecto sunt voluptatibus esse numquam, amet voluptas. Et nam
                cum nulla nesciunt minus porro consequuntur nobis aspernatur
                fuga quo.
              </p>
              <div className="btn">
                <button>explore</button>
              </div>
            </div>
            <div className="image-column">
              <span className="img-title">{`${image[index].name}`}</span>
              <div className="carousel-container">
                <div className="carousel">
                  {/* <div className="img-card">
                <img src="/images/colombo.jpg" alt="" />
              </div> */}
                  {img_carousel(index)}
                </div>
                <div className="home-foot">
                  <button
                    onClick={() => toggleIndex(-1)}
                    className={"prev-btn"}
                  >
                    <span class="material-symbols-outlined">
                      arrow_back_ios
                    </span>
                  </button>
                  <button
                    onClick={() => toggleIndex(+1)}
                    className={"next-btn"}
                  >
                    <span class="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="explore">
          <div className="img-column">
            <button class="explore-btn next-button">
              <span class="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <div className="explore-card-carousel card-carousel">
              {/* <div class="img-card">
              <img src="/images/colombo.jpg" alt="" />
            </div> */}
              {img_carousel(-1)}
            </div>
            <button className="explore-btn prev-button">
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            </button>
          </div>
          <div className="explore-text-column text-column">
            <h1>
              explore <br /> the island
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
              consequatur reprehenderit odit dolorem quia ex sint molestiae.
              Cum, ad! Reprehenderit facere eligendi blanditiis nisi labore fuga
              consequuntur, ullam quae unde itaque quam asperiores officiis.
            </p>
            <div className="btn">
              <button>explore</button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default App;

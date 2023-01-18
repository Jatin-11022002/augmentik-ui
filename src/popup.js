import React, { useState } from "react";
import "./style.css";

function Popup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit() {
    let result = await fetch("https://augmentik.onrender.com/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
    result = await result.json();
    console.log(result);
    alert("Form Submitted Successfuly");
    props.setTrigger(false);
  }

  return (
    props.trigger && (
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            X
          </button>
          <div className="container">
            <h1>Contact us</h1>
            <input
              type="text"
              placeholder="Enter Your Name here..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Your Email here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Enter Your Message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="submit-btn" onClick={() => onSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Popup;

import React, { useEffect, useState } from "react";
import "./admin.css";
import jsPDF from "jspdf";
import AddImage from "./add-image";
require("jspdf-autotable");

function Admin({ props }) {
  const [imagePanel, setImagePanel] = useState(false);
  const [socialPanel, setSocialPanel] = useState(false);
  const [leadsPanel, setLeadsPanel] = useState(false);
  const [images, setImages] = useState([
    { name: "", url: "", description: "" },
  ]);
  const [leads, setLeads] = useState([]);
  const [social, setSocial] = useState([{ platform: "", url: "" }]);

  async function fetchData() {
    let result = await fetch("https://augmentik.onrender.com/getData", {
      method: "GET",
    });
    result = await result.json();
    result = result.data;
    console.log(result);
    setImages(result.images);
    setSocial(result.social);
    setLeads(result.contactUs);
  }
  useEffect(() => {
    fetchData();
  }, []);
  //   fetchData();

  async function onSave() {
    let result = await fetch("https://augmentik.onrender.com/updateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images, social }),
    });
    result = await result.json();
    console.log(result);
    if (result.msg === "received") alert("saved");
  }

  function addEntry(key) {
    console.log("clicked");
    if (key == "images") {
      let obj = {
        name: "",
        url: "",
        description: "",
      };
      images.push(obj);
      console.log(images);
      setImages(images);
    } else {
      let obj = {
        platform: "",
        url: "",
      };
      const list = [...social];
      list.push(obj);
      //social.push(obj);
      setSocial(list);
    }
  }

  function genPdf() {
    let data = [];
    leads.forEach((element) => {
      data.push([element.name, element.email, element.message]);
    });

    let doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "Email", "Message"]],
      body: data,
    });
    doc.save("docs.pdf");
  }

  function updateImages(ind, attribute, e) {
    let newRecord = images.map((element, index) => {
      if (ind == index) {
        element[attribute] = e.target.value;
      }
      return element;
    });
    setImages(newRecord);
  }
  function updateSocial(ind, attribute, e) {
    let newRecord = social.map((element, index) => {
      if (ind == index) {
        element[attribute] = e.target.value;
      }
      return element;
    });
    setSocial(newRecord);
  }

  function fillPanel(panel) {
    console.log(panel);
    if (panel == "images") {
      return (
        <>
          {images.map((element, index) => {
            console.log(element);
            return (
              <div key={index}>
                <div className="upper">
                  <input
                    type="text"
                    placeholder="Name"
                    value={`${element.name}`}
                    onChange={(e) => updateImages(index, "name", e)}
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={`${element.url}`}
                    onChange={(e) => updateImages(index, "url", e)}
                  />
                </div>
                {/* <textarea
                  placeholder="Description"
                  value={`${element.description}`}
                  onChange={(e) => updateImages(index, "description", e)}
                ></textarea> */}
              </div>
            );
          })}
        </>
      );
    } else if (panel == "social") {
      return (
        <>
          {social.map((element, index) => {
            return (
              <>
                <div className="upper social-card-container">
                  <input
                    type="text"
                    placeholder="Platform"
                    value={`${element.platform}`}
                    onChange={(e) => updateSocial(index, "platform", e)}
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={`${element.url}`}
                    onChange={(e) => updateSocial(index, "url", e)}
                  />
                </div>
              </>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {leads.map((element) => {
            return (
              <>
                <div className="upper">
                  <input
                    readOnly
                    type="text"
                    placeholder="Name"
                    value={`${element.name}`}
                  />
                  <input
                    readOnly
                    type="email"
                    placeholder="Email"
                    value={`${element.email}`}
                  />
                </div>
                <textarea
                  readOnly
                  placeholder="Message"
                  value={`${element.message}`}
                ></textarea>
              </>
            );
          })}
        </>
      );
    }
  }

  return (
    <>
      <div className="navbar">
        <h1>Admin Portal</h1>
      </div>
      <div className="operations">
        <button
          className="accordion"
          onClick={() => {
            setImagePanel(!imagePanel);
            // console.log(imagePanel);
          }}
        >
          Images
        </button>
        {imagePanel && (
          // <div className="panel">
          //   <div id="image-card">
          //     <div className="image-card-container">
          //       {/* <div className="upper">
          //         <input type="text" placeholder="Name" />
          //         <input type="text" placeholder="Image Name" />
          //       </div>
          //       <textarea placeholder="Description"></textarea>
          //       fillPanel("images")*/}
          //       {/* <div>
          //         <input type="file" />
          //         <button>remove</button>
          //         <button>upload</button>
          //       </div>
          //       <div>
          //         <input type="file" />
          //         <button>remove</button>
          //         <button>upload</button>
          //       </div> */}
          //       {fillPanel("images")}
          //     </div>
          //   </div>
          //   <button onClick={() => addEntry("images")}>Add Item</button>
          //   <button
          //     onClick={() => {
          //       onSave();
          //     }}
          //   >
          //     Save
          //   </button>
          // </div>
          <AddImage
            images={images}
            setImages={setImages}
            updateImage={updateImages}
            onSave={onSave}
            addEntry={addEntry}
          />
        )}

        <button
          className="accordion"
          onClick={() => setSocialPanel(!socialPanel)}
        >
          Social
        </button>
        {socialPanel && (
          <div className="panel">
            <div id="social-card">
              <div className="upper social-card-container">
                {/* <input type="text" placeholder="Platform" />
                <input type="text" placeholder="URL" /> */}
              </div>
              {fillPanel("social")}
            </div>
            <button onClick={() => addEntry()}>Add Item</button>
            <button
              onClick={() => {
                onSave();
              }}
            >
              Save
            </button>
          </div>
        )}
        <div className="lead-container">
          <button
            className="accordion"
            onClick={() => setLeadsPanel(!leadsPanel)}
          >
            Leads
          </button>
          <button onClick={() => genPdf()}>Download</button>
        </div>
        {leadsPanel && (
          <>
            <div className="panel" id="leads-panel">
              <div id="image-card">
                <div className="image-card-container">
                  {/* <div className="upper">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                  </div>
                  <textarea placeholder="Message"></textarea> */}
                  {fillPanel("leads")}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Admin;

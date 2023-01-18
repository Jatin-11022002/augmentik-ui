import { useEffect, useState } from "react";

function AddImage({ ...props }) {
  //console.log({ ...props });

  const [imageList, setImageList] = useState(props.images);

  useEffect(() => {
    props.setImages(imageList);
  }, [imageList]);

  async function onSave() {
    let result = await fetch("http://127.0.0.1:8000/updateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageList }),
    });
  }

  function updateImages(ind, attribute, e) {
    let newRecord = imageList.map((element, index) => {
      if (ind == index) {
        element[attribute] = e.target.value;
      }
      return element;
    });
    setImageList(newRecord);
  }

  function addEntry() {
    setImageList([...imageList, { name: "", url: "", description: "" }]);
  }

  function removeEntry(index) {
    console.log(index);
    const list = [...imageList];
    list.splice(index, 1);
    setImageList(list);
  }

  return (
    <>
      <div className="panel">
        <div id="image-card">
          {imageList.map((element, index) => {
            //console.log(element);
            return (
              <div className="image-card-container" key={index}>
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
                  <button
                    className="btn-remove"
                    onClick={() => removeEntry(index)}
                  >
                    Remove
                  </button>
                </div>
                {/* <textarea
                  placeholder="Description"
                  value={`${element.description}`}
                  onChange={(e) => updateImages(index, "description", e)}
                ></textarea> */}
              </div>
            );
          })}
        </div>
        <button onClick={() => addEntry()}>Add Item</button>
        <button
          onClick={() => {
            props.onSave();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddImage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import PrevMemes from "./PrevMemes";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImg: "https://i.imgflip.com/54hjww.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);
  const [prevMemes, setPrevMemes] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) => setAllMemes(res.data.data.memes))
      .catch((err) => err);
  }, []);

  const getMemeImg = () => {
    const randNum = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randNum].url;
    setMeme((prevState) => ({
      ...prevState,
      randomImg: url,
    }));

    setPrevMemes((prevState) => [
      ...prevState,
      {
        topText: meme.topText,
        bottomText: meme.bottomText,
        randomImg: meme.randomImg,
        id: keyGen(),
      },
    ]);

    setMeme((prevState) => ({
      ...prevState,
      topText: "",
      bottomText: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function keyGen() {
    // this is a key generator so that there will not be two mapped items with the same key
    let newKey = Math.floor(Math.random() * 10000 + 2);
    return newKey;
  }

  const [toastMeme, setToastMeme] = useState();

  function editMemeSelect(e) {
    // this function itterates through the dynamically created array of previouse memes looking for the active meme
    document.getElementById("bottomToastInput").value = "";
    document.getElementById("topToastInput").value = "";
    let toast = document.getElementById("editToast");
    let screen = document.getElementById("screen");
    screen.classList.add("show");
    toast.classList.add("show");

    let searchId = parseInt(e.target.parentElement.id);
    let query = prevMemes.findIndex((item) => item.id === searchId);
    let selected = prevMemes[query];
    console.log(selected);

    setToastMeme(
      // this sets the back ground image and text of the chosen meme for editing
      <div className="toasty" id={selected.id} style={{ backgroundImage: `url(${selected.randomImg})` }}>
        <h2 id="top" onClick={editToast} className="prevMemeText-top center">
          {selected.topText}
        </h2>
        <h2 id="bottom" className="prevMemeText-bottom center">
          {selected.bottomText}
        </h2>
      </div>
    );
  }

  function editToast(e) {
    // this function does the actual editing and uses the setPrevMemes funciton
    let id = parseInt(document.getElementById("topToastInput").parentElement.parentElement.childNodes[2].childNodes[0].id);
    let query = prevMemes.findIndex((item) => item.id === id);
    setPrevMemes((prevState) => {
      let result = [...prevState];
      result[query].topText = document.getElementById("topToastInput").value;
      result[query].bottomText = document.getElementById("bottomToastInput").value;
      return result;
    });
  }

  function hide() {
    // this is the little red X on the bottom right corner it hides the toast after you are done edting
    let toast = document.getElementById("editToast");
    toast.classList.remove("show");
    let screen = document.getElementById("screen");
    screen.classList.remove("show");
  }

  function deletePrevMeme(e) {
    let searchId = parseInt(e.target.parentElement.parentElement.childNodes[2].childNodes[0].id);
    let query = prevMemes.findIndex((item) => item.id === searchId);
    console.log(query);
    setPrevMemes((prevState) => {
      let result = [...prevState];
      result.splice(query, 1);
      return result;
    });
    hide();
  }

  const memeCards = prevMemes.map((item) => {
    return <PrevMemes key={item.id} id={item.id} image={item.randomImg} topText={item.topText} bottomText={item.bottomText} editMemeSelect={editMemeSelect} />;
  });

  return (
    <>
      <div id="screen"></div>
      <div id="editToast">
        <span>
          <input type="text" id="topToastInput" placeholder="top text" onChange={editToast}></input>
          <input type="text" id="bottomToastInput" placeholder="bottom text" onChange={editToast}></input>
        </span>
        <button id="hide" onClick={hide}>
        <span class="material-symbols-outlined">done</span>
        </button>
        <center>{toastMeme}</center>
        <center>
          <button id="deleteButton" onClick={deletePrevMeme}>
            Delete
          </button>
        </center>
      </div>

      <div className="main">
        <div className="form">
          <input type="text" placeholder="Top text" className="topText" name="topText" value={meme.topText} onChange={handleChange} />
          <input type="text" placeholder="Bottom text" className="bottomText" name="bottomText" value={meme.bottomText} onChange={handleChange} />
          <button className="formButton button" onClick={getMemeImg}>
            Get random image
          </button>
        </div>
        <div className="meme">
          <img src={meme.randomImg} alt="" className="memeImg" />
          <h2 className="memeText top" value={meme.topText}>
            {meme.topText}
          </h2>
          <h2 className="memeText bottom" value={meme.bottomText}>
            {meme.bottomText}
          </h2>
        </div>
        <section className="memeCards">{memeCards}</section>
      </div>
    </>
  );
};

export default Meme;
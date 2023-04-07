import React, {useState, useEffect} from "react";
import axios from "axios";
import PrevMemes from "./PrevMemes";

const Meme = () =>{
    const [meme, setMeme] = useState({
        topText: '', 
        bottomText: '',
        randomImg: ''
    })

    const [allMemes, setAllMemes] = useState([])
    const [memeArr, setMemeArr] = useState([])
    const [prevMemes, setPrevMemes] = useState([])

    useEffect(()=>{
        axios.get('https://api.imgflip.com/get_memes')
            .then(res => setAllMemes(res.data.data.memes))
            .catch(err => err)
    }, [])

    const getMemeImg = () =>{
        const randNum = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randNum].url
        setMeme(prevState =>({
            ...prevState,
            randomImg: url
        }))

        setMemeArr([meme.topText, meme.bottomText])
        setMeme(prevState => ({
            ...prevState,
            topText: '',
            bottomText: ''
        }))

        setPrevMemes(prevState => [
            ...prevState,
            {
                topText: memeArr[0], 
                bottomText: memeArr[1],
                randomImg: meme.randomImg
            }
        ])
    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(prevMemes)

    const memeCards = prevMemes.map(item => {
        return (
            <PrevMemes
                key={item.randomImg}
                image={item.randomImg}
                topText={item.topText}
                bottomText={item.bottomText}
            />
        )
    })


    return (
        <div className="main">
            <div className="form">
                <input
                    type='text'
                    placeholder="Top text"
                    className="topText"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="bottomText"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="formButton" onClick={getMemeImg}>Get random image</button>
            </div>
            <div className="meme">
                <img src={meme.randomImg} className="memeImg"/>
                <h2 className="memeText top">{memeArr[0]}</h2>
                <h2 className="memeText bottom">{memeArr[1]}</h2>
            </div>
            <section className="memeCards">
                {memeCards}
            </section>
            
        </div>
    )
}

export default Meme
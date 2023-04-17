import React from "react";
const PrevMemes = (props) =>{
    return(
       <>
        {props.image && <div  className="PrevMemes" id={props.id} style={{backgroundImage: `url(${props.image})`}} >
                {/* <img src={props.image} alt="" className="prevMemeImg"/> */}
                <h2 className="prevMemeText-top">{props.topText}</h2>
                <h2 className="prevMemeText-bottom">{props.bottomText}</h2>
                <button onClick={props.editMemeSelect} className="editMemeBtn">...</button>
        </div>}
        </>
    )
}

export default PrevMemes
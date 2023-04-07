import React, {useState} from "react";

const PrevMemes = (props) =>{
    return(
        <div className="PrevMemes">
                <img src={props.image} className="prevMemeImg"/>
                <h2 className="prevMemeText-top">{props.topText}</h2>
                <h2 className="prevMemeText-bottom">{props.bottomText}</h2>
        </div>
    )
}

export default PrevMemes
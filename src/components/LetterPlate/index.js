import React from 'react';

import './style.css';


const LetterPlate = (props) => {

    return (
        <div className={`${props.visible ? 'show' : 'hide'} ${props.variation}`}>
            <div id="plate" className={`${props.explode ? 'explode' : ''}`}>
                <span>{props.letter}</span>
            </div>
        </div>
    );
}

export default LetterPlate;
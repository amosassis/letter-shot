import React from 'react';

import './style.css';

const ScoreBoard = (props) => {
    return (
        <div id="score-board">
            <div>
                <span>Pontos</span>
                {props.score}
            </div>
            <div>
                <span>Sequência</span>
                {props.hits}
            </div>

        </div>
    );
}

export default ScoreBoard;
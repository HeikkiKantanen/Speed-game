import React from "react";

const closeHandler = () => {
    window.location.reload();
};

const GameOver = (props) => {
    return (
        <div className="popup-wrapper">
            <div className="popup">
                <button onClick={closeHandler}>X</button>
                <h2>Game over</h2>
                <p> Your Score: {props.score} </p>
            </div>
        </div>
    );
};

export default GameOver;
import React, { Component } from "react";
import Circle from "./Circle";
import { circles } from "./circles";
import GameOver from "./GameOver";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
  };

  timer = undefined;
  pace = 1500;

  
  clickHandler = () => {
    this.setState ({
      score: this.state.score + 10,
    });
  };

  nextCircle = () => {
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4)
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
    });
    this.pace *= 0.95;
    this.timer = setTimeout (this.nextCircle, this.pace);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);

    this.setState({
      gameOver: true,
    });
  };



    render() {
      return (
        <div>
          {this.state.gameOver && <GameOver score={this.state.score} />}
          <h1>Speed Game</h1>
            <div className="circle-wrapper">
              {circles.map((c) => (
              <Circle 
                key={c.id} 
                color={c.color} 
                id={c.id}
                click={this.clickHandler} 
                active={this.state.current === c.id}
              />
              ))}
            </div>
              <p className="score">Your Score: {this.state.score}</p>
            <div>
              <button onClick={this.startHandler}>Start</button>
              <button onClick={this.stopHandler}>Stop</button>
            </div>
        </div>
      );
    };
  };

export default App;

import React, { Component } from "react";
import Circle from "./Circle";
import { circles } from "./circles";
import GameOver from "./GameOver";

import startSound from "./assets/sounds/one.wav"
import endSound from "./assets/sounds/Death-of-a-Ninja-(Game-Over).mp3"
import clickSound from "./assets/sounds/boxer.wav"

let gameStartSound = new Audio(startSound);
let gameEndSound = new Audio(endSound);
let gameClickSound = new Audio(clickSound);


const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
    pace: 1500,
    rounds: 0,
    gameStart: false
  };

  timer = undefined;

  clickPlay = () => {
      if(gameClickSound.paused) {
        gameClickSound.play();
      } else {
        gameClickSound.currentTime = 0;
      }
    };
  

  clickHandler = (id) => {
    this.clickPlay();

    console.log("you clicked: ", id);

    if(this.state.current !== id) {
      this.stopHandler();
      return;
    }

    this.setState ({
      score: this.state.score + 10,
      rounds: 0,
    });
  };

  nextCircle = () => {

    if(this.state.rounds >= 5) {
      this.stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInteger(1, 4)
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout (this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    gameStartSound.play();
    this.nextCircle();
    this.setState({
      gameStart: true,
    });
  };

  stopHandler = () => {
    gameStartSound.pause();
    gameEndSound.play();
    clearTimeout(this.timer);

    this.setState({
      gameOver: true,
      current: 0,
      gameStart: false,
    });
  };

  closeHandler = () => {
    gameEndSound.pause();
    this.setState({
      gameOver: false,
      score: 0,
      pace: 1500,
      rounds: 0,
    });
  };

    render() {
      return (
        <div>
          {this.state.gameOver && <GameOver score={this.state.score} close={this.closeHandler} />}
          <h1>Punch the Burglar</h1>
            <div className="circle-wrapper">
              {circles.map((c) => (
              <Circle 
                key={c.id} 
                color={c.color} 
                id={c.id}
                click={() => this.clickHandler(c.id)} 
                active={this.state.current === c.id}
                disabled={this.state.gameStart}
              />
              ))}
            </div>
              <p className="score">Your Score: {this.state.score}</p>
            <div>
              <button disabled={this.state.gameStart} onClick={this.startHandler}>Start</button>
              <button onClick={this.stopHandler}>Stop</button>
            </div>
        </div>
      );
    };
  };

export default App;

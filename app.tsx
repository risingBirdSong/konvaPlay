//@ts-ignore
import { render } from "react-dom";
import * as React from "react";
import Konva from "konva";
import { Stage, Layer, Star, Text, Line } from "react-konva";
import MyStar from "./components/star";
import TestAnimate from "./components/animation";
import AnimateMe from "./components/animationtest";

type xYCoords = number[];

interface AppState {
  coords: xYCoords[];
}

const randomCoords = (): xYCoords[] => {
  return [...Array(10).keys()].map(() => [
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
  ]);
};
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      coords: [],
    };
    console.log(this.state.coords);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  async delay() {
    await new Promise((res, rej) => {
      setTimeout(() => {
        console.log("firing");
        res();
      }, 2000);
    });
    this.setState({ coords: randomCoords() });
  }

  componentDidMount() {
    this.setState({ coords: randomCoords() }, () => {
      console.log("state", this.state.coords);
    });
  }

  handleDragStart = (e: Konva.KonvaEventObject<DragEvent>, idx: number) => {
    //coords[idx] : [e.target.x, e.target.y]
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };
  handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, idx: number) => {
    let coordsCopy = this.state.coords;
    coordsCopy[idx] = [e.currentTarget.x(), e.currentTarget.y()];
    this.setState({ coords: coordsCopy }, () => {
      console.log("new state", this.state.coords[idx]);
    });
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };
  render() {
    console.log("window inner height", window.innerHeight);
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <TestAnimate />
          <AnimateMe />
          {this.state.coords.map((coord, i) => {
            let fillColor = "purple";
            return (
              <MyStar
                i={i}
                xCoord={coord[0]}
                yCoord={coord[1]}
                key={i}
                handleDragStart={this.handleDragStart}
                handleDragEnd={this.handleDragEnd}
                // handleDragStart={this.handleDragStart}
                // handleDragEnd={this.handleDragEnd}
              />
            );
          })}
          {this.state.coords.map((coord, i, arr) => {
            return i < arr.length - 1 ? (
              <Line
                points={[...coord, arr[i + 1][0], arr[i + 1][1]]}
                stroke={"blue"}
                key={i}
              />
            ) : (
              <Text text={"hello"} />
            );
          })}
        </Layer>
      </Stage>
    );
  }
}
export default App;

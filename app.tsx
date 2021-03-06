//@ts-ignore
import { render } from "react-dom";
import * as React from "react";
import Konva from "konva";
import { Stage, Layer, Star, Text, Line } from "react-konva";
import MyStar from "./components/star";
import TestAnimate from "./components/animation";
import AnimateMe from "./components/animationtest";
import Play from "./components/shapeplay";

type xYCoords = number[];

interface AppState {
  coords: xYCoords[];
}
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

  componentDidMount() {
    this.setState({ coords: [] }, () => {
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
      <Stage
        onClick={(e) => {
          console.log("", e.currentTarget.children[0].children);
          const newCoords = [e.evt.clientX.valueOf(), e.evt.clientY.valueOf()];
          const newState = [...this.state.coords].concat([newCoords]);
          this.setState({ coords: newState });
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {[...Array(30).keys()].map((val, i) => {
            return <Play />;
          })}
        </Layer>
      </Stage>
    );
  }
}
export default App;

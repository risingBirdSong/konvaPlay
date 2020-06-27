import * as React from "react";
//@ts-ignore
import { render } from "react-dom";
import Konva from "konva";
import { Stage, Layer, Star, Text, Line } from "react-konva";

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
          {this.state.coords.map((coord, i) => (
            <Star
              classname="astar"
              key={i}
              x={coord[0]}
              y={coord[1]}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable
              rotation={Math.random() * 180}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              onDragStart={(e) => {
                this.handleDragStart(e, i);
              }}
              onDragEnd={(e) => {
                this.handleDragEnd(e, i);
              }}
            />
          ))}
          {this.state.coords.map((coord, i) => {
            return (
              <Line
                points={[
                  ...coord,
                  window.innerWidth / 2,
                  window.innerHeight / 2,
                ]}
                stroke={"blue"}
                key={i}
              />
            );
          })}
        </Layer>
      </Stage>
    );
  }
}
export default App;

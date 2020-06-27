import * as React from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Star, Text, Line } from "react-konva";

interface AppState {
  coords?: number[][];
}

let randomCoords = [
  [125.67792229598118, 339.69832654978427],
  [124.67009388672125, 1262.8278540368387],
  [409.3965429267319, 971.027630387857],
  [161.15692013124377, 569.9817850222721],
  [216.5663929726785, 740.3904542173258],
  [354.21199373539565, 518.3037894845172],
  [324.37396908153795, 325.2443663269138],
  [263.3660878876791, 322.99296814103553],
  [370.3533158668567, 589.8276466743395],
];

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      //ok interesting this bug works on coding sandbox, makes me wonder if the problem is with parcel
      coords: randomCoords,
    };
    console.log(this.state.coords);
  }

  handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };
  handleDragEnd = (e) => {
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
          <Text text="Try to drag a star" />

          {[...Array(9)].map((_, i) => (
            <Star
              classname="astar"
              key={i}
              // x={Math.random() * window.innerWidth}
              y={this.state.coords[i][0]}
              x={this.state.coords[i][1]}
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
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <Line
              points={[
                this.state.coords[i][1],
                this.state.coords[i][0],
                this.state.coords[i + 1][1],
                this.state.coords[i + 1][0],
              ]}
              stroke="blue"
              closed={true}
              key={i}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById("root"));

import * as React from "react";
import Konva from "konva";
import {
  Stage,
  Layer,
  Star,
  Text,
  Line,
  Transformer,
  KonvaNodeComponent,
} from "react-konva";

interface PlayState {
  x: number;
  y: number;
}

class Play extends React.Component<{}, PlayState> {
  constructor(props: any) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    this.setState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    // this.timing();
  }

  change = () => {
    this.star.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2,
    });
  };

  timing = () => {
    setInterval(() => {
      this.change();
    }, 100);
  };
  render() {
    return (
      <Star
        ref={(node) => {
          //@ts-ignore
          this.star = node;
        }}
        onMouseEnter={this.timing}
        draggable
        innerRadius={20}
        outerRadius={40}
        x={this.state.x}
        y={this.state.y}
        onDragStart={this.change}
        onDragEnd={this.change}
        numPoints={6}
        fill="blue"
      />
    );
  }
}

export default Play;

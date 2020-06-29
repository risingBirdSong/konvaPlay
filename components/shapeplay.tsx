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

interface PlayProps {
  x: number;
}
interface PlayState {
  x: number;
  y: number;
}

let i = 0;

class Play extends React.Component<PlayProps, PlayState> {
  // private star!: KonvaNodeComponent<typeof Star, StarConfig>;
  constructor(props: any) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    this.setState({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });
    let animationSpeed = 30;
    this.anim = new Konva.Animation((frame) => {
      // console.log("sin time", Math.sin(frame!.time));
      let angleDiff = (frame?.timeDiff * animationSpeed) / 1000;
      // this.star.rotate(angleDiff);
      this.star.to({
        x: this.props.x,
        y: window.innerHeight / 2,
        duration: 2,
      });
      // console.log("logger", this.star.getAbsoluteScale());
    }, this.star.getLayer());
    this.anim.start();
  }

  componentWillUnmount() {
    this.anim.stop();
  }

  render() {
    return (
      <Star
        ref={(node) => {
          //@ts-ignore
          this.star = node;
        }}
        draggable
        innerRadius={20}
        outerRadius={40}
        x={this.state.x}
        y={this.state.y}
        numPoints={6}
        fill="blue"
      />
    );
  }
}

export default Play;

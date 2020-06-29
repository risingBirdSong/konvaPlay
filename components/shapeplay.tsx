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
import { Star, StarConfig } from "konva/types/shapes/Star";

interface PlayState {
  x: number;
  y: number;
}

class Play extends React.Component<{}, PlayState> {
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
      let angleDiff = (frame?.timeDiff * animationSpeed) / 1000;
      // this.star.rotate(angleDiff);
      this.star.to({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        // duration: 0.11,
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

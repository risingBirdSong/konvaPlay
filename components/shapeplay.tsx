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
  y: number;
}
interface PlayState {
  x: number;
  y: number;
  color: string;
}

let colors = ["red", "blue", "purple", "green", "orange"];

colors[Math.floor(colors.length * Math.random())];
class Play extends React.Component<PlayProps, PlayState> {
  // private star!: KonvaNodeComponent<typeof Star, StarConfig>;
  constructor(props: any) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      color: colors[Math.floor(colors.length * Math.random())],
    };
  }

  componentDidMount() {
    this.setState({
      x: window.innerWidth / 2 + Math.random() * 100,
      y: window.innerHeight / 2 + Math.random() * 100,
    });
    let animationSpeed = 30;
    this.anim = new Konva.Animation((frame) => {
      // console.log("sin time", Math.sin(frame!.time));
      let angleDiff = (frame?.timeDiff * animationSpeed) / 1000;
      // this.star.rotate(angleDiff);
      this.star.to({
        x: this.props.x + Math.random() * 40,
        y: this.props.y + Math.random() * 40,
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
        onClick={(e) => {
          e.cancelBubble = true;
          console.log("star attrs", e.currentTarget.attrs);
        }}
        name="star"
        draggable
        innerRadius={100}
        outerRadius={130}
        x={this.state.x}
        y={this.state.y}
        numPoints={6}
        fill={this.state.color}
      />
    );
  }
}

export default Play;

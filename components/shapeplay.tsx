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
  // private nodeStar! : Konva.St
  private nodeStar: React.RefObject<Konva.Star> = React.createRef();
  //todo type it
  // anim: any;

  // anim :  (func: AnimationFn, layers?: any) => Animation;

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
      this.nodeStar.current?.to({
        x: this.props.x + Math.random() * 100,
        y: this.props.y + Math.random() * 100,
        scaleX: 1,
        duration: 2,
        noisefalsy: 4,
        ignoreMe: "am i nan",
        notvalid: true,
        scalex: "close but not",
      });
      // console.log("logger", this.nodeStar.getAbsoluteScale());
    }, this.nodeStar.current?.getLayer());
    this.anim.start();
  }

  componentWillUnmount() {
    this.anim.stop();
  }

  render() {
    return (
      <Star
        ref={this.nodeStar}
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

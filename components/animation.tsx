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
import { Star } from "konva/types/shapes/Star";

class TestAnimate extends React.Component {
  // private test: KonvaNodeComponent;
  changeSize = () => {
    // to() is a method of `Konva.Node` instances
    //@ts-ignore
    this.star.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2,
    });
  };

  render() {
    return (
      <Star
        ref={(node) => {
          //@ts-ignore
          this.star = node;
        }}
        innerRadius={30}
        outerRadius={60}
        numPoints={5}
        draggable
        onDragEnd={this.changeSize}
        onDragStart={this.changeSize}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        fill="orange"
      />
    );
  }
}

export default TestAnimate;

// var velocity = 50;

// var anim = new Konva.Animation(function(frame) {
//   var dist = velocity * (frame.timeDiff / 1000);
//   node.move({x: dist, y: 0});
// }, layer);

// anim.start();

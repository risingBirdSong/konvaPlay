import * as React from "react";
import Konva from "konva";
import { Stage, Layer, Star, Text, Line, Rect } from "react-konva";

class AnimateMe extends React.Component {
  componentDidMount() {
    var angularSpeed = 90;
    this.anim = new Konva.Animation((frame) => {
      var angleDiff = (frame!.timeDiff * angularSpeed) / 1000;
      this.rect.rotate(angleDiff);
    }, this.rect.getLayer());

    this.anim.start();
  }
  componentWillUnmount() {
    this.anim.stop();
  }
  render() {
    return (
      // <stage width="{window.innerWidth}" height="{window.innerHeight}">
      //   <layer>
      <Rect
        x={50}
        y={50}
        width={50}
        height={50}
        fill="green"
        shadowblur={5}
        ref={(node) => {
          this.rect = node;
        }}
      />
      //   </layer>
      // </stage>
    );
  }
}

export default AnimateMe;

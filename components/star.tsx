import * as React from "react";
import Konva from "konva";
import { Star } from "react-konva";

interface MyStarProps {
  i: number;
  xCoord: number;
  yCoord: number;
  handleDragStart: (e: Konva.KonvaEventObject<DragEvent>, idx: number) => void;
  handleDragEnd: (e: Konva.KonvaEventObject<DragEvent>, idx: number) => void;
}

const MyStar = (props: MyStarProps) => {
  const [color, setColor] = React.useState("green");
  return (
    <Star
    
      classname="astar"
      key={props.i}
      x={props.xCoord}
      y={props.yCoord}
      numPoints={5}
      innerRadius={20}
      outerRadius={40}
      fill={color}
      opacity={0.8}
      draggable
      rotation={Math.random() * 180}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      onDragStart={(e) => {
        props.handleDragStart(e, props.i);
      }}
      onMouseEnter={() => {
        setColor("blue");
      }}
      onMouseOut={() => {
        setColor("purple");
      }}
      onDragEnd={(e) => {
        props.handleDragEnd(e, props.i);
      }}
    />
  );
};

export default MyStar;

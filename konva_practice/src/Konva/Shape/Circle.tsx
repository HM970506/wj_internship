import { Circle } from "react-konva";

const CircleComponent = () => {
  //원은 좌표를 중심으로 radius크기가 그려짐!
  const test = () => {
    console.log("동그라미");
  };
  return (
    <Circle
      x={100}
      y={100}
      radius={50}
      fill="green"
      stroke="black"
      strokeWidth={3}
      onClick={test}
    />
  );
};

export default CircleComponent;

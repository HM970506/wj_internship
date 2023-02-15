import { Ellipse } from "react-konva";

const EllipseComponent = () => {
  //타원도 좌표를 중심으로 radius크기가 그려짐

  return (
    <Ellipse
      x={300}
      y={100}
      fill="green"
      stroke="black"
      strokeWidth={3}
      radiusX={10}
      radiusY={50}
    />
  );
};

export default EllipseComponent;

import { Rect } from "react-konva";

const Shapes = () => {
  //사각형은 왼쪽 끝 꼭지점을 좌표 기준으로 시작하여 도형을 그림

  return (
    <Rect x={0} y={50} width={100} height={100} fill="red" shadowBlur={10} />
  );
};

export default Shapes;

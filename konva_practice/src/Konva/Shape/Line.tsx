import { Line } from "react-konva";

const LineComponent = () => {
  //linecap = 선 끝부분
  //dash [한 마디 길이, 마디간 여백 길이, 한 마디 길이, 마디간 여백 길이..]

  return (
    <>
      <Line
        x={20}
        y={200}
        points={[0, 0, 100, 0, 100, 100]}
        tension={0.5}
        closed
        stroke="black"
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
      />
      <Line
        x={20}
        y={300}
        points={[15, 70, 140, 23, 250, 60, 300, 20]}
        stroke="red"
        strokeWidth={15}
        lineCap="round"
        lineJoin="round"
      />
      <Line
        x={20}
        y={350}
        points={[15, 70, 140, 23, 250, 60, 300, 20]}
        stroke="green"
        strokeWidth={3}
        lineCap="round"
        dash={[40, 30]}
      />
      <Line
        x={20}
        y={400}
        points={[15, 70, 140, 23, 250, 60, 300, 20]}
        stroke="blue"
        strokeWidth={3}
        lineCap="round"
        dash={[40, 30, 5, 20, 10, 20]}
      />
      <Line
        x={20}
        y={450}
        points={[15, 70, 140, 23, 250, 60, 300, 20]}
        stroke="red"
        strokeWidth={15}
        lineCap="round"
        lineJoin="round"
        tension={0.5}
      />
    </>
  );
};

export default LineComponent;

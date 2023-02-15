import React from "react";
import { Stage } from "react-konva";
import EventIndex from "./Konva/Event/index";
import ShapeIndex from "./Konva/Shape/index";

const App = () => {
  //리액트로 작업할 때는 zIndex, moveToTop쓰지 말것!! 리액트에선 돔 직접 건드는거 아님!
  //대신 돔 순서를 바꿔 다시 빌드하기!
  //나중에 렌더될수록 z축 커짐!

  //layer에는 이벤트 적용 못 함. 이벤트는 stage에!
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <EventIndex />
    </Stage>
  );
};

export default App;

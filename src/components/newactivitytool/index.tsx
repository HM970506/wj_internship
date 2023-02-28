import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { useSelector } from "react-redux";
import {
  Background,
  Button,
  ButtonBox,
  Canvas,
  LoadButton,
  MainButton,
  NewButton,
  SubButton,
  ToolBox,
} from "./style";
import TextButton from "./text";
import { Text } from "react-konva";

const nodeMaker = (value: any, key: number) => {
  switch (value.type) {
    case "text":
      return <Text text={value.content} key={key} />;
  }
};

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<any[]>([]);
  const nodes = useSelector((state: any) => state.node.nodes);

  useEffect(() => {
    if (activitytools) newActivityTool.current?.showModal();
    else newActivityTool.current?.close();
  }, [activitytools]);

  useEffect(() => {
    setCanvas(nodes);
  }, [nodes]);

  const mainClick = () => {
    if (!activitytools) setSubButtonVisible((x) => !x);
    else {
      setSubButtonVisible(false);
      setActivitytools(false);
    }
  };

  const activitytoolsStart = () => {
    setSubButtonVisible(false);
    setActivitytools(true);
  };

  const activitytoolsEnd = () => {
    setActivitytools(false);
  };

  //버튼들은 useCallback 등으로 메모이제이션 해두고,
  //값은 redux로 계속 불러오기

  return (
    <>
      <Background ref={newActivityTool}>
        <ToolBox>
          <Button onClick={activitytoolsEnd}>나가기</Button>
        </ToolBox>
        <ButtonBox>
          <TextButton />
          <Button>녹음</Button>
          <Button>사진</Button>
          <Button>스티커</Button>
          <Button>도구</Button>
          <Button>test</Button>
        </ButtonBox>

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {Array.isArray(canvas) &&
              canvas.map((value: any, key: number) => nodeMaker(value, key))}
          </Layer>
        </Stage>
      </Background>

      {!activitytools && (
        <>
          <MainButton onClick={mainClick}>test</MainButton>
          {subButtonVisible && (
            <>
              <LoadButton>불러오기</LoadButton>
              <NewButton onClick={activitytoolsStart}>새로하기</NewButton>
            </>
          )}
        </>
      )}
    </>
  );
}

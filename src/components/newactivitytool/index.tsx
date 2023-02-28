import { useEffect, useRef, useState } from "react";
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

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);

  useEffect(() => {
    if (activitytools) newActivityTool.current?.showModal();
    else newActivityTool.current?.close();
  }, [activitytools]);

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

  return (
    <>
      <Background ref={newActivityTool}>
        <ToolBox>
          <Button onClick={activitytoolsEnd}>나가기</Button>
        </ToolBox>
        <ButtonBox>
          <Button>글상자</Button>
          <Button>녹음</Button>
          <Button>사진</Button>
          <Button>스티커</Button>
          <Button>도구</Button>
          <Button>test</Button>
        </ButtonBox>

        <Canvas />
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

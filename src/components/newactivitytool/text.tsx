import { Button, SideButton, SideButtonBox } from "./style";
import { actions } from "../../store/common/nodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const BIG = 25;
const MIDIUM = 20;
const SMALL = 15;

export default function TextButton() {
  const dispatch = useDispatch();
  const [showSideButtons, setShowSideButtons] = useState<boolean>(false);

  const addNodes = (size: number) => {
    dispatch(
      actions.addNodes({
        type: "TEXT",

        shapeProps: {
          fontSize: size,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          text: "내용을 입력하세요",
        },
      })
    );
  };

  return (
    <>
      {showSideButtons && (
        <SideButtonBox>
          <SideButton
            size={BIG}
            onClick={() => {
              addNodes(BIG);
            }}
          >
            큰 글자
          </SideButton>
          <SideButton
            onClick={() => {
              addNodes(MIDIUM);
            }}
            size={MIDIUM}
          >
            중간 글자
          </SideButton>
          <SideButton
            onClick={() => {
              addNodes(SMALL);
            }}
            size={SMALL}
          >
            작은 글자
          </SideButton>
        </SideButtonBox>
      )}
      <Button
        onClick={() => {
          setShowSideButtons((x) => !x);
        }}
      >
        글상자
      </Button>
    </>
  );
}

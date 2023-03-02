import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage, Transformer, Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  Background,
  Button,
  ButtonBox,
  LoadButton,
  MainButton,
  NewButton,
  SubButton,
  ToolBox,
} from "./style";
import TextButton from "./text";
import * as konva from "konva/lib/Node";
import StickerButton from "./sticker";

const STICKER = "STICKER";
const TEXT = "TEXT";
type NodeType = "STICKER" | "TEXT";

const Node = ({
  type,
  text,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: {
  type: NodeType;
  text: string;
  shapeProps: any;
  isSelected: any;
  onSelect: any;
  onChange: any;
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef(null);

  useEffect(() => {
    console.log(typeof trRef.current);
    if (isSelected && trRef) {
      //  trRef.current?.nodes([shapeRef.current]);
      //  trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  switch (type) {
    case TEXT:
      return (
        <>
          <Text
            text={text}
            draggable={true}
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
          />
          <Transformer ref={trRef} />
        </>
      );
    case STICKER:
      return (
        <>
          <Rect
            draggable={true}
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            {...shapeProps}
            onDragEnd={(e) => {
              onChange({
                ...shapeProps,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
            onTransformEnd={(e) => {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              node.scaleX(1);
              node.scaleY(1);
              onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                // set minimal value
                // width: Math.max(5, node.width() * scaleX),
                //  height: Math.max(node.height() * scaleY),
              });
            }}
          />
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) return oldBox;
              else return newBox;
            }}
          />
        </>
      );
  }

  return <></>;
};

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [activitytools, setActivitytools] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<any[]>([]);
  const [selecteShape, selectShape] = useState<number | null>(null);
  const canvasRef = useRef(null);
  const nodes = useSelector((state: any) => state.node.nodes);
  const dispatch = useDispatch();

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

  //배경 누르면 선택 없애기
  const checkDeselect = (
    e: konva.KonvaEventObject<TouchEvent> | konva.KonvaEventObject<MouseEvent>
  ) => {
    if (e.target == canvasRef.current) selectShape(null);
  };

  //변화하면, 리덕스 값을 수정합니다
  const shapeChange = (newAttr: any) => {};

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
          <StickerButton />
          <Button>도구</Button>
          <Button>test</Button>
        </ButtonBox>

        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={canvasRef}
        >
          <Layer>
            {Array.isArray(canvas) &&
              canvas.map((value: any, key: number) => {
                return (
                  <Node
                    key={key}
                    type={value.type}
                    shapeProps={value.shapeProps}
                    text={value.content}
                    isSelected={key === selecteShape}
                    onSelect={() => {
                      selectShape(key);
                    }}
                    onChange={(newAttrs: any) => {
                      shapeChange(newAttrs);
                    }}
                  />
                );
              })}
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

import { SetStateAction, useEffect, useReducer, useRef, useState } from "react";
import { Layer, Rect, Stage, Transformer, Text, Line } from "react-konva";
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
import Konva from "konva";
import StickerButton from "./sticker";
import { actions as nodeActions } from "../../store/common/nodeSlice";
import { actions as drawActions } from "../../store/common/drawSlice";

const STICKER = "STICKER";
const TEXT = "TEXT";
const LINE = "LINE";
const ERASER = "ERASER";
type NodeType = "STICKER" | "TEXT" | "LINE" | "ERASER";
type cursorMove =
  | Konva.KonvaEventObject<TouchEvent>
  | Konva.KonvaEventObject<MouseEvent>;

interface drawPenType {
  pen: string;
  color: string;
  size: number;
}

const Node = ({
  type,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: {
  type: NodeType;
  shapeProps: any;
  isSelected: boolean;
  onSelect: any;
  onChange: any;
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  switch (type) {
    case TEXT:
      return (
        <>
          <Text
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDragStart={onSelect}
            ref={shapeRef}
            {...shapeProps}
          />
          {isSelected && <Transformer ref={trRef} />}
        </>
      );
    case STICKER:
      return (
        <>
          <Rect
            onClick={onSelect}
            onTap={onSelect}
            onDragStart={onSelect}
            ref={shapeRef}
            draggable
            {...shapeProps}
            onDragEnd={(e) => {
              onChange({
                ...shapeProps,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />
          {isSelected && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) return oldBox;
                else return newBox;
              }}
            />
          )}
        </>
      );
    case LINE:
      return (
        <Line
          tension={0.5}
          lineCap="round"
          globalCompositeOperation="source-over"
          {...shapeProps}
        />
      );
    case ERASER:
      return (
        <Line
          points={[1]}
          tension={0.5}
          lineCap="round"
          globalCompositeOperation="destination-out"
          {...shapeProps}
        />
      );
  }

  return <></>;
};

export default function NewActivityTool() {
  const newActivityTool = useRef<HTMLDialogElement>(null);
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false); //우측 버튼
  const [activitytools, setActivitytools] = useState<boolean>(false); //하단 버튼과 캔버스
  const [canvas, setCanvas] = useState<any[]>([]); //노드들이 쌓이는 캔버스
  const [selectShapeIndex, setSelectShapeIndex] = useState<number | null>(null); //현재 선택 노드
  const canvasRef = useRef(null);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes);
  const draws = useSelector((state: any) => state.drawReducer);
  const dispatch = useDispatch();

  //노드가 생성될 때마다 캔버스가 업데이트된다
  useEffect(() => {
    setCanvas(nodes);
  }, [nodes]);

  //버튼 관련 부분 시작----
  //버튼들은 useCallback 등으로 메모이제이션 해두기~
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

  //버튼 관련 부분 끝-----

  const checkDeselect = (e: cursorMove) => {
    if (e.target == canvasRef.current) setSelectShapeIndex(null);
  };

  const shapeChange = (newAttr: any) => {};

  const colorChange = (color: string) => {
    if (selectShapeIndex == null) dispatch(drawActions.colorChange(color));
    else {
      dispatch(
        nodeActions.modifyNodes({
          index: selectShapeIndex,
          modifyProps: { fill: color },
        })
      );
    }
  };

  const nodeRemove = () => {
    if (selectShapeIndex != null)
      dispatch(nodeActions.removeNodes(selectShapeIndex));
  };

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleMouseDown = (e: cursorMove) => {
    setIsDrawing(true);
    const pos = e.target.getStage()?.getPointerPosition();
    dispatch(
      nodeActions.addNodes({
        type: "LINE",
        shapeProps: {
          stroke: draws.color,
          strokeWidth: draws.size,
          points: [pos?.x, pos?.y],
        },
      })
    );
  };

  const handleMouseMove = (e: cursorMove) => {
    if (isDrawing) {
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      const index = nodes.length - 1;
      dispatch(
        nodeActions.modifyNodes({
          index: index,
          modifyProps: {
            points: [...nodes[index].shapeProps.points, point?.x, point?.y],
          },
        })
      );
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const mouseDown = (e: cursorMove) => {
    if (draws.tool !== "") handleMouseDown(e);
    else checkDeselect(e);
  };

  const toolChagne = (tool: string) => {
    dispatch(drawActions.toolChange(tool));
  };

  const sizeChange = (size: number) => {
    dispatch(drawActions.sizeChange(size));
  };

  return (
    <>
      <Background ref={newActivityTool}>
        <ToolBox>
          <Button onClick={activitytoolsEnd}>나가기</Button>
          <Button onClick={nodeRemove}>지우기</Button>
          <button
            onClick={() => {
              toolChagne("PEN");
            }}
          >
            펜
          </button>
          <button onClick={() => colorChange("black")}>검은색</button>
          <button onClick={() => colorChange("blue")}>파란색</button>
          <button onClick={() => sizeChange(20)}>큰 브러쉬</button>
          <button onClick={() => sizeChange(3)}>작은 브러쉬</button>
          <button onClick={() => toolChagne("ERASER")}>지우개</button>
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
          onMouseDown={mouseDown}
          onTouchStart={checkDeselect}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
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
                    isSelected={key === selectShapeIndex}
                    onSelect={() => {
                      setSelectShapeIndex(key);
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

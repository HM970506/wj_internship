import { KonvaEventObject } from "konva/lib/Node";
import {
  Dispatch,
  LegacyRef,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Konva from "react-konva";
import {
  KonvaNodeComponent,
  Layer,
  Rect,
  Stage,
  Transformer,
} from "react-konva";

interface shapePropsType {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
}

interface RantangleType {
  shapeProps: shapePropsType;
  isSelected: boolean;
  onSelect: any;
  onChange: any;
}

const Rectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: RantangleType) => {
  const shapeRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragStart={onSelect}
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

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            else return newBox;
          }}
        />
      )}
    </>
  );
};

const ClickComponent = () => {
  const [rectangles, setRectangles] = useState(Rectangles);
  const [selectedId, selectShape] = useState<string | null>(null);

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) selectShape(null);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => selectShape(rect.id)}
              onChange={(newAttrs: shapePropsType) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};
export default ClickComponent;

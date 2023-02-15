import { Layer } from "react-konva";
import CircleComponent from "./Circle";
import EllipseComponent from "./Ellipse";
import ImageComponent from "./Image";
import LabelComponent from "./Label";
import LineComponent from "./Line";
import RectComponent from "./Rect";
import TextComponent from "./Text";

const ShapeIndex = () => (
  <Layer>
    <RectComponent />
    <CircleComponent />
    <TextComponent />
    <LabelComponent />
    <EllipseComponent />
    <LineComponent />
    <ImageComponent />
  </Layer>
);
export default ShapeIndex;

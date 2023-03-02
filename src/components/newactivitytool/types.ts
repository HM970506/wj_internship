import Konva from "konva";

export const STICKER = "STICKER";
export const TEXT = "TEXT";
export const PEN = "PEN";
export const ERASER = "ERASER";
export type NodeType = "STICKER" | "TEXT" | "PEN" | "ERASER";
export type cursorMove =
  | Konva.KonvaEventObject<TouchEvent>
  | Konva.KonvaEventObject<MouseEvent>;

export type TransformerType = Konva.Transformer;

export interface drawPenType {
  tool: string;
  color: string;
  size: number;
}

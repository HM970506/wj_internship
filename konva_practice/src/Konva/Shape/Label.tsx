import { Label, Tag, Text } from "react-konva";

const LabelComponent = () => {
  //pointer를 붙여서 말풍선같은 표현이 가능하다
  return (
    <Label x={300} y={300}>
      <Tag
        fill="red"
        pointerDirection="down"
        pointerWidth={10}
        pointerHeight={10}
      />
      <Text text="hello" padding={5} />
    </Label>
  );
};

export default LabelComponent;

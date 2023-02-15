import * as Konva from "react-konva";

const ClickComponent = () => {
  const onclick = () => {
    console.log("동그라미");
  };

  const ondragestart = () => {
    console.log("드래그 시작");
  };
  const ondrageend = () => {
    console.log("드래그 끝");
  };

  const ondragmove = () => {
    console.log("움직여움직여");
  };

  const image = new Image();
  image.src = "https://konvajs.org/assets/lion.png";

  return (
    <Konva.Image
      x={0}
      y={500}
      image={image}
      onDragStart={ondragestart}
      onDragMove={ondragmove}
      onDragEnd={ondrageend}
      draggable={true}
    />
  );
};
export default ClickComponent;

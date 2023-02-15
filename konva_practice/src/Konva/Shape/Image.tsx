import React from "react";
import * as Konva from "react-konva";

const ImageComponent = () => {
  const image = new Image();
  image.src = "https://konvajs.org/assets/lion.png";

  return <Konva.Image x={0} y={500} image={image} />;
};

export default ImageComponent;

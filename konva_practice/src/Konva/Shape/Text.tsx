import { Text, TextPath } from "react-konva";

const TextComponent = () => {
  return (
    <>
      <Text text=";ㅅ;" x={100} y={100} fontSize={15} zIndex={3} />
      <TextPath
        text="dmdkliaweoiedklㄴㄹㅇㅇㄹㅇㄹㅇㄹㅇㅇㄹㄹㅇㄹㅇㅇㄹdkfopdowioieo;zskdlkdkckciviviodio"
        x={100}
        y={100}
        fontSize={15}
        fill={"#333"}
        data={"M10,10 C0,0 10,150 100,100 S300,150 5.0.300"}
        zIndex={3}
      />
    </>
  );
};

export default TextComponent;

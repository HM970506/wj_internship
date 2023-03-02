import { useDispatch } from "react-redux";
import { actions } from "../../store/common/nodeSlice";
import { Button } from "./style";

export default function StickerButton() {
  const dispatch = useDispatch();

  const addNodes = () => {
    dispatch(
      actions.addNodes({
        type: "STICKER",
        shapeProps: {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          fill: "red",
        },
      })
    );
  };

  return <Button onClick={addNodes}>스티커</Button>;
}

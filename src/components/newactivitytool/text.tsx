import { Button } from "./style";
import { actions } from "../../store/common/nodeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TextButton() {
  const dispatch = useDispatch();

  const addNodes = () => {
    dispatch(actions.addNodes({ type: "text", content: "test" }));
  };

  return <Button onClick={addNodes}>글상자</Button>;
}

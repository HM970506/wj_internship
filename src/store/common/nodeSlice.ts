import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "node",
  initialState: { nodes: new Array() },

  reducers: {
    addNodes: (state, action: PayloadAction<any>) => {
      state.nodes.push(action.payload);
      console.log(JSON.stringify(state.nodes));
    },
  },
});

export const actions = nodeSlice.actions;
export default nodeSlice.reducer;

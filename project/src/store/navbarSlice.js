import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: { value: "all" },
  reducers: {
    chooseCategory(state, action) {
      state.value = action.payload;
    },
  },
});

export const { chooseCategory } = navbarSlice.actions;
export default navbarSlice.reducer;

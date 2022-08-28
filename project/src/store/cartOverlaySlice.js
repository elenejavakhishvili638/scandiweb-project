import {createSlice} from "@reduxjs/toolkit"

const cartOverlaySlice = createSlice({
    name: "cartOverlay",
    initialState: {overlay: false},
    reducers: {
        cartOverlay(state, action) {
            state.overlay = !state.overlay
        }
        
    }
})

export const {cartOverlay} = cartOverlaySlice.actions
export default cartOverlaySlice.reducer
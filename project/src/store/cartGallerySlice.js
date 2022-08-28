import {createSlice} from "@reduxjs/toolkit"

const cartGallerySlice = createSlice({
    name: "cartGallery",
    initialState: {value: 0},
    reducers: {
        choosePicture(state, action) {
            state.value = action.payload
        },
        leftPicture (state, action) {
            state.value--
        },
        rightPicture (state, action) {
            state.value++
        }
    }
})

export const {leftPicture, rightPicture, choosePicture} = cartGallerySlice.actions
export default cartGallerySlice.reducer
import {createSlice} from "@reduxjs/toolkit"

const holdAttributeSlice = createSlice({
    name: "holdAttribute",
    initialState: {colorAttribute: '', attribute: []},
    reducers: {
        holdAttribute(state, action) {
            state.colorAttribute = action.payload
        },
        chooseAttribute(state,action) {
            console.log("choose", action.payload)
            let newAttrs = state.attribute.filter(x=>x.key !== action.payload.key);

            return {attribute: [...newAttrs, action.payload]}
        }
    }
})

export const {holdAttribute, chooseAttribute} = holdAttributeSlice.actions
export default holdAttributeSlice.reducer
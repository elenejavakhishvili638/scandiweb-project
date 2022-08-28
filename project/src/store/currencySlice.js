import {createSlice} from "@reduxjs/toolkit"

const currencySlice = createSlice({
    name: "currency",
    initialState: {value: "$"},
    reducers: {
        chooseCurrency(state, action) {
            state.value = action.payload
        }
    }
})

export const {chooseCurrency} = currencySlice.actions
export default currencySlice.reducer
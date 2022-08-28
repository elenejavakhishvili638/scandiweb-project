import {configureStore} from "@reduxjs/toolkit"
import currencySliceReducer from "./currencySlice"
import cartSliceReducer from "./cartSlice"
import navbarSliceReducer from "./navbarSlice"
import cartOverlayReducer from "./cartOverlaySlice"
import holdAttributeReducer from "./holdAttributeSlice"

const store = configureStore({
    reducer: {
        currency: currencySliceReducer,
        cart: cartSliceReducer,
        navbar: navbarSliceReducer,
        cartOverlay: cartOverlayReducer,
        holdAttribute: holdAttributeReducer
    }
})

export default store
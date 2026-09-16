import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Cart {
    count: number;
}

export interface UserState {
    value: Cart
}


const initialState: UserState = {
    value: {
        count: 0
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setCount: (state, action: PayloadAction<number>) => {
            state.value.count = action.payload
        },
        increaseCount: (state) => {
            // console.log({ action });
            state.value.count += 1;
            // console.log("Payload:", action.payload);
        },
        decreaseCount: (state) => {
            if (state.value.count > 0) {
                state.value.count -= 1
            }
        },
        resetCount: (state) => {
            state.value.count = 0
        }
    },
})

// Action creators are generated for each case reducer function
export const { increaseCount, decreaseCount, setCount, resetCount } = cartSlice.actions

export default cartSlice.reducer
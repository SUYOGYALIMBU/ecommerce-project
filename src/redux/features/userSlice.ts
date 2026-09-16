import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserProfile {
    firstName: string,
    email: string,
    role: string,
    isAdmin: boolean,
    isSeller: boolean
}

export interface UserState {
    value: null | UserProfile
    }


const initialState: UserState = {
    value: null

    // {
    //     firstName: "Ram",
    //     email: "ram@gmail.com",
    //     role: "seller"
    // }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<UserProfile>) => {
            // console.log({ action });
            state.value = action.payload
            // console.log("Payload:", action.payload);

            // state.value = {
            //     firstName: "Ram",
            //     email: "ram@gmail.com",
            //     role: "seller"
            // }
        },
        logout: (state) => {
            state.value = null
            localStorage.removeItem("token")
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
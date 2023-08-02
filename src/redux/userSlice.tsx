import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    value: {
        isLoggedIn: false
    }
}

type UserLoginDetails = {
    name: string,
    password: string
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserLoginDetails>) => {
            state.value.isLoggedIn = action.payload.name == 'ryan' && action.payload.password == 'awesome'
        }
    }
})

export const { login } = userSlice.actions
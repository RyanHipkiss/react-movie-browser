import { configureStore } from '@reduxjs/toolkit'
import { searchSlice } from './searchSlice'
import { userSlice } from './userSlice'

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        user: userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
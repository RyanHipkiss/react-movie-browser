import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    value: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchTerm: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { updateSearchTerm } = searchSlice.actions
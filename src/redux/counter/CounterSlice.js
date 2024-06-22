import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const counterSlice = createSlice({
  name: 'clickedCart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    clickedCart:(state, action) => {
        state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, clickedCart } = counterSlice.actions

export default counterSlice.reducer
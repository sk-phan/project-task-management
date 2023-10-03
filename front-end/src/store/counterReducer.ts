import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Project, Task } from '../types'

// Define a type for the slice state
interface CounterState {
  value: number,
  project: Project
  tasks: Task[]
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 10,
  project: {
    name: "",
    tasks: [],
    id: "",
    user: "",
  },
  tasks: []
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      console.log(action.payload)
      state.tasks = [...action.payload]
    },
    setProject: (state, action: PayloadAction<Project>) => {
      state.project = {...action.payload}
    },
  },
})

export const { increment, decrement, incrementByAmount, setTasks, setProject } = counterSlice.actions


export default counterSlice.reducer
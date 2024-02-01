import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Project, Task } from '../types'

// Define a type for the slice state
interface CounterState {
  project: Project
  tasks: Task[]
}

// Define the initial state using that type
const initialState: CounterState = {
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
    setTasks: (state: CounterState, action: PayloadAction<Task[]>) => {
      state.tasks = [...action.payload]
    },
    setProject: (state: CounterState, action: PayloadAction<Project>) => {
      state.project = {...action.payload}
    },
  },
})

export const { setTasks, setProject } = counterSlice.actions


export default counterSlice.reducer
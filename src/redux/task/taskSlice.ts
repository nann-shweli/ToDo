import {createSlice} from '@reduxjs/toolkit';

type Task = {
  id: string;
  title: string;
  body: string;
};

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const id = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
      const newTask = {id, ...action.payload};
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = {...state.tasks[index], ...action.payload};
      }
    },
  },
});

export const {addTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;

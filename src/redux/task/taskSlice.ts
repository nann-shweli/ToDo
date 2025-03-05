import {createSlice} from '@reduxjs/toolkit';

type Task = {
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
      state.tasks.push(action.payload);
    },
    clearTasks: state => {
      state.tasks = [];
    },
  },
});

export const {addTask, clearTasks} = taskSlice.actions;
export default taskSlice.reducer;

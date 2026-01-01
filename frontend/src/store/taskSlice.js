import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/tasks`;

const authHeader = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getTasks = createAsyncThunk('tasks/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        const response = await axios.get(API_URL, authHeader(token));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        const response = await axios.post(API_URL, taskData, authHeader(token));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, taskData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        const response = await axios.put(`${API_URL}/${id}`, taskData, authHeader(token));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token;
        await axios.delete(`${API_URL}/${id}`, authHeader(token));
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        updateTaskStatus: (state, action) => {
            const { id, status } = action.payload;
            const index = state.tasks.findIndex(task => task.id.toString() === id.toString());
            if (index !== -1) {
                state.tasks[index].status = status;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });
    },
});

export const { reset, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;

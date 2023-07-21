import { createSlice } from '@reduxjs/toolkit';
import { loadState } from './localState';


const localState = loadState();

const initialStateValue = localState || {
    name: "", email: "", role: "", token: "", id: "",
    googleId: "", gitId: "", facebookId: "", cvPath: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        signup: (state, action) => {
            state.value = { ...state.value, ...action.payload }
        },
        // add madiha
        setToken: (state,action)=> {
            state.value.token = action.payload
        },
        
        logout: (state, action) => {
            state.value = initialStateValue
        }
    }
})

export const { signup, logout,setToken } = userSlice.actions;

export default userSlice.reducer
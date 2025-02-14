import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../utils/types"

// Interface for the AuthState type
export interface AuthState {
	user: User | null
	token: string | null
}

// Initial state for the AuthState type
const initialState: AuthState = {
	user: null,
	token: null
}

// Create a slice for the AuthState type
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		createSession: (state, action) => {
			// Set the user and token to the payload
			state.user = action.payload.user
			state.token = action.payload.token
		},
		deleteSession: (state) => {
			// Set the user and token to null
			state.user = null
			state.token = null
		}
	}
})

// Export the actions for the slice
export const { createSession, deleteSession } = authSlice.actions

// Export the reducer for the slice
export default authSlice.reducer

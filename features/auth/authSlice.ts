import { createSlice } from "@reduxjs/toolkit"
import { User, AccessToken } from "../../utils/types"

// Interface for the AuthState type
export interface AuthState {
	user: User | null
	token: AccessToken
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
		updateUserDetails: (state, action) => {
			// Set the user to the payload
			state.user = action.payload.user
		},
		deleteSession: (state) => {
			// Set the user and token to null
			state.user = null
			state.token = null
		}
	}
})

// Export the actions for the slice
export const { createSession, updateUserDetails, deleteSession } =
	authSlice.actions

// Export the reducer for the slice
export default authSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

// Interface for the ResetPasswordState type
export interface ResetPasswordState {
	accessToken: string
}

// Initial state for the ResetPasswordState type
const initialState: ResetPasswordState = {
	accessToken: ""
}

export const resetPasswordSlice = createSlice({
	name: "reset-password",
	initialState,
	reducers: {
		addAccessToken: (state, action) => {
			// Set the access token to the payload
			state.accessToken = action.payload.accessToken
		},
		deleteAccessToken: (state) => {
			// Set the access token to an empty string
			state.accessToken = ""
		}
	}
})

// Export the actions for the slice
export const { addAccessToken, deleteAccessToken } = resetPasswordSlice.actions

// Export the reducer for the slice
export default resetPasswordSlice.reducer

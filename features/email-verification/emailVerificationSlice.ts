import { createSlice } from "@reduxjs/toolkit"

// Interface for the EmailVerificationState type
export interface EmailVerificationState {
	email: string
}

// Initial state for the EmailVerificationState type
const initialState: EmailVerificationState = {
	email: ""
}

// Create a slice for the EmailVerificationState type
export const emailVerificationSlice = createSlice({
	name: "email-verification",
	initialState,
	reducers: {
		addVerificationEmail: (state, action) => {
			// Set the email to the payload
			state.email = action.payload.email
		},
		deleteVerificationEmail: (state) => {
			// Set the email to an empty string
			state.email = ""
		}
	}
})

// Export the actions for the slice
export const { addVerificationEmail, deleteVerificationEmail } =
	emailVerificationSlice.actions

// Export the reducer for the slice
export default emailVerificationSlice.reducer

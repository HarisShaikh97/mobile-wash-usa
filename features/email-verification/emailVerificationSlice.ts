import { createSlice } from "@reduxjs/toolkit"

export interface EmailVerificationState {
	email: string
}

const initialState: EmailVerificationState = {
	email: ""
}

export const emailVerificationSlice = createSlice({
	name: "email-verification",
	initialState,
	reducers: {
		addVerificationEmail: (state, action) => {
			state.email = action.payload.email
		},
		deleteVerificationEmail: (state) => {
			state.email = ""
		}
	}
})

export const { addVerificationEmail, deleteVerificationEmail } =
	emailVerificationSlice.actions

export default emailVerificationSlice.reducer

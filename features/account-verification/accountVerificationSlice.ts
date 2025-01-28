import { createSlice } from "@reduxjs/toolkit"

export interface AccountVerificationState {
	email: string
}

const initialState: AccountVerificationState = {
	email: ""
}

export const accountVerificationSlice = createSlice({
	name: "account-verification",
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
	accountVerificationSlice.actions

export default accountVerificationSlice.reducer

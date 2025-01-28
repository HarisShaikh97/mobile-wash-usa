import { createSlice } from "@reduxjs/toolkit"

export interface AccountVerificationState {
	email: string | null
}

const initialState: AccountVerificationState = {
	email: null
}

export const accountVerificationSlice = createSlice({
	name: "account-verification",
	initialState,
	reducers: {
		addVerificationEmail: (state, action) => {
			state.email = action.payload.email
		},
		deleteVerificationEmail: (state) => {
			state.email = null
		}
	}
})

export const { addVerificationEmail, deleteVerificationEmail } =
	accountVerificationSlice.actions

export default accountVerificationSlice.reducer

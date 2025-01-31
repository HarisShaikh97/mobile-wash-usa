import { createSlice } from "@reduxjs/toolkit"

export interface ResetPasswordState {
	accessToken: string
}

const initialState: ResetPasswordState = {
	accessToken: ""
}

export const resetPasswordSlice = createSlice({
	name: "reset-password",
	initialState,
	reducers: {
		addAccessToken: (state, action) => {
			state.accessToken = action.payload.accessToken
		},
		deleteAccessToken: (state) => {
			state.accessToken = ""
		}
	}
})

export const { addAccessToken, deleteAccessToken } = resetPasswordSlice.actions

export default resetPasswordSlice.reducer

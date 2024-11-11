import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
	user: object | null
	token: string | null
	role: "customer" | "vendor" | null
	isLoading: boolean
	error: string | null
}

const initialState: AuthState = {
	user: null,
	token: null,
	role: null,
	isLoading: false,
	error: null
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.isLoading = true
			state.error = null
		},
		loginSuccess: (state, action) => {
			state.isLoading = false
			state.user = action.payload.user
			state.token = action.payload.token
			state.role = action.payload.role
		},
		loginFailure: (state, action) => {
			state.isLoading = false
			state.error = action.payload.error
		},
		logout: (state) => {
			state.user = null
			state.token = null
		}
	}
})

export const { loginStart, loginSuccess, loginFailure, logout } =
	authSlice.actions

export default authSlice.reducer

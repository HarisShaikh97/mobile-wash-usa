import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../utils/types"

export interface AuthState {
	user: User | null
	token: string | null
}

const initialState: AuthState = {
	user: null,
	token: null
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		createSession: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
		},
		deleteSession: (state) => {
			state.user = null
			state.token = null
		}
	}
})

export const { createSession, deleteSession } = authSlice.actions

export default authSlice.reducer

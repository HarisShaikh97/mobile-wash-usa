import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import emailVerificationSlice from "../features/email-verification/emailVerificationSlice"
import resetPasswordSlice from "../features/reset-password/resetPasswordSlice"

// Create a Redux store with the auth, emailVerification, and resetPassword slices
export const store = configureStore({
	reducer: {
		auth: authSlice,
		emailVerification: emailVerificationSlice,
		resetPassword: resetPasswordSlice
	},
	devTools: false
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

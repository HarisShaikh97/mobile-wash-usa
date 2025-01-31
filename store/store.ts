import { configureStore } from "@reduxjs/toolkit"
import devToolsEnhancer from "redux-devtools-expo-dev-plugin"
import authSlice from "../features/auth/authSlice"
import emailVerificationSlice from "../features/email-verification/emailVerificationSlice"
import resetPasswordSlice from "../features/reset-password/resetPasswordSlice"

export const store = configureStore({
	reducer: {
		auth: authSlice,
		emailVerification: emailVerificationSlice,
		resetPassword: resetPasswordSlice
	},
	devTools: false,
	enhancers: (getDefaultEnhancers) =>
		getDefaultEnhancers().concat(devToolsEnhancer())
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

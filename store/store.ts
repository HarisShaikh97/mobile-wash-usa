import { configureStore } from "@reduxjs/toolkit"
import devToolsEnhancer from "redux-devtools-expo-dev-plugin"
import authSlice from "../features/auth/authSlice"
import accountVerificationSlice from "../features/account-verification/accountVerificationSlice"

export const store = configureStore({
	reducer: {
		auth: authSlice,
		accountVerification: accountVerificationSlice
	},
	devTools: false,
	enhancers: (getDefaultEnhancers) =>
		getDefaultEnhancers().concat(devToolsEnhancer())
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

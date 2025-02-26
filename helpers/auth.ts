import axios from "axios"
import {
	CustomerSignUpData,
	LoginData,
	VerifyRegistrationData,
	ForgotPasswordData,
	VerifyResetPasswordData,
	SetNewPasswordData
} from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Sign up function to handle customer sign up
export const customerSignUp = async (
	data: CustomerSignUpData
): Promise<any> => {
	// Create a request with the data
	const response = await api.post("/api/v1/register", data)
	// Return the response data
	return response.data
}

// Sign up function to handle vendor sign up
export const vendorSignUp = async (data: FormData): Promise<any> => {
	const headers = new Headers()
	headers.append("accept", "application/json")
	// Create a request with the data
	const response = await api.post("/api/v1/register", data)
	// Return the response data
	return response.data
}

// Login function to handle login
export const login = async (data: LoginData): Promise<any> => {
	// Create a request with the data
	const response = await api.post("/api/v1/login", data)
	// Return the response data
	return response.data
}

// Verification function to handle registration verification
export const verifyRegistration = async (
	data: VerifyRegistrationData
): Promise<any> => {
	// Create a request with the data
	const response = await api.post(
		"/api/v1/account/verify-registration-otp",
		data
	)
	// Return the response data
	return response.data
}

// Forgot password function to handle reset password
export const forgotPassword = async (
	data: ForgotPasswordData
): Promise<any> => {
	// Create a request with the data
	const response = await api.post("/api/v1/account/password/reset", data)
	// Return the response data
	return response.data
}

// Verification function to handle reset password verification
export const verifyResetPassword = async (
	data: VerifyResetPasswordData
): Promise<any> => {
	// Create a request with the data
	const response = await api.post(
		"/api/v1/account/verify-reset-password-otp",
		data
	)
	// Return the response data
	return response.data
}

// Set new password function to handle password update
export const setNewPassword = async (
	data: SetNewPasswordData
): Promise<any> => {
	// Create a request with the password and bearer token
	const response = await api.post(
		"/api/v1/account/password/create-new",
		{ password: data.password },
		{
			headers: {
				Authorization: `Bearer ${data.accessToken}`
			}
		}
	)
	// Return the response data
	return response.data
}

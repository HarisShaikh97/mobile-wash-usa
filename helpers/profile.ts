import axios from "axios"
import {
	VerifyProfileUpdateData,
	ProfileUpdateData,
	ResendProfileUpdateOTPData,
	ResetPasswordData
} from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Sign up function to handle profile update
export const updateProfile = async (data: ProfileUpdateData): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create a request with the data and headers
	const response = await api.post(
		"/api/v1/account/profile-update-otp-request",
		data.body,
		headers
	)

	// Return the response data
	return response.data
}

// Verify update profile function to handle profile update verification
export const verifyUpdateProfile = async (
	data: VerifyProfileUpdateData
): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create the request body
	const body = { otp: data.otp }

	// Create a request with the headers
	const response = await api.post(
		"/api/v1/account/verify-profile-update-otp",
		body,
		headers
	)

	// Return the response data
	return response.data
}

// Resend OTP function to handle resend update profile verification OTP
export const resendUpdateProfileVerificationOTP = async (
	data: ResendProfileUpdateOTPData
): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create the request body
	const body = { resend_otp: "1", _method: "PATCH" }

	// Create a request with the headers
	const response = await api.post(
		"/api/v1/account/profile-update-otp-request",
		body,
		headers
	)

	// Return the response data
	return response.data
}

// Reset password function to handle password reset
export const resetPassword = async (data: ResetPasswordData): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create the request body
	const body = {
		old_password: data.oldPassword,
		new_password: data.newPassword,
		_method: "PATCH"
	}

	// Create a request with the headers
	const response = await api.post(
		"/api/v1/account/password/change",
		body,
		headers
	)

	// Return the response data
	return response.data
}

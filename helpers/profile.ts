import axios from "axios"
import { VerifyProfileUpdateData, AccessToken } from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Sign up function to handle profile update
export const updateProfile = async ({
	data,
	accessToken
}: {
	data: FormData
	accessToken: AccessToken
}): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${accessToken}`
		}
	}

	// Create a request with the data and headers
	const response = await api.post(
		"/api/v1/account/profile-update-otp-request",
		data,
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

// Verify update profile function to handle resend update profile verification OTP
export const resendUpdateProfileVerificationOTP = async (
	accessToken: AccessToken
): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${accessToken}`
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

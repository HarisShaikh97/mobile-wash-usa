import axios from "axios"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Sign up function to handle profile update
export const updateProfile = async ({
	data,
	accessToken
}: {
	data: FormData
	accessToken: string | null
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
export const verifyUpdateProfile = async ({
	data,
	accessToken
}: {
	data: FormData
	accessToken: string | null
}): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${accessToken}`
		}
	}

	// Create a request with the headers
	const response = await api.post(
		"/api/v1/account/verify-profile-update-otp",
		data,
		headers
	)

	// Return the response data
	return response.data
}

// Verify update profile function to handle resend update profile verification OTP
export const resendUpdateProfileVerificationOTP = async ({
	accessToken
}: {
	accessToken: string | null
}): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${accessToken}`
		}
	}

	// Create a form data object for the request
	const data = new FormData()

	// Append the data to the form data object
	data.append("resend_otp", "1")
	data.append("_method", "PATCH")

	// Create a request with the headers
	const response = await api.post(
		"/api/v1/account/profile-update-otp-request",
		data,
		headers
	)

	// Return the response data
	return response.data
}

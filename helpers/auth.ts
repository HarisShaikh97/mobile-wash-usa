import axios from "axios"
import { CustomerSignUpData, VendorSignUpData, LoginData } from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Sign up function to handle sign up
export const signUp = async (
	data: VendorSignUpData | CustomerSignUpData
): Promise<any> => {
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

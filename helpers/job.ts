import axios from "axios"
import { QueryData } from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Login function to fetch user's jobs
export const getMyJobs = async (data: QueryData): Promise<any> => {
	// Create a request with the token
	const response = await api.get("/api/v1/get-my-jobs", {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	})

	// Return the response data
	return response.data.data
}

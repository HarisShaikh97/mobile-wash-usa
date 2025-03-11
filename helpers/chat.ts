import axios from "axios"
import { QueryData, JobByIdData } from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Login function to fetch user's chats
export const getAllChats = async (data: QueryData): Promise<any> => {
	// Create a request with the token
	const response = await api.get("/api/v1/chats", {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	})

	// Return the response data
	return response.data.data
}

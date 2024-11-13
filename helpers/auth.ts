import axios from "axios"
import { SignUpData } from "../utils/types"

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const signUp = async (data: FormData | SignUpData): Promise<any> => {
	console.log(`${API_URL}/api/register`)
	const response = await axios.post(`${API_URL}/api/register`, data)
	return response.data
}

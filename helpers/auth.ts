import axios from "axios"
import { SignUpData, LoginData } from "../utils/types"

const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

export const signUp = async (data: FormData | SignUpData): Promise<any> => {
	const response = await api.post("/api/register", data)
	return response.data
}

export const login = async (data: LoginData): Promise<any> => {
	const response = await api.post("/api/v1/login", data)
	return response.data
}

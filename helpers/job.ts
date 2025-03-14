import axios from "axios"
import { QueryData, JobByIdData } from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Get my jobs function to fetch all jobs
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

// Get job by id function to fetch a job
export const getJobById = async (data: JobByIdData): Promise<any> => {
	// Create a request with the token
	const response = await api.get(`/api/v1/jobs/${data.jobId}`, {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	})

	// Return the response data
	return response.data.data
}

// Delete job function to delete a job
export const deleteJobById = async (data: JobByIdData): Promise<any> => {
	// Create a request with the token
	const response = await api.delete(`/api/v1/jobs/${data.jobId}`, {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	})

	// Return the response data
	return response.data
}

// Get my jobs function to fetch all jobs
export const getJobTypes = async (data: QueryData): Promise<any> => {
	// Create a request with the token
	const response = await api.get("/api/v1/services", {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	})

	// Return the response data
	return response.data.data.services
}

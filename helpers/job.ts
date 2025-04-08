import axios from "axios"
import { QueryData, JobByIdData, PostNewJobData } from "../utils/types"

// Create an axios instance with the base URL
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

// Get my jobs function to fetch all jobs
export const getMyJobs = async (data: QueryData): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create a request with the headers
	const response = await api.get("/api/v1/get-my-jobs", headers)

	// Return the response data
	return response.data.data
}

// Get job by id function to fetch a job
export const getJobById = async (data: JobByIdData): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create a request with the headers
	const response = await api.get(`/api/v1/jobs/${data.jobId}`, headers)

	// Return the response data
	return response.data.data
}

// Delete job function to delete a job
export const deleteJobById = async (data: JobByIdData): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create a request with the headers
	const response = await api.delete(`/api/v1/jobs/${data.jobId}`, headers)

	// Return the response data
	return response.data
}

// Get my jobs function to fetch all jobs
export const getJobTypes = async (data: QueryData): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create a request with the headers
	const response = await api.get("/api/v1/services", headers)

	// Return the response data
	return response.data.data.services
}

// Get my jobs function to fetch all jobs
export const postNewJob = async (data: PostNewJobData): Promise<any> => {
	// Set the headers for the request
	const headers = {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${data.accessToken}`
		}
	}

	// Create a request with the headers
	const response = await api.post("/api/v1/jobs", data.body, headers)

	// Return the response data
	return response.data
}

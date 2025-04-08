import { createSlice } from "@reduxjs/toolkit"
import { ImagePickerResult } from "expo-image-picker"
import { JobSubType } from "../../utils/types"

// Interface for the AddJobState type
export interface AddJobState {
	jobTitle: string | null
	jobDescription: string | null
	jobType: JobSubType | null
	budget: number | null
	address: string | null
	latitude: number | null
	longitude: number | null
	dateTime: string | null
	images: ImagePickerResult | null
}

// Initial state for the AuthState type
const initialState: AddJobState = {
	jobTitle: null,
	jobDescription: null,
	jobType: null,
	budget: null,
	address: null,
	latitude: null,
	longitude: null,
	dateTime: null,
	images: null
}

// Create a slice for the AddJobState type
export const addJobSlice = createSlice({
	name: "add-job",
	initialState,
	reducers: {
		addJobNeeds: (state, action) => {
			// Set the job title, description, service ID, and images to the payload
			state.jobTitle = action.payload.jobTitle
			state.jobDescription = action.payload.jobDescription
			state.jobType = action.payload.jobType
		},
		addJobDetails: (state, action) => {
			// Set the budget, address, images, and date/time to the payload
			state.budget = action.payload.budget
			state.address = action.payload.address
			state.dateTime = action.payload.dateTime
			state.images = action.payload.images
		},
		addJobLocation: (state, action) => {
			// Set the location(latitude and longitude) to the payload
			state.latitude = action.payload.latitude
			state.longitude = action.payload.longitude
		},
		resetJob: (state) => {
			// Reset the state to the initial state
			state.jobTitle = null
			state.jobDescription = null
			state.jobType = null
			state.budget = null
			state.address = null
			state.latitude = null
			state.longitude = null
			state.dateTime = null
			state.images = null
		}
	}
})

// Export the actions for the slice
export const { addJobNeeds, addJobDetails, addJobLocation, resetJob } =
	addJobSlice.actions

// Export the reducer for the slice
export default addJobSlice.reducer

import { useState, useCallback } from "react"
import {
	ScrollView,
	KeyboardAvoidingView,
	View,
	Text,
	Platform,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { useSelector, useDispatch } from "react-redux"
import { showToastable } from "react-native-toastable"
import BackButton from "../../../components/back-button/BackButton"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { getJobTypes } from "../../../helpers/job"
import { addJobNeeds } from "../../../features/add-job/addJobSlice"
import { RootState } from "../../../store/store"
import { JobType, JobSubType } from "../../../utils/types"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	// Retrieve new job details from Redux store
	const newJobDetails = useSelector((state: RootState) => state.addJob)

	const [jobTitle, setJobTitle] = useState<string>(
		newJobDetails.jobTitle || ""
	) // State for managing job title
	const [jobDescription, setJobDescription] = useState<string>(
		newJobDetails.jobDescription || ""
	) // State for managing job description
	const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null) // State for managing selected job type
	const [selectedJobSubType, setSelectedJobSubType] =
		useState<JobSubType | null>(null) // State for managing selected job sub type

	// Query to fetch job types using TanStack Query
	const { data: jobTypes = [] } = useQuery<JobType[]>({
		queryKey: ["job-types", token],
		queryFn: () => getJobTypes({ accessToken: token }),
		enabled: !!token
	})

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Checking if all required fields are filled
		if (
			jobTitle.length > 0 &&
			jobDescription.length > 0 &&
			selectedJobType &&
			selectedJobSubType
		) {
			// Dispatching the addJobNeeds action with the job details
			dispatch(
				addJobNeeds({
					jobTitle: jobTitle,
					jobDescription: jobDescription,
					jobType: selectedJobSubType
				})
			)

			// Navigating to the next page on form submission
			router.navigate("/user/add-job/details")
		} else {
			// Show success toast warning for incomplete form
			showToastable({
				message: "Please fill in all the fields!",
				status: "warning"
			})
		}
	}, [
		router,
		dispatch,
		showToastable,
		addJobNeeds,
		jobTitle,
		jobDescription,
		selectedJobType,
		selectedJobSubType
	])

	return (
		// KeyboardAvoidingView to handle keyboard appearance and disappearance
		<KeyboardAvoidingView
			style={styles.scrollView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{/* ScrollView to enable scrolling of content */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Container for the entire page content */}
				<View style={styles.container}>
					{/* ImageBackground for the header */}
					<ImageBackground
						source={require("../../../assets/images/add-job-header.png")}
						style={styles.headerBackgroundImage}
						contentFit="fill"
					>
						{/* Container for the header content */}
						<View style={styles.headerContainer}>
							<BackButton
								size="small"
								color="#000000"
								backgroundColor="#F5F5F5"
								borderColor="transparent"
							/>
							<Text style={styles.titleText}>
								Describe Your Job Needs
							</Text>
						</View>
					</ImageBackground>
					{/* Container for the body content */}
					<View style={styles.bodyContainer}>
						{/* Input field for job title */}
						<InputField
							length="full"
							type="text"
							value={jobTitle}
							onChangeText={setJobTitle}
							title="Job Title"
							multiline={false}
							secureTextEntry={false}
							placeholder="Enter Job Title"
						/>
						{/* Input field for job type */}
						{jobTypes.length > 0 && (
							<InputField
								length="full"
								type="select"
								data={jobTypes}
								value={selectedJobType}
								onChangeValue={setSelectedJobType}
								title="Job Type"
								placeholder="Select Job Type"
								zIndex={2}
							/>
						)}
						{/* Conditional rendering of job sub-type input field */}
						{selectedJobType && (
							<InputField
								length="full"
								type="select"
								data={selectedJobType.subTypes}
								value={selectedJobSubType}
								onChangeValue={setSelectedJobSubType}
								title={selectedJobType.name}
								placeholder="Select Job Sub Type"
								zIndex={1}
							/>
						)}
						{/* Input field for job description */}
						<InputField
							length="full"
							type="text"
							value={jobDescription}
							onChangeText={setJobDescription}
							title="Job Description"
							multiline={true}
							secureTextEntry={false}
							placeholder="Write Job Description"
							size="large"
						/>
						{/* Form button to navigate to the next page */}
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title="Next"
							onPress={handleSubmit}
						/>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flexDirection: "column"
	},
	headerBackgroundImage: {
		width: "100%"
	},
	headerContainer: {
		padding: 25,
		flexDirection: "column",
		gap: 25,
		backgroundColor: "rgba(255, 255, 255, 0.75)"
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 215
	},
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 25,
		paddingHorizontal: 25,
		paddingBottom: 25,
		gap: 15
	}
})

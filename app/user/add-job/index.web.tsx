import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../components/add-job-web-layout/AddJobWebLayout"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { JobType, JobSubType } from "../../../utils/types"
import { theme, jobTypes } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	const [jobTitle, setJobTitle] = useState<string>("") // State for managing job title
	const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null) // State for managing selected job type
	const [selectedJobSubType, setSelectedJobSubType] =
		useState<JobSubType | null>(null) // State for managing selected job sub type
	const [jobDescription, setJobDescription] = useState<string>("") // State for managing job description

	// Memoized function to handle form submission
	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/details") // Navigating to the next page on form submission
	}, [router])

	return (
		<AddJobWebLayout>
			{/* Main container for the page content */}
			<View style={styles.container}>
				{/* Title text for the page */}
				<Text style={styles.titleText}>Describe Your Job Needs</Text>
				{/* Container for the form fields */}
				<View style={styles.formContainer}>
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
					{/* Conditional rendering of job sub-type input field */}
					{selectedJobType && (
						// Input field for job sub-type, only visible when job type is selected
						<InputField
							length="full"
							type="select"
							data={selectedJobType.subTypes}
							value={selectedJobSubType}
							onChangeValue={setSelectedJobSubType}
							title={selectedJobType.title}
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
						size="small"
					/>
					{/* Container for the form button */}
					<View style={styles.formButtonWrapper}>
						{/* Form button to navigate to the next page */}
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title="Next"
							onPress={handleSubmit}
							// Calls the handleSubmit function when the button is pressed
						/>
					</View>
				</View>
			</View>
		</AddJobWebLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 25
	},
	titleText: {
		fontSize: 37.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		textTransform: "capitalize",
		maxWidth: 275
	},
	formContainer: {
		width: "75%",
		flexDirection: "column",
		alignItems: "center",
		gap: 15
	},
	formButtonWrapper: {
		marginTop: 10,
		width: "70%"
	}
})

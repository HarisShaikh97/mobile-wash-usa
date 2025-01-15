import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../components/add-job-web-layout/AddJobWebLayout"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { JobType, JobSubType } from "../../../utils/types"
import { theme, jobTypes } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [jobTitle, setJobTitle] = useState<string>("")
	const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null)
	const [selectedJobSubType, setSelectedJobSubType] =
		useState<JobSubType | null>(null)
	const [jobDescription, setJobDescription] = useState<string>("")

	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/details")
	}, [router])

	return (
		<AddJobWebLayout>
			<View style={styles.container}>
				<Text style={styles.titleText}>Describe Your Job Needs</Text>
				<View style={styles.formContainer}>
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
					{selectedJobType && (
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
					<View style={styles.formButtonWrapper}>
						<FormButton
							length="full"
							theme="dark"
							title="Next"
							onPress={handleSubmit}
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

import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../components/add-job-web-layout/AddJobWebLayout"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { SelectOption } from "../../../utils/types"
import { theme, services } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [jobTitle, setJobTitle] = useState<string>("")
	const [jobType, setJobType] = useState<SelectOption | null>(null)
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
						data={services}
						value={jobType}
						onChangeValue={setJobType}
						title="Job Type"
						placeholder="Select Job Type"
						zIndex={1}
					/>
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
		gap: 35
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
		width: "70%"
	}
})

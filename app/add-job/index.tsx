import { useState, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import InputField from "../../components/input-field/InputField"
import FormButton from "../../components/form-button/FormButton"
import { services } from "../../utils/constants"
import { SelectOption } from "../../utils/types"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [jobTitle, setJobTitle] = useState<string>("")
	const [jobType, setJobType] = useState<SelectOption | null>(null)
	const [jobDescription, setJobDescription] = useState<string>("")

	const handleSubmit = useCallback(() => {
		router.back()
	}, [router])

	return (
		<View style={styles.bodyContainer}>
			<InputField
				type="text"
				value={jobTitle}
				onChangeText={setJobTitle}
				title="Job Title"
				multiline={false}
				secureTextEntry={false}
				placeholder="Enter Job Title"
			/>
			<InputField
				type="select"
				data={services}
				value={jobType}
				onChangeValue={setJobType}
				title="Job Type"
				placeholder="Select Job Type"
			/>
			<InputField
				type="text"
				value={jobDescription}
				onChangeText={setJobDescription}
				title="Job Description"
				multiline={true}
				secureTextEntry={false}
				placeholder="Write Job Description"
				size="large"
			/>
			<FormButton title="Next" onPress={handleSubmit} />
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 25,
		paddingHorizontal: 25,
		paddingBottom: 25,
		gap: 15
	}
})

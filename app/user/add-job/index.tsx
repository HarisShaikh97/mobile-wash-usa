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
import BackButton from "../../../components/back-button/BackButton"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { jobTypes, theme } from "../../../utils/constants"
import { JobType, JobSubType } from "../../../utils/types"

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
		<KeyboardAvoidingView
			style={styles.scrollView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<ImageBackground
						source={require("../../../assets/images/add-job-header.png")}
						style={styles.headerBackgroundImage}
						contentFit="fill"
					>
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
					<View style={styles.bodyContainer}>
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
						<FormButton
							length="full"
							theme="dark"
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

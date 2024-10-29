import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import BackButton from "../../components/back-button/BackButton"
import InputField from "../../components/input-field/InputField"
import FormButton from "../../components/form-button/FormButton"
import { services, theme } from "../../utils/constants"
import { SelectOption } from "../../utils/types"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf")
	})

	const [jobTitle, setJobTitle] = useState<string>("")
	const [jobType, setJobType] = useState<SelectOption | null>(null)
	const [jobDescription, setJobDescription] = useState<string>("")

	const handleSubmit = useCallback(() => {
		router.back()
	}, [router])

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/images/add-job-header.png")}
				style={styles.headerBackgroundImage}
				contentFit="fill"
			>
				<View style={styles.headerContainer}>
					<BackButton
						color="#000000"
						backgroundColor="#F5F5F5"
						borderColor="transparent"
					/>
					{fontsLoaded && (
						<Text style={styles.titleText}>
							Describe Your Job Needs
						</Text>
					)}
				</View>
			</ImageBackground>
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
		</View>
	)
}

const styles = StyleSheet.create({
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

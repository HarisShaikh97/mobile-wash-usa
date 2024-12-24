import { useState, useCallback } from "react"
import {
	ScrollView,
	KeyboardAvoidingView,
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import InputField from "../../../../components/input-field/InputField"
import BudgetInput from "../../../../components/budget-input/BudgetInput"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [dateTime, setDateTime] = useState<string>("")
	const [budget, setBudget] = useState<number>(0)

	const handleSelectLocation = useCallback(() => {
		router.navigate("/user/add-job/select-location")
	}, [router])

	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/review")
	}, [router])

	return (
		<AddJobWebLayout>
			<View style={styles.container}>
				<Text style={styles.titleText}>Set job details</Text>
				<View style={styles.formContainer}>
					<View style={styles.inputFieldWrapper}>
						<Text style={styles.inputFieldTitleText}>Budget</Text>
						<BudgetInput
							value={budget}
							setValue={setBudget}
							mode="web"
						/>
					</View>
					<View style={styles.inputFieldWrapper}>
						<Text style={styles.inputFieldTitleText}>Location</Text>
						<TouchableOpacity
							style={styles.inputFieldContainer}
							onPress={handleSelectLocation}
						>
							<Text style={styles.inputFieldText}>
								Select Your Location
							</Text>
						</TouchableOpacity>
					</View>
					<InputField
						length="full"
						type="text"
						value={dateTime}
						onChangeText={setDateTime}
						title="Date & Time"
						multiline={false}
						secureTextEntry={false}
						placeholder="DD/MM/YYYY TT"
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
		gap: 50
	},
	titleText: {
		fontSize: 37.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		textTransform: "capitalize"
	},
	formContainer: {
		width: "70%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25
	},
	inputFieldWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5,
		zIndex: 50
	},
	inputFieldTitleText: {
		fontFamily: "Roboto-Medium",
		fontSize: 12.5,
		color: theme.colors.secondary,
		marginLeft: 7.5
	},
	inputFieldContainer: {
		height: 50,
		width: "100%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		justifyContent: "center",
		paddingHorizontal: 15
	},
	inputFieldText: {
		fontSize: 12.5,
		color: "rgba(173, 173, 173, 0.94)"
	},
	formButtonWrapper: {
		width: "75%"
	}
})

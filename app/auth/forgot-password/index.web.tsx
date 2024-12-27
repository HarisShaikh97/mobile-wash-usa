import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [userName, setUserName] = useState<string>("")

	const handleSubmit = useCallback((): void => {
		router.navigate("/auth/forgot-password/verification-code")
	}, [router])

	return (
		<View style={styles.bodyContainer}>
			<Text style={styles.titleText}>Forgot Your Password?</Text>
			<Text style={styles.descriptionText}>
				Enter your registered email address or phone number, and we’ll
				send you a link or code to reset your password.
			</Text>
			<View style={styles.formContainer}>
				<InputField
					length="full"
					title="Email/Number"
					placeholder="Enter your email or phone number"
					value={userName}
					onChangeText={setUserName}
					secureTextEntry={false}
					multiline={false}
					type="text"
				/>
				<View style={styles.formButtonWrapper}>
					<FormButton
						length="full"
						theme="dark"
						title="Send"
						onPress={handleSubmit}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 35,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Light",
		fontSize: 22.5,
		color: theme.colors.secondary,
		textAlign: "center",
		paddingTop: 7.5
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 35,
		paddingTop: 20
	},
	formButtonWrapper: {
		width: "65%"
	}
})

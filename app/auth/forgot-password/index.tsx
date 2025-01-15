import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// State to store the user's name
	const [userName, setUserName] = useState<string>("")

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Navigate to the verification code page
		router.navigate("/auth/forgot-password/verification-code")
	}, [router])

	return (
		// Main container for the page
		<View style={styles.bodyContainer}>
			{/* Page title */}
			<Text style={styles.titleText}>Forgot Your Password?</Text>
			{/* Page description */}
			<Text style={styles.descriptionText}>
				Enter your registered email address or phone number, and we’ll
				send you a link or code to reset your password.
			</Text>
			{/* Form container */}
			<View style={styles.formContainer}>
				{/* Input field for email/number */}
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
				{/* Form button to submit the form */}
				<FormButton
					length="full"
					theme="dark"
					title="Send"
					onPress={handleSubmit}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 35,
		gap: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 20,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 12.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 250,
		paddingTop: 7.5,
		lineHeight: 20
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10,
		paddingTop: 20
	}
})

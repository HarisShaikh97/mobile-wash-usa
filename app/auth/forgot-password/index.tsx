import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { showToastable } from "react-native-toastable"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { forgotPassword } from "../../../helpers/auth"
import { addVerificationEmail } from "../../../features/email-verification/emailVerificationSlice"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initialize the router instance for navigation
	const router = useRouter()

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// State to store the user's name
	const [userName, setUserName] = useState<string>("")

	// Memoized function to handle forgot password success
	const handleSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Add the user's email to the Redux store
			dispatch(
				addVerificationEmail({
					email: userName
				})
			)

			// Show success toast message
			showToastable({
				message: "OTP sent to your email for verification.",
				status: "success"
			})

			// Navigate to the verification code page
			router.navigate("/auth/forgot-password/verification-code")
		},
		[router, dispatch, addVerificationEmail, userName, showToastable]
	)

	// Memoized function to handle forgot password error
	const handleError = useCallback(
		(error: any): void => {
			console.log(error)

			// Show error toast message
			showToastable({
				message:
					error?.response?.data?.errors?.messages[0] ||
					"Something went wrong!",
				status: "danger"
			})
		},
		[showToastable]
	)

	// Mutation hook to handle forgot password
	const { mutate, isPending } = useMutation({
		mutationFn: forgotPassword,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Mutate the forgot password function with the user's name
		mutate({ email: userName })
	}, [mutate, userName])

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
					colorTheme="dark"
					isLoading={isPending}
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

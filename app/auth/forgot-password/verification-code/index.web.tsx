import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { showToastable } from "react-native-toastable"
import FormButton from "../../../../components/form-button/FormButton"
import OTPInput from "../../../../components/otp-input/OTPInput"
import { verifyResetPassword } from "../../../../helpers/auth"
import { deleteVerificationEmail } from "../../../../features/email-verification/emailVerificationSlice"
import { addAccessToken } from "../../../../features/reset-password/resetPasswordSlice"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get the router instance for navigation
	const router = useRouter()

	// Initializing the dispatch function for Redux
	const dispatch = useDispatch()

	// Retrieve email from Redux store
	const email = useSelector(
		(state: RootState) => state.emailVerification.email
	)

	// State to store the OTP input
	const [OTP, setOTP] = useState<string>("")

	// Memoized function to handle verify reset password success
	const handleSuccess = useCallback(
		(data: any) => {
			console.log(data)

			// Dispatch action to delete verification email
			dispatch(deleteVerificationEmail())

			// Dispatch action to add access token
			dispatch(addAccessToken({ accessToken: data.data.access_token }))

			// Show success toast message
			showToastable({
				message:
					"OTP verified successfully! You can now change your password.",
				status: "success"
			})

			// Navigate to the change password page
			router.navigate("/auth/forgot-password/change-password")
		},
		[router, dispatch, deleteVerificationEmail, addAccessToken]
	)

	// Memoized function to handle verify reset password error
	const handleError = useCallback((error: any) => {
		console.log(error)

		// Show error toast message
		showToastable({
			message:
				error?.response?.data?.errors?.messages[0] ||
				"Something went wrong!",
			status: "danger"
		})
	}, [])

	// Mutation hook to handle verify reset password
	const { mutate, isPending } = useMutation({
		mutationFn: verifyResetPassword,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Mutate the verify reset password function with the user's email and OTP
		mutate({ email: email, otp: OTP })
	}, [mutate, email, OTP])

	return (
		<View style={styles.bodyContainer}>
			{/* Page title */}
			<Text style={styles.titleText}>Enter The Verification Code</Text>
			{/* Page description */}
			<Text style={styles.descriptionText}>
				A 6-digit code has been sent to your email/phone. Please enter
				the code below to reset your password.
			</Text>
			{/* Form container */}
			<View style={styles.formContainer}>
				{/* OTP input field */}
				<OTPInput onChangeText={setOTP} />
				{/* Form button to submit OTP */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={isPending}
					title="Verify Code"
					onPress={handleSubmit}
				/>
			</View>
			{/* Wrapper for resend code text and link */}
			<View style={styles.policyAndTermsTextWrapper}>
				{/* Text before the resend code link */}
				<Text
					style={[styles.policyAndTermsText, styles.resendCodeText]}
				>
					Don’t receive code ?
				</Text>
				{/* Link to resend code */}
				<TouchableOpacity>
					<Text
						style={[
							styles.policyAndTermsText,
							styles.policyAndTermsLinkText
						]}
					>
						{" Re-send"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center"
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 37.5,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 18.5,
		width: 335,
		color: theme.colors.secondary,
		textAlign: "center",
		paddingTop: 7.5
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		paddingTop: 10,
		paddingHorizontal: 50
	},
	policyAndTermsTextWrapper: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 15
	},
	policyAndTermsText: {
		fontSize: 15
	},
	policyAndTermsTextBlack: {
		color: theme.colors.secondary,
		fontFamily: "Roboto-Regular"
	},
	policyAndTermsLinkText: {
		color: theme.colors.primary,
		fontFamily: "Roboto-Medium"
	},
	resendCodeText: {
		color: theme.colors.secondary,
		fontFamily: "Roboto-Medium"
	}
})

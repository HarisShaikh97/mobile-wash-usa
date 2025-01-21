import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import FormButton from "../../../../components/form-button/FormButton"
import OTPInput from "../../../../components/otp-input/OTPInput"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get the router instance for navigation
	const router = useRouter()

	// State to store the OTP input
	const [OTP, setOTP] = useState<string>("")

	// Function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Navigate to the change password page
		router.navigate("/auth/forgot-password/change-password")
	}, [router])

	return (
		<View style={styles.bodyContainer}>
			{/* Page title */}
			<Text style={styles.titleText}>Enter The Verification Code</Text>
			{/* Page description */}
			<Text style={styles.descriptionText}>
				A 5-digit code has been sent to your email/phone. Please enter
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
					isLoading={false}
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

import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import FormButton from "../../../components/form-button/FormButton"
import OTPInput from "../../../components/otp-input/OTPInput"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [OTP, setOTP] = useState<string>("") // State for storing the OTP input

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {}, [])

	return (
		// Main container for the verification page
		<View style={styles.bodyContainer}>
			{/* Title of the verification page */}
			<Text style={styles.titleText}>Enter the Verification Code</Text>
			{/* Description text explaining the verification process */}
			<Text style={styles.descriptionText}>
				A 6-digit code has been sent to your email. Please enter the
				code below to Change your email.
			</Text>
			{/* Container for the form elements */}
			<View style={styles.formContainer}>
				{/* OTP input component for entering verification code */}
				<OTPInput onChangeText={setOTP} />
				{/* Submit button for verification */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Verify Code"
					onPress={handleSubmit}
				/>
				{/* Container for resend code option */}
				<View style={styles.policyAndTermsTextWrapper}>
					{/* Text asking if user received the code */}
					<Text
						style={[
							styles.policyAndTermsText,
							styles.resendCodeText
						]}
					>
						Don't receive code ?
					</Text>
					{/* Touchable link to resend the code */}
					<TouchableOpacity>
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsLinkText
							]}
						>
							{"	Re-send"}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 25,
		gap: 10,
		zIndex: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 30,
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 32.5
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 16.5,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 285,
		paddingTop: 7.5,
		lineHeight: 20
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		paddingTop: 10
	},
	policyAndTermsTextWrapper: {
		flexDirection: "row",
		alignItems: "center"
	},
	policyAndTermsText: {
		fontSize: 13.5
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

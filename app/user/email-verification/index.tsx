import { useCallback, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import FormButton from "../../../components/form-button/FormButton"
import OTPInput from "../../../components/otp-input/OTPInput"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [OTP, setOTP] = useState<string>("") // State to manage the OTP input

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {}, [])

	return (
		// Container for the verification code input
		<View style={styles.bodyContainer}>
			{/* Displaying the title for the verification code input */}
			<Text style={styles.titleText}>Enter the Verification Code</Text>
			{/* Providing a description for the verification process */}
			<Text style={styles.descriptionText}>
				A 5-digit code has been sent to your email. Please enter the
				code below to Change your email.
			</Text>
			{/* Container for the form fields and buttons */}
			<View style={styles.formContainer}>
				{/* OTP input field for user input */}
				<OTPInput onChangeText={setOTP} />
				{/* Button to submit the verification code */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Verify Code"
					onPress={handleSubmit}
				/>
				{/* Container for the resend code text and link */}
				<View style={styles.policyAndTermsTextWrapper}>
					{/* Text indicating the option to resend the code */}
					<Text
						style={[
							styles.policyAndTermsText,
							styles.resendCodeText
						]}
					>
						Don’t receive code ?
					</Text>
					{/* Touchable area for the resend code link */}
					<TouchableOpacity>
						{/* Link to resend the verification code */}
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
